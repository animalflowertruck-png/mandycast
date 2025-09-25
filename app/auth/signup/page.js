"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import VideoBackground from "../../../components/VideoBackground";
import { Dice6 } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCred.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <VideoBackground />

      <div className="relative z-10 w-full max-w-md bg-black/80 border border-yellow-500/40 shadow-[0_0_25px_rgba(255,215,0,0.5)] rounded-2xl p-8">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent mb-6">
          <Dice6 className="w-8 h-8 text-yellow-400" />
          Mandy Cast
          <Dice6 className="w-8 h-8 text-yellow-400" />
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-1/2 px-3 py-2 bg-black border border-yellow-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-1/2 px-3 py-2 bg-black border border-yellow-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-black border border-yellow-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-yellow-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-black border border-yellow-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:scale-105 transform transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-yellow-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
