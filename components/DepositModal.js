"use client";

import Modal from "./Modal";

/**
 * Placeholder deposit modal (no live payments yet).
 * Safe form UI you can later wire to Stripe/PayPal/Razorpay on submit.
 */
export default function DepositModal({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — integrate with Stripe Checkout or Payment Element later.
    alert("This is a placeholder. Connect Stripe/PayPal to accept real payments.");
    onClose();
  };

  return (
    <Modal title="💳 Deposit Funds" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6 text-black">
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Amount (USD)"
          className="w-full px-3 py-2 rounded-lg border outline-none focus:border-yellow-400"
          required
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="Card Number"
          className="w-full px-3 py-2 rounded-lg border outline-none focus:border-yellow-400"
          required
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="MM/YY"
            className="flex-1 px-3 py-2 rounded-lg border outline-none focus:border-yellow-400"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            className="flex-1 px-3 py-2 rounded-lg border outline-none focus:border-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg text-black font-extrabold hover:scale-[1.02] transition"
        >
          ✅ Pay Now (Placeholder)
        </button>
      </form>
    </Modal>
  );
}
