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
        {
          title: "Users",
          value: stats.totalUsers,
          icon: Users,
        },
        {
          title: "Software",
          value: stats.totalSoftware,
          icon: Monitor,
        },
        {
          title: "Reviews",
          value: stats.totalReviews,
          icon: Star,
        },
        {
          title: "Avg Rating",
          value: stats.averageRating,
          icon: BarChart3,
        },
      ]
    : [];

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl"
            >
              <card.icon
                className="text-blue-400 mb-4"
                size={34}
              />

              <p className="text-slate-400">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}