"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="text-blue-400" />
          Novexa Reviews
        </Link>

        <div className="flex gap-6 text-sm text-slate-300">
          <Link href="/software" className="hover:text-white">Software</Link>
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/login" className="hover:text-white">Login</Link>
          <Link
            href="/register"
            className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}