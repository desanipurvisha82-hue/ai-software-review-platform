"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { register } from "@/lib/api";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      setMessage("Registration successful. Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch {
      setMessage("Registration failed. Email may already exist.");
    }
  }

  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <Navbar />

      <motion.form
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleRegister}
        className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-slate-400 mb-8">
          Join Novexa Reviews and start reviewing software.
        </p>

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-6 outline-none focus:border-blue-500"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-xl font-semibold">
          Register
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-slate-300">
            {message}
          </p>
        )}

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </motion.form>
    </main>
  );
}