import { useInView } from "react-intersection-observer";
import { Utensils, Heart, Users, Building2 } from "lucide-react";
const stats = [
  {
    icon: <Utensils size={34} />,
    end: 12000,
    suffix: "+",
    title: "Meals Saved",
    color: "text-green-600",
  },
  {
    icon: <Heart size={34} />,
    end: 500000,
    prefix: "₹",
    suffix: "+",
    title: "Funds Raised",
    color: "text-red-500",
  },
  {
    icon: <Users size={34} />,
    end: 50000,
    suffix: "+",
    title: "Lives Impacted",
    color: "text-blue-500",
  },
  {
    icon: <Building2 size={34} />,
    end: 250,
    suffix: "+",
    title: "Partner NGOs",
    color: "text-orange-500",
  },
];

function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className={`${item.color} flex justify-center`}>
              {item.icon}
            </div>
            <h2 className="mt-5 text-4xl font-bold">
              {item.prefix || ""}
              {item.end.toLocaleString()}
              {item.suffix || ""}
            </h2>

            <p className="mt-2 text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
