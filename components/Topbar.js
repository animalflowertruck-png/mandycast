"use client";

import { LogOut, BookOpen, Star, Mail, Users } from "lucide-react";

export default function Sidebar({ onSignOut }) {
  return (
    <aside className="fixed right-0 top-0 h-screen w-52 bg-black/80 border-l border-yellow-500 flex flex-col items-center py-6 space-y-6 z-50">
      {/* 🚪 Signout */}
      <button
        onClick={onSignOut}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-bold transition"
      >
        <LogOut size={18} /> Sign Out
      </button>

      {/* 📜 Rules */}
      <a
        href="#rules"
        className="flex items-center gap-2 text-yellow-300 hover:text-yellow-400 font-semibold"
      >
        <BookOpen size={18} /> Rules
      </a>

      {/* ⭐ Reviews */}
      <a
        href="#reviews"
        className="flex items-center gap-2 text-green-300 hover:text-green-400 font-semibold"
      >
        <Star size={18} /> Reviews
      </a>

      {/* 📩 Contact */}
      <a
        href="#contact"
        className="flex items-center gap-2 text-pink-300 hover:text-pink-400 font-semibold"
      >
        <Mail size={18} /> Contact
      </a>

      {/* 🧑‍💼 Agent Links */}
      <a
        href="#agents"
        className="flex items-center gap-2 text-purple-300 hover:text-purple-400 font-semibold"
      >
        <Users size={18} /> Agent Links
      </a>
    </aside>
  );
}
