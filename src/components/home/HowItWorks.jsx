import { Upload, CheckCircle2, Truck, Smile } from "lucide-react";

const steps = [
  {
    icon: <Upload size={40} />,
    title: "Upload Donation",
    desc: "Add food details or donate money."
  },
  {
    icon: <CheckCircle2 size={40} />,
    title: "NGO Accepts",
    desc: "Verified NGO reviews your donation."
  },
  {
    icon: <Truck size={40} />,
    title: "Pickup & Delivery",
    desc: "Food is collected and delivered safely."
  },
  {
    icon: <Smile size={40} />,
    title: "Help People",
    desc: "Your contribution reaches those in need."
  }
];

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">

            How RAKSHAK Works

          </h2>

          <p className="mt-4 text-gray-600">

            Donate in four simple steps.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => (

            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-lg text-center"
            >

              <div className="flex justify-center text-green-600">

                {step.icon}

              </div>

              <h3 className="mt-5 text-2xl font-bold">

                {step.title}

              </h3>

              <p className="mt-3 text-gray-600">

                {step.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;