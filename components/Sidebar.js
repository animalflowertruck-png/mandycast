"use client";
import { useState } from "react";

export default function Sidebar({ onRules, onReviews, onContact, onAgents, onSignOut }) {
  const [active, setActive] = useState("");

  const menuItems = [
    { name: "📜 Rules", onClick: onRules },
    { name: "⭐ Reviews", onClick: onReviews },
    { name: "📩 Contact Us", onClick: onContact },
    { name: "🕹 Agent Links", onClick: onAgents },
  ];

  return (
    <div className="w-64 bg-black/80 p-6 flex flex-col text-white">
      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        type="button"
        className="mb-6 w-full py-2 bg-gradient-to-r from-yellow-400 to-red-500 
                   text-black font-bold rounded-lg
                   hover:scale-105 transition-transform duration-200 !cursor-pointer"
      >
        🚪 Sign Out
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setActive(item.name);
              item.onClick();
            }}
            className={`py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold
                        transition-transform duration-200
                        hover:scale-105 hover:bg-yellow-400 hover:text-black
                        ${active === item.name ? "ring-2 ring-yellow-400" : ""} !cursor-pointer`}
            style={{ cursor: "pointer !important" }}   // 👈 inline hard override
          >
            {item.name}
          </div>
        ))}
      </nav>
    </div>
  );
}
