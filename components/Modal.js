"use client";

export default function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="bg-gray-900 border-2 border-yellow-400 rounded-2xl p-8 max-w-3xl w-full shadow-[0_0_25px_rgba(255,215,0,0.8)]">
        {/* Title */}
        <h2
          className="text-4xl font-extrabold mb-6 text-yellow-300 text-center drop-shadow-[0_0_20px_rgba(255,215,0,1)]"
          style={{ fontFamily: "'Monoton', cursive" }}
        >
          {title}
        </h2>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-gray-200 space-y-3">
          {children}
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-lg hover:scale-105 shadow-[0_0_15px_rgba(255,215,0,0.6)] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
