"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getSoftware } from "@/lib/api";
import { motion } from "framer-motion";
import { ExternalLink, Monitor, Search } from "lucide-react";

export default function SoftwarePage() {
  const [software, setSoftware] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getSoftware().then(setSoftware).catch(console.error);
  }, []);

  const categories = useMemo(() => {
    const unique = software.map((item) => item.category).filter(Boolean);
    return ["All", ...Array.from(new Set(unique))];
  }, [software]);

  const filteredSoftware = software.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold">Explore Software</h1>
          <p className="text-slate-400 mt-3">
            Browse software tools, reviews, ratings, and AI summaries.
          </p>
        </motion.div>

        <div className="glass p-5 rounded-2xl mt-10 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search
              className="absolute left-4 top-3.5 text-slate-500"
              size={20}
            />
            <input
              className="w-full bg-slate-900 border border-slate-700 p-3 pl-12 rounded-xl outline-none focus:border-blue-500"
              placeholder="Search software by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <p className="text-slate-400 mt-6">
          Showing {filteredSoftware.length} of {software.length} software tools
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filteredSoftware.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-700"
                  />
                ) : (
                  <div className="bg-blue-600/20 p-3 rounded-xl">
                    <Monitor className="text-blue-400" />
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-sm text-blue-400">{item.category}</p>
                </div>
              </div>

              <p className="text-slate-400 line-clamp-3">
                {item.description}
              </p>

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

        {filteredSoftware.length === 0 && (
          <div className="glass p-10 rounded-2xl mt-10 text-center">
            <p className="text-slate-300">No software found.</p>
          </div>
        )}
      </section>
    </main>
  );
}