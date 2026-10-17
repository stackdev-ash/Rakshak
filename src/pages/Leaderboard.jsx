import { useState } from "react";
import {
  Award,
  Medal,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";

const Leaderboard = () => {
  const [category, setCategory] = useState("volunteers");

  const volunteers = [
    {
      rank: 1,
      name: "Rahul Sharma",
      points: 2850,
      missions: 42,
      icon: "RS",
    },
    {
      rank: 2,
      name: "Priya Singh",
      points: 2540,
      missions: 38,
      icon: "PS",
    },
    {
      rank: 3,
      name: "Aman Verma",
      points: 2310,
      missions: 35,
      icon: "AV",
    },
    {
      rank: 4,
      name: "Neha Gupta",
      points: 1980,
      missions: 29,
      icon: "NG",
    },
    {
      rank: 5,
      name: "Rohit Kumar",
      points: 1850,
      missions: 27,
      icon: "RK",
    },
    {
      rank: 6,
      name: "Anjali Singh",
      points: 1720,
      missions: 25,
      icon: "AS",
    },
    {
      rank: 7,
      name: "Vikas Yadav",
      points: 1640,
      missions: 23,
      icon: "VY",
    },
    {
      rank: 8,
      name: "Sneha Sharma",
      points: 1510,
      missions: 21,
      icon: "SS",
    },
    {
      rank: 9,
      name: "Karan Mehta",
      points: 1430,
      missions: 20,
      icon: "KM",
    },
    {
      rank: 10,
      name: "Pooja Verma",
      points: 1370,
      missions: 18,
      icon: "PV",
    },
  ];

  const donors = [
    {
      rank: 1,
      name: "ABC Restaurant",
      points: 3250,
      donations: 86,
      icon: "AR",
    },
    {
      rank: 2,
      name: "Rahul Foods",
      points: 2980,
      donations: 72,
      icon: "RF",
    },
    {
      rank: 3,
      name: "Ashutosh",
      points: 2680,
      donations: 64,
      icon: "AS",
    },
    {
      rank: 4,
      name: "XYZ Bakery",
      points: 2410,
      donations: 58,
      icon: "XB",
    },
    {
      rank: 5,
      name: "Green Restaurant",
      points: 2190,
      donations: 51,
      icon: "GR",
    },
    {
      rank: 6,
      name: "Amit Sharma",
      points: 2010,
      donations: 47,
      icon: "AS",
    },
    {
      rank: 7,
      name: "Food Corner",
      points: 1870,
      donations: 42,
      icon: "FC",
    },
    {
      rank: 8,
      name: "Neha Kapoor",
      points: 1750,
      donations: 38,
      icon: "NK",
    },
    {
      rank: 9,
      name: "Daily Bites",
      points: 1610,
      donations: 35,
      icon: "DB",
    },
    {
      rank: 10,
      name: "Raj Foods",
      points: 1490,
      donations: 31,
      icon: "RF",
    },
  ];

  const data = category === "volunteers" ? volunteers : donors;

  const currentUserRank = category === "volunteers" ? 12 : 18;
  const currentUserPoints = category === "volunteers" ? 1280 : 1120;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
              <Trophy size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Leaderboard
              </h1>

              <p className="text-sm text-gray-500">
                Recognizing people making a difference
              </p>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Intro */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-7 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h2 className="text-2xl font-bold">
                Make an Impact 🌱
              </h2>

              <p className="text-green-100 mt-2">
                Every donation and every mission helps you earn Karma
                Points.
              </p>
            </div>

            <div className="bg-white/20 rounded-xl px-5 py-4">

              <p className="text-sm text-green-100">
                Your Current Rank
              </p>

              <p className="text-3xl font-bold">
                #{currentUserRank}
              </p>

            </div>

          </div>

        </section>

        {/* Category */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex gap-2 mb-8">

          <button
            onClick={() => setCategory("volunteers")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
              category === "volunteers"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users size={20} />
            Volunteers
          </button>

          <button
            onClick={() => setCategory("donors")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
              category === "donors"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Utensils size={20} />
            Donors
          </button>

        </div>

        {/* Top 3 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {data.slice(0, 3).map((user) => (
            <div
              key={user.rank}
              className={`bg-white rounded-2xl p-6 text-center shadow-sm border ${
                user.rank === 1
                  ? "border-yellow-300"
                  : "border-gray-100"
              }`}
            >

              <div className="flex justify-center mb-4">

                {user.rank === 1 ? (
                  <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full">
                    <Trophy size={32} />
                  </div>
                ) : user.rank === 2 ? (
                  <div className="bg-gray-100 text-gray-600 p-4 rounded-full">
                    <Medal size={32} />
                  </div>
                ) : (
                  <div className="bg-orange-100 text-orange-600 p-4 rounded-full">
                    <Award size={32} />
                  </div>
                )}

              </div>

              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                {user.icon}
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Rank #{user.rank}
              </p>

              <p className="text-2xl font-bold text-green-600 mt-4">
                {user.points.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500">
                Karma Points
              </p>

            </div>
          ))}

        </section>

        {/* Full Ranking */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-800">
              Top {category === "volunteers" ? "Volunteers" : "Donors"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Ranked by Karma Points
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {data.map((user) => (
              <div
                key={user.rank}
                className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
              >

                {/* Rank */}
                <div className="w-10 text-center">

                  {user.rank <= 3 ? (
                    <span className="text-lg font-bold">
                      {user.rank === 1 && "🥇"}
                      {user.rank === 2 && "🥈"}
                      {user.rank === 3 && "🥉"}
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-500">
                      #{user.rank}
                    </span>
                  )}

                </div>

                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  {user.icon}
                </div>

                {/* Name */}
                <div className="flex-1">

                  <h3 className="font-semibold text-gray-800">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {category === "volunteers"
                      ? `${user.missions} missions completed`
                      : `${user.donations} donations made`}
                  </p>

                </div>

                {/* Points */}
                <div className="text-right">

                  <p className="font-bold text-green-600">
                    {user.points.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-500">
                    Karma
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Current User */}
        <section className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <p className="font-bold text-gray-800">
                  Your Position
                </p>

                <p className="text-sm text-gray-500">
                  Keep helping to climb the leaderboard!
                </p>
              </div>

            </div>

            <div className="text-right">

              <p className="text-xl font-bold text-green-600">
                #{currentUserRank}
              </p>

              <p className="text-sm text-gray-500">
                {currentUserPoints.toLocaleString()} Karma
              </p>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Leaderboard;