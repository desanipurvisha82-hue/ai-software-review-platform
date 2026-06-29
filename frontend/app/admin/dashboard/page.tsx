"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  BarChart3,
  Monitor,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getDashboardStats(token)
      .then(setStats)
      .catch(console.error);
  }, []);

  const cards = stats
    ? [
        { title: "Users", value: stats.totalUsers, icon: Users },
        { title: "Software", value: stats.totalSoftware, icon: Monitor },
        { title: "Reviews", value: stats.totalReviews, icon: Star },
        { title: "Avg Rating", value: stats.averageRating, icon: BarChart3 },
      ]
    : [];

  const overviewData = stats
    ? [
        { name: "Users", value: stats.totalUsers },
        { name: "Software", value: stats.totalSoftware },
        { name: "Reviews", value: stats.totalReviews },
      ]
    : [];

  const ratingData = stats
    ? [
        { name: "Average Rating", value: stats.averageRating },
        { name: "Remaining", value: Math.max(0, 5 - stats.averageRating) },
      ]
    : [];

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-3">
            Track users, software, reviews, and overall platform rating.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl"
            >
              <card.icon className="text-blue-400 mb-4" size={34} />
              <p className="text-slate-400">{card.title}</p>
              <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overviewData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Average Rating</h2>

            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingData}
                    innerRadius={70}
                    outerRadius={105}
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#1e293b" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="text-center text-3xl font-bold">
              {stats?.averageRating ?? 0}/5
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}