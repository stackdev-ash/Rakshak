import Payment from "../../database/models/Payment.js";
import User from "../../database/models/User.js";
import Karma from "../../database/models/Karma.js";
import ENV from "../config/env.js";
import Stripe from "stripe";

const stripe = ENV.STRIPE_SECRET_KEY ? new Stripe(ENV.STRIPE_SECRET_KEY) : null;

const purposeMap = {
  food: "Emergency Food Kits",
  disaster: "Disaster Relief Fund",
  volunteer: "Cold-Chain Logistics",
  general: "General Relief",
};

const getPurpose = (purpose) => purposeMap[purpose] || purposeMap.general;

const completePayment = async (session) => {
  const paymentRecordId = session?.metadata?.paymentRecordId;
  if (!paymentRecordId) return null;

  const payment = await Payment.findOne({ _id: paymentRecordId });
  if (!payment) return null;

  const paid =
    session.payment_status === "paid" ||
    session.status === "complete";

  if (!paid) return payment;

  // Idempotent fulfillment: repeated Stripe webhook deliveries or refreshes
  // must never award Karma twice.
  if (payment.status !== "Success") {
    payment.status = "Success";
    payment.transactionId = session.payment_intent || session.id;
    payment.providerSessionId = session.id;
    payment.paymentMethod = "Stripe Checkout";
    await payment.save();
  }

  if (!payment.karmaAwarded) {
    const points = Math.floor(payment.amount / 10);

    const claimed = await Payment.findOneAndUpdate(
      { _id: payment._id, karmaAwarded: false },
      { $set: { karmaAwarded: true } },
      { new: true }
    );

    if (claimed) {
      await User.findByIdAndUpdate(payment.user, {
        $inc: { karmaPoints: points },
      });

      await Karma.create({
        user: payment.user,
        title: "Financial Contribution",
        description: `Donated INR ${payment.amount} for ${payment.purpose}`,
        points,
        type: "Donation",
      });
    }
  }

  return Payment.findById(payment._id);
};

export const createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Stripe payments are not configured on the server",
      });
    }

    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount < 10) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid donation amount of at least ₹10",
      });
    }

    const donorName = String(req.user?.name || req.body.donorName || "").trim();
    const donorEmail = String(req.user?.email || req.body.donorEmail || "").trim().toLowerCase();

    if (!donorName || !donorEmail) {
      return res.status(400).json({
        success: false,
        message: "Donor name and email are required",
      });
    }

    const purpose = getPurpose(req.body.purpose);
    const payment = await Payment.create({
      transactionId: `STRIPE-PENDING-${Date.now()}`,
      user: req.user._id,
      donorName,
      donorEmail,
      amount,
      currency: "INR",
      purpose,
      disasterId: req.body.disasterId || "",
      status: "Pending",
      paymentMethod: "Stripe Checkout",
      provider: "stripe",
    });

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: donorEmail,
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `RAKSHAK — ${purpose}`,
                description: "RAKSHAK humanitarian donation",
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: {
          paymentRecordId: String(payment._id),
          userId: String(req.user._id),
          purpose,
        },
        success_url: `${ENV.CLIENT_URL}/donate-money?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ENV.CLIENT_URL}/donate-money?payment=cancelled`,
      });

      payment.transactionId = session.id;
      payment.providerSessionId = session.id;
      await payment.save();

      return res.status(201).json({
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url,
        paymentId: payment._id,
      });
    } catch (stripeError) {
      await Payment.findByIdAndUpdate(payment._id, { status: "Failed" });
      throw stripeError;
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(502).json({
      success: false,
      message: error.message || "Unable to create Stripe checkout session",
    });
  }
};

export const handleStripeWebhook = async (req, res) => {
  if (!stripe || !ENV.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).send("Stripe webhook is not configured");
  }

  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      ENV.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await completePayment(event.data.object);
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;
      if (session?.metadata?.paymentRecordId) {
        await Payment.findByIdAndUpdate(session.metadata.paymentRecordId, {
          status: "Failed",
          providerSessionId: session.id,
        });
      }
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
};

export const getCheckoutSessionStatus = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Stripe payments are not configured on the server",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    if (String(session?.metadata?.userId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this payment session",
      });
    }

    const payment = await completePayment(session);

    return res.json({
      success: true,
      status: payment?.status || "Pending",
      payment,
      checkoutStatus: session.status,
      paymentStatus: session.payment_status,
      earnedKarma: payment?.karmaAwarded ? Math.floor(payment.amount / 10) : 0,
    });
  } catch (error) {
    console.error("Stripe session status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to retrieve payment status",
    });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: payments.length, payments });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch payment history",
    });
  }
};
