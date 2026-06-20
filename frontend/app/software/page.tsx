"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getSoftware } from "@/lib/api";
import { motion } from "framer-motion";
import { ExternalLink, Monitor } from "lucide-react";

export default function SoftwarePage() {
  const [software, setSoftware] = useState<any[]>([]);

  useEffect(() => {
    getSoftware().then(setSoftware).catch(console.error);
  }, []);

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold">Explore Software</h1>
          <p className="text-slate-400 mt-3">
            Browse software tools, reviews, ratings, and AI summaries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {software.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <Monitor className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-sm text-blue-400">{item.category}</p>
                </div>
              </div>

              <p className="text-slate-400 line-clamp-3">{item.description}</p>

              <div className="flex justify-between items-center mt-6">
                <Link
                  href={`/software/${item.id}`}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  View Details
                </Link>

                <a
                  href={item.website}
                  target="_blank"
                  className="text-slate-400 hover:text-white"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}