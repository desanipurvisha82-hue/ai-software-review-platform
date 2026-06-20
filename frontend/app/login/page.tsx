"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("purvisha@gmail.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      window.location.href = "/dashboard";
    } catch {
      setMessage("Login failed. Check backend is running.");
    }
  }

  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <Navbar />

      <motion.form
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleLogin}
        className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-8">Login to your Novexa account</p>

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-6 outline-none focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-xl font-semibold">
          Login
        </button>

        {message && <p className="text-red-400 text-center mt-4">{message}</p>}
      </motion.form>
    </main>
  );
}