import { useEffect, useState } from "react";
import {
  Heart,
  IndianRupee,
  ShieldCheck,
  CheckCircle,
  Download,
  ArrowLeft,
  FileText,
  Award,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  createPaymentOrder,
  getCheckoutSessionStatus,
} from "../services/paymentService";

function DonateMoney() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [amount, setAmount] = useState("500");
  const [purpose, setPurpose] = useState("food");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const presetAmounts = [250, 500, 1000, 2500, 5000];

  /*
   * -------------------------------------------------------
   * Set donor details from logged-in user
   * -------------------------------------------------------
   */
  useEffect(() => {
    if (user) {
      setDonorName(user.name || "");
      setDonorEmail(user.email || "");
    }
  }, [user]);

  /*
   * -------------------------------------------------------
   * Handle Stripe return
   *
   * Stripe redirects back to:
   * /donate-money?payment=success&session_id=...
   * -------------------------------------------------------
   */
  useEffect(() => {
    const checkStripePayment = async () => {
      const params = new URLSearchParams(window.location.search);

      const paymentStatus = params.get("payment");
      const sessionId = params.get("session_id");

      /*
       * User cancelled Stripe payment
       */
      if (paymentStatus === "cancelled") {
        setProcessing(false);
        setShowCheckout(false);

        alert("Payment was cancelled.");

        window.history.replaceState(
          {},
          "",
          window.location.pathname
        );

        return;
      }

      /*
       * No Stripe payment return
       */
      if (paymentStatus !== "success" || !sessionId) {
        return;
      }

      /*
       * User must be logged in
       */
      if (!user) {
        navigate("/login", {
          state: {
            from: `/donate-money?payment=success&session_id=${sessionId}`,
          },
        });

        return;
      }

      try {
        setProcessing(true);

        /*
         * Ask backend to retrieve and complete
         * the Stripe Checkout Session.
         */
        const result = await getCheckoutSessionStatus(sessionId);

        if (!result?.success) {
          throw new Error(
            result?.message || "Unable to verify Stripe payment."
          );
        }

        if (result?.status !== "Success") {
          throw new Error(
            "Payment was not completed successfully."
          );
        }

        const paid = result.payment;

        if (!paid) {
          throw new Error(
            "Payment information was not found."
          );
        }

        /*
         * Prepare receipt/success information
         */
        setSuccessData({
          txnId:
            paid.transactionId ||
            paid.providerSessionId ||
            sessionId,

          amount: Number(paid.amount || 0),

          purpose:
            paid.purpose ||
            "General Relief",

          donorName:
            paid.donorName ||
            donorName ||
            user.name ||
            "Donor",

          donorEmail:
            paid.donorEmail ||
            donorEmail ||
            user.email ||
            "",

          panNumber:
            panNumber ||
            "Not provided",

          date: new Date(
            paid.createdAt || Date.now()
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),

          time: new Date(
            paid.createdAt || Date.now()
          ).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),

          earnedKarma: Number(
            result.earnedKarma || 0
          ),
        });

        setShowCheckout(false);

        /*
         * Remove Stripe parameters from browser URL
         */
        window.history.replaceState(
          {},
          "",
          window.location.pathname
        );
      } catch (error) {
        console.error(
          "Stripe payment status error:",
          error
        );

        alert(
          error?.message ||
            "Unable to verify Stripe payment."
        );

        /*
         * Remove failed payment parameters
         */
        window.history.replaceState(
          {},
          "",
          window.location.pathname
        );
      } finally {
        setProcessing(false);
      }
    };

    checkStripePayment();
  }, [user, navigate, donorName, donorEmail, panNumber]);

  /*
   * -------------------------------------------------------
   * Start donation form
   * -------------------------------------------------------
   */
  const handleStartCheckout = (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 10
    ) {
      alert(
        "Please enter a valid donation amount of at least ₹10."
      );
      return;
    }

    if (!donorName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!donorEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!user) {
      navigate("/login", {
        state: {
          from: "/donate-money",
        },
      });

      return;
    }

    setShowCheckout(true);
  };

  /*
   * -------------------------------------------------------
   * Create Stripe Checkout Session
   * -------------------------------------------------------
   */
  const handleCompletePayment = async () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/donate-money",
        },
      });

      return;
    }

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 10
    ) {
      alert(
        "Donation amount must be at least ₹10."
      );
      return;
    }

    setProcessing(true);

    try {
      /*
       * Backend creates Stripe Checkout Session
       */
      const result = await createPaymentOrder({
        amount: numericAmount,
        purpose,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim().toLowerCase(),
        panNumber: panNumber
          ? panNumber.trim().toUpperCase()
          : "",
      });

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create Stripe checkout session."
        );
      }

      if (!result?.checkoutUrl) {
        throw new Error(
          "Stripe checkout URL was not received from server."
        );
      }

      /*
       * Redirect user to Stripe Checkout
       */
      window.location.href = result.checkoutUrl;
    } catch (error) {
      console.error(
        "Stripe checkout error:",
        error
      );

      setProcessing(false);

      alert(
        error?.message ||
          "Unable to start Stripe payment."
      );
    }
  };

  /*
   * -------------------------------------------------------
   * Generate PDF receipt
   * -------------------------------------------------------
   */
  const generatePDFReceipt = () => {
    if (!successData) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    /*
     * Header
     */
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "RAKSHAK FOUNDATION",
      105,
      18,
      {
        align: "center",
      }
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Donation Receipt",
      105,
      26,
      {
        align: "center",
      }
    );

    /*
     * Receipt box
     */
    doc.setTextColor(30, 41, 59);
    doc.setDrawColor(203, 213, 225);

    doc.roundedRect(
      15,
      45,
      180,
      140,
      4,
      4,
      "S"
    );

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text(
      "DONATION RECEIPT",
      20,
      56
    );

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);

    doc.text(
      `Receipt No: ${successData.txnId}`,
      190,
      56,
      {
        align: "right",
      }
    );

    doc.line(
      20,
      62,
      190,
      62
    );

    /*
     * Receipt details
     */
    const details = [
      [
        "Donor Name:",
        successData.donorName || "Not provided",
      ],

      [
        "Email Address:",
        successData.donorEmail || "Not provided",
      ],

      [
        "PAN Number:",
        successData.panNumber || "Not provided",
      ],

      [
        "Donation Purpose:",
        successData.purpose || "General Relief",
      ],

      [
        "Date & Time:",
        `${successData.date} at ${successData.time}`,
      ],

      [
        "Payment Mode:",
        "STRIPE CHECKOUT",
      ],

      [
        "Tax Information:",
        "Tax treatment depends on the registered organization and applicable law",
      ],
    ];

    let startY = 72;

    doc.setFontSize(10);

    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(71, 85, 105);

      doc.text(
        label,
        25,
        startY
      );

      doc.setFont("helvetica", "normal");
      doc.setTextColor(15, 23, 42);

      /*
       * Split long text so it does not
       * overflow outside the receipt.
       */
      const textLines = doc.splitTextToSize(
        String(value),
        110
      );

      doc.text(
        textLines,
        75,
        startY
      );

      startY +=
        Math.max(textLines.length, 1) * 6;
    });

    /*
     * Total amount box
     */
    doc.setFillColor(
      240,
      253,
      244
    );

    doc.setDrawColor(
      34,
      197,
      94
    );

    doc.roundedRect(
      20,
      146,
      170,
      22,
      3,
      3,
      "FD"
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(
      22,
      101,
      52
    );

    doc.text(
      "TOTAL AMOUNT RECEIVED:",
      25,
      159
    );

    doc.setFontSize(16);

    doc.text(
      `INR ${Number(
        successData.amount || 0
      ).toLocaleString("en-IN")}.00`,
      185,
      160,
      {
        align: "right",
      }
    );

    /*
     * Footer
     */
    doc.setFontSize(9);
    doc.setFont(
      "helvetica",
      "italic"
    );

    doc.setTextColor(
      100,
      116,
      139
    );

    doc.text(
      "This is a computer-generated donation receipt.",
      105,
      200,
      {
        align: "center",
      }
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setTextColor(
      30,
      41,
      59
    );

    doc.text(
      "RAKSHAK • Computer-generated donation receipt",
      105,
      206,
      {
        align: "center",
      }
    );

    doc.save(
      `RAKSHAK-Donation-Receipt-${successData.txnId}.pdf`
    );
  };

  /*
   * -------------------------------------------------------
   * SUCCESS SCREEN
   * -------------------------------------------------------
   */
  if (successData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-lg w-full text-center border border-gray-100">

          <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} />
          </div>

          <span className="text-xs uppercase tracking-widest text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Payment Successful
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-4">
            Thank You For Your Support!
          </h1>

          <p className="text-gray-600 mt-2 text-sm">
            Your generous contribution of{" "}
            <strong className="text-slate-900">
              ₹
              {Number(
                successData.amount || 0
              ).toLocaleString("en-IN")}
            </strong>{" "}
            will directly fund{" "}
            <strong className="text-slate-900">
              {successData.purpose}
            </strong>
            .
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 my-6 border border-green-200 text-left space-y-2">

            <div className="flex justify-between text-xs text-gray-500 gap-4">
              <span>Transaction ID:</span>

              <span className="font-mono font-bold text-slate-800 break-all text-right">
                {successData.txnId}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Date:</span>

              <span className="text-slate-800">
                {successData.date}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Payment Mode:</span>

              <span className="text-slate-800 font-semibold">
                Stripe Checkout
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-green-200/60">
              <span>Karma Points Earned:</span>

              <span className="font-bold text-green-700">
                +{successData.earnedKarma} Karma 🌱
              </span>
            </div>

          </div>

          <div className="space-y-3">

            <button
              onClick={generatePDFReceipt}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <Download size={18} />
              Download Donation Receipt (PDF)
            </button>

            <button
              onClick={() => {
                setSuccessData(null);
                setAmount("500");
                setPurpose("food");
                setPanNumber("");
                setShowCheckout(false);
              }}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition"
            >
              Make Another Donation
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-sm text-green-600 hover:underline font-medium block mx-auto pt-2"
            >
              Back to Home
            </button>

          </div>
        </div>
      </div>
    );
  }

  /*
   * -------------------------------------------------------
   * MAIN DONATION PAGE
   * -------------------------------------------------------
   */
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6 font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}
        <div className="text-center mb-10">

          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md mb-4">
            <Heart size={36} />
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Make A Monetary Contribution
          </h1>

          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Your payment is processed securely through Stripe Checkout.
            Your payment details are securely handled by Stripe.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Donation Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-200 p-8">

            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Select Donation Amount
            </h2>

            {/* Preset Amounts */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">

              {presetAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    setAmount(val.toString())
                  }
                  className={`py-3 rounded-xl border font-bold text-base transition ${
                    Number(amount) === val
                      ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
                      : "border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50"
                  }`}
                >
                  ₹{val}
                </button>
              ))}

            </div>

            <form
              onSubmit={handleStartCheckout}
              className="space-y-5"
            >

              {/* Custom Amount */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount in Indian Rupees (INR) *
                </label>

                <div className="relative">

                  <IndianRupee
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    min="10"
                    required
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter custom amount"
                    className="w-full border border-gray-300 rounded-xl py-3.5 pl-12 pr-4 text-xl font-bold text-slate-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>
              </div>

              {/* Purpose */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cause / Program *
                </label>

                <select
                  value={purpose}
                  onChange={(e) =>
                    setPurpose(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl py-3.5 px-4 outline-none bg-white font-medium focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >
                  <option value="food">
                    🍲 Surplus Food Redistribution & Transport
                  </option>

                  <option value="disaster">
                    🚨 Yamuna Flood & Emergency Relief
                  </option>

                  <option value="volunteer">
                    🛵 Volunteer Delivery Fuel & Logistics
                  </option>

                  <option value="general">
                    ❤️ General Hunger Relief Fund
                  </option>
                </select>

              </div>

              {/* Donor Details */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Donor Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) =>
                      setDonorName(e.target.value)
                    }
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 text-sm"
                  />

                </div>

                <div>

                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Email (for Receipt) *
                  </label>

                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) =>
                      setDonorEmail(e.target.value)
                    }
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 text-sm"
                  />

                </div>

              </div>

              {/* PAN */}
              <div>

                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  PAN Number (Optional)
                </label>

                <input
                  type="text"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) =>
                    setPanNumber(
                      e.target.value.toUpperCase()
                    )
                  }
                  placeholder="e.g. ABCDE1234F"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none uppercase font-mono text-sm focus:border-green-600"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 mt-4"
              >
                {processing
                  ? "Processing..."
                  : `Proceed to Pay ₹${amount || "0"}`}
              </button>

            </form>

          </div>

          {/* Right Info Box */}
          <div className="space-y-6">

            {/* Tax Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200 shadow-sm">

              <div className="flex items-center gap-3 text-green-800 font-bold mb-3">
                <ShieldCheck
                  size={26}
                  className="text-green-600"
                />

                <span>
                  Tax Receipt Information
                </span>
              </div>

              <p className="text-sm text-green-900/80 leading-relaxed">
                Tax benefits, if any, depend on RAKSHAK's
                actual legal registration and applicable
                Indian tax rules. Do not treat this receipt
                as an 80G certificate unless the organization
                is legally eligible and issues one.
              </p>

            </div>

            {/* Karma */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

              <div className="flex items-center gap-3 text-slate-900 font-bold mb-3">

                <Award
                  size={24}
                  className="text-orange-500"
                />

                <span>
                  Karma Rewards
                </span>

              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                For every ₹10 donated, you automatically
                earn <strong>+1 Karma Point</strong> to
                climb the donor leaderboard and unlock
                badges.
              </p>

            </div>

            {/* Transparency */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">

              <FileText
                className="mx-auto text-gray-400 mb-2"
                size={32}
              />

              <p className="text-xs text-gray-500">
                Donation records are stored securely for
                transparency and payment tracking.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------
          STRIPE CHECKOUT CONFIRMATION MODAL
      ------------------------------------------------ */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl">

            <h3 className="text-xl font-bold text-slate-900">
              Secure Stripe Checkout
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              You will be redirected to Stripe's secure
              payment page. Your payment details are
              securely handled by Stripe.
            </p>

            <div className="my-6 rounded-2xl bg-green-50 p-5 text-center">

              <div className="text-sm text-gray-500">
                Donation amount
              </div>

              <div className="text-3xl font-extrabold text-green-700">
                ₹
                {Number(amount).toLocaleString(
                  "en-IN"
                )}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                {donorName}
              </div>

              <div className="text-xs text-gray-500">
                {donorEmail}
              </div>

            </div>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowCheckout(false)
                }
                disabled={processing}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCompletePayment}
                disabled={processing}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-xl font-bold"
              >
                {processing
                  ? "Opening Stripe..."
                  : "Pay Securely"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default DonateMoney;