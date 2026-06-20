"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Brain, Star, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-36 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-blue-400 font-semibold mb-4">
            AI-Powered Software Review Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Discover Software with <br />
            <span className="text-blue-400">AI Review Insights</span>
          </h1>

          <p className="text-slate-300 mt-6 max-w-2xl mx-auto text-lg">
            Compare software, read reviews, check ratings, and generate AI-powered summaries using local Llama AI.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href="/software" className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500">
              Explore Software
            </Link>
            <Link href="/login" className="glass px-6 py-3 rounded-xl hover:bg-slate-800">
              Login
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: Brain, title: "AI Summaries", text: "Generate review summaries using Ollama and Llama 3.2." },
            { icon: Star, title: "Ratings", text: "Track ratings and feedback from real users." },
            { icon: ShieldCheck, title: "Secure Access", text: "JWT authentication with USER and ADMIN roles." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.04 }}
              className="glass p-6 rounded-2xl"
            >
              <item.icon className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-slate-400 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}