import {
  Award,
  CheckCircle,
  Gift,
  HeartHandshake,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";

const KarmaPoints = () => {
  const activities = [
    {
      title: "Completed Food Distribution Mission",
      description: "Successfully completed a volunteer mission",
      points: 100,
      date: "Today, 10:30 AM",
      icon: <CheckCircle size={20} />,
    },
    {
      title: "Emergency Relief Mission",
      description: "Helped people during emergency relief operation",
      points: 150,
      date: "12 Aug 2026",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "Food Distribution",
      description: "Distributed food to people in need",
      points: 100,
      date: "10 Aug 2026",
      icon: <HeartHandshake size={20} />,
    },
    {
      title: "Volunteer Registration",
      description: "Joined the RAKSHAK volunteer community",
      points: 20,
      date: "08 Aug 2026",
      icon: <Gift size={20} />,
    },
  ];

  const rules = [
    {
      title: "Complete a Mission",
      points: "+100",
      icon: <Target size={22} />,
    },
    {
      title: "Emergency Relief Mission",
      points: "+150",
      icon: <ShieldCheck size={22} />,
    },
    {
      title: "Help People in Need",
      points: "+50",
      icon: <HeartHandshake size={22} />,
    },
    {
      title: "Food Distribution",
      points: "+100",
      icon: <Gift size={22} />,
    },
    {
      title: "Earn a Certificate",
      points: "+50",
      icon: <Award size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <Award size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Karma Points
              </h1>

              <p className="text-sm text-gray-500">
                Your contribution and impact score
              </p>
            </div>

          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Main Karma Card */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-7 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 text-green-100">
                <Star size={20} />
                <span className="font-medium">
                  Your Karma Score
                </span>
              </div>

              <h2 className="text-5xl font-bold mt-3">
                1,280
              </h2>

              <p className="text-green-100 mt-2">
                Total Karma Points
              </p>

            </div>

            <div className="bg-white/20 rounded-2xl p-5 min-w-[220px]">

              <div className="flex items-center justify-between">

                <span className="text-sm text-green-100">
                  This Month
                </span>

                <TrendingUp size={20} />

              </div>

              <p className="text-3xl font-bold mt-2">
                +370
              </p>

              <p className="text-sm text-green-100">
                Karma Points earned
              </p>

            </div>

          </div>

        </section>

        {/* Level Progress */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Current Level
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Community Hero
              </h2>

            </div>

            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
              <Star size={25} />
            </div>

          </div>

          <div className="mt-6">

            <div className="flex justify-between text-sm">

              <span className="text-gray-500">
                1,280 Karma
              </span>

              <span className="font-semibold text-gray-700">
                1,500 Karma
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: "85%" }}
              />

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Only <span className="font-semibold text-green-600">
                220 points
              </span>{" "}
              needed for the next level.
            </p>

          </div>

        </section>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Activity */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">

            <div className="p-6 border-b border-gray-100">

              <h2 className="text-xl font-bold text-gray-800">
                Recent Karma Activity
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                See how you earned your points
              </p>

            </div>

            <div className="divide-y divide-gray-100">

              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="p-5 flex items-center gap-4"
                >

                  <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    {activity.icon}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-gray-800">
                      {activity.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {activity.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {activity.date}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-green-600">
                      +{activity.points}
                    </p>

                    <p className="text-xs text-gray-400">
                      Karma
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* How to Earn */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm">

            <div className="p-6 border-b border-gray-100">

              <h2 className="text-xl font-bold text-gray-800">
                How to Earn
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Earn more Karma Points
              </p>

            </div>

            <div className="p-5 space-y-4">

              {rules.map((rule) => (
                <div
                  key={rule.title}
                  className="flex items-center gap-3"
                >

                  <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                    {rule.icon}
                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-medium text-gray-800">
                      {rule.title}
                    </p>

                  </div>

                  <span className="font-bold text-green-600">
                    {rule.points}
                  </span>

                </div>
              ))}

            </div>

          </section>

        </div>

        {/* Levels */}
        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <h2 className="text-xl font-bold text-gray-800">
            Karma Levels
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Keep contributing to unlock new levels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            <div className="border rounded-xl p-5">

              <div className="p-3 bg-gray-100 text-gray-600 rounded-xl w-fit">
                <Star size={22} />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                New Volunteer
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                0 - 499 Points
              </p>

            </div>

            <div className="border rounded-xl p-5">

              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit">
                <Award size={22} />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Active Helper
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                500 - 999 Points
              </p>

            </div>

            <div className="border-2 border-green-500 rounded-xl p-5">

              <div className="p-3 bg-green-100 text-green-600 rounded-xl w-fit">
                <TrophyIcon />
              </div>

              <h3 className="font-bold text-green-700 mt-4">
                Community Hero
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                1,000 - 1,999 Points
              </p>

              <span className="inline-block mt-3 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Current Level
              </span>

            </div>

            <div className="border rounded-xl p-5">

              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl w-fit">
                <TrophyIcon />
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Impact Champion
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                2,000+ Points
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

const TrophyIcon = () => (
  <span className="text-xl">🏆</span>
);

export default KarmaPoints;