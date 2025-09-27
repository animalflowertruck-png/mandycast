"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import Modal from "../../components/Modal";
import BannerSlider from "../../components/BannerSlider";
import DepositModal from "../../components/DepositModal";
import { Orbitron, Poppins, Cinzel_Decorative, Dancing_Script } from "next/font/google";

// Fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const casinoFont = Cinzel_Decorative({ weight: ["700"], subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-orbitron" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });

// Games list
const gameList = [
  { name: "Juwa", link: "http://dl.juwa777.com" },
  { name: "Orion Star", link: "http://start.orionstars.vip:8580/index.html" },
  { name: "Milkyway", link: "https://milkywayapp.xyz" },
  { name: "Game Vault", link: "http://download.gamevault999.com" },
  { name: "Mafia", link: "http://www.mafia77777.com" },
  { name: "Fire Kirin", link: "http://start.firekirin.xyz:8580" },
  { name: "Ultra Panda", link: "http://www.ultrapanda.mobi/" },
  { name: "Gameroom", link: "https://www.gameroom777.com/m" },
  { name: "Blue Dragon", link: "http://app.bluedragon777.com" },
  { name: "Panda Master", link: "https://pandamaster.vip:8888/index.html" },
  { name: "Cash Machine", link: "http://www.cashmachine777.com" },
  { name: "YOLO", link: "https://yolo777.game/" },
  { name: "Joker", link: "https://www.joker777.win/" },
  { name: "Vegas Sweeps", link: "https://m.lasvegassweeps.com/" },
  { name: "River Sweeps", link: "https://getapp.river777.com/" },
];

// Agent links
const agentList = [
  { name: "Vegas Sweeps", link: "http://agent.lasvegassweeps.com" },
  { name: "Juwa", link: "https://ht.juwa777.com/login" },
  { name: "Orion Star", link: "https://orionstars.vip:8781/Store.aspx" },
  { name: "Milkyway", link: "https://milkywayapp.xyz:8781/Store.aspx" },
  { name: "Game Vault", link: "https://agent.gamevault999.com/userManagement" },
  { name: "Gameroom", link: "https://agentserver.gameroom777.com/admin/login" },
  { name: "Fire Kirin", link: "https://firekirin.xyz:8888/Store.aspx" },
  { name: "Ultra Panda", link: "https://ht.ultrapanda.mobi/#/login" },
  { name: "Mafia", link: "http://dl.mafia77777.com" },
  { name: "YOLO", link: "https://agent.yolo777.game/admin" },
  { name: "Joker", link: "https://agent.joker777.win/admin/login" },
  { name: "Cash Machine", link: "https://agentserver.cashmachine777.com/admin/login" },
  { name: "Blue Dragon", link: "https://agent.bluedragon777.com/Work/com_SetScore.aspx" },
  { name: "Panda Master", link: "https://pandamaster.vip/default.aspx" },
  { name: "River Sweeps", link: "https://river-pay.com/cashier/create" },
];

// Fake wins
const wins = [
  { name: "Alice", game: "Juwa", amount: 420 },
  { name: "Bob", game: "Milkyway", amount: 700 },
  { name: "Charlie", game: "Fire Kirin", amount: 315 },
  { name: "Diana", game: "Orion Star", amount: 590 },
  { name: "Olivia Carter", game: "Orion Star", amount: 653 },
  { name: "Liam Johnson", game: "Juwa", amount: 412 },
  { name: "Sophia Martinez", game: "Vegas Sweeps", amount: 298 },
  { name: "Noah Anderson", game: "Milkyway", amount: 585 },
  { name: "Isabella Brown", game: "Game Vault", amount: 344 },
  { name: "Ethan Garcia", game: "YOLO", amount: 705 },
  { name: "Ava Davis", game: "Panda Master", amount: 615 },
  { name: "James Wilson", game: "River Sweeps", amount: 477 },
  { name: "Mia Thompson", game: "Blue Dragon", amount: 351 },
  { name: "Benjamin Scott", game: "Mafia", amount: 221 },
  { name: "Charlotte Young", game: "Ultra Panda", amount: 672 },
  { name: "Lucas Hall", game: "Fire Kirin", amount: 522 },
  { name: "Amelia Clark", game: "Gameroom", amount: 388 },
  { name: "Mason Adams", game: "Cash Machine", amount: 449 },
  { name: "Harper Lewis", game: "Joker", amount: 696 },
  { name: "Elijah Walker", game: "Vegas Sweeps", amount: 129 },
  { name: "Ella Hill", game: "Orion Star", amount: 254 },
  { name: "Avery Bell", game: "YOLO", amount: 559 },
];

// Terms
const terms = [
  "Minimum Deposit: $5",
  "Maximum Deposit: No limit",
  "Deposit Bonus: 20% bonus",
  "Signup Bonus Deduction: Deducted at cashout",
  "Minimum Cashout: $15",
  "Maximum Cashout: $700",
  "Cashout Frequency: Up to 3 per day",
  "Processing Schedule: 3 times daily",
  "Referral Bonus: 50% credited after 3 deposits",
];

// Initial reviews (seeded)
const initialReviews = [
  { id: 1, user: "Olivia Carter", text: "Amazing games and smooth experience!" },
  { id: 2, user: "Liam Johnson", text: "Really fun and easy to play, highly recommend." },
  { id: 3, user: "Sophia Martinez", text: "Customer support was super helpful when I needed them." },
  { id: 4, user: "Noah Anderson", text: "Fast withdrawals, I got my winnings quickly!" },
  { id: 5, user: "Isabella Brown", text: "Great variety of slots and tables to choose from." },
];

export default function Dashboard() {
  const router = useRouter();

  const [currentWin, setCurrentWin] = useState(wins[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showRules, setShowRules] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");

  // Rotate wins
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentWin(wins[Math.floor(Math.random() * wins.length)]);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  const addReview = () => {
    const text = newReview.trim();
    if (!text) return;
    const added = { id: Date.now(), user: "Anonymous", text };
    setReviews((prev) => [added, ...prev]);
    setNewReview("");
  };

  return (
    <div className={`${poppins.variable} ${orbitron.variable} ${casinoFont.className} font-sans relative min-h-screen bg-black text-white flex`}>
      {/* Background video */}
      <video autoPlay loop muted playsInline className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-30">
        <source src="/casino-bg.mp4" type="video/mp4" />
      </video>

      {/* Main content */}
      <div className="relative z-10 flex-1 p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
        {/* Mobile Hamburger */}
        <button
          className="lg:hidden absolute top-4 right-4 z-30 p-2 rounded-md bg-yellow-400 text-black font-bold shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>

        {/* Title */}
        <h1
          className={`${casinoFont.className} text-center text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 tracking-wider
             bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500 bg-clip-text text-transparent
             drop-shadow-[0_0_28px_rgba(255,215,0,0.9)]`}
        >
          Mandy Cast Casino
        </h1>

        {/* Slogan */}
        <div className={`${dancingScript.className} text-center text-lg md:text-xl text-pink-300 mb-6 font-bold tracking-wide`}>
          Winners never quit, Quitters never win
        </div>

        {/* Recent Wins + Buttons */}
        <section className="mb-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="bg-black/60 border border-yellow-400/60 rounded-xl p-4">
                <p className="text-xl">
                  <span className="font-bold text-yellow-300">{currentWin.name}</span> just won{" "}
                  <span className="font-bold text-pink-400">${currentWin.amount}</span> on{" "}
                  <span className="text-blue-400">{currentWin.game}</span> 🎉
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:ml-6 flex-wrap">
              <button
                onClick={() => setShowDeposit(true)}
                className="px-7 py-3 rounded-2xl text-lg md:text-xl font-extrabold text-black bg-gradient-to-r from-yellow-300 via-amber-300 to-pink-500 shadow-md hover:scale-[1.02] transition cursor-pointer"
              >
                💳 Deposit
              </button>
              <a
                href="https://www.facebook.com/profile.php?id=61556688809031"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-2xl text-lg md:text-xl font-extrabold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-md hover:scale-[1.02] transition cursor-pointer"
              >
                💬 Message Us
              </a>
            </div>
          </div>
        </section>

        {/* Featured Games + Banner */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            {[{ name: "🎣 Fish Games", desc: "Shoot fish & win big" }, { name: "🎰 Slot Games", desc: "Spin the reels" }, { name: "🎡 Roulette", desc: "Classic wheel of fortune" }].map((g, i) => (
              <div key={i} className="bg-black/70 border-2 border-yellow-400 rounded-xl p-6 text-center hover:scale-[1.02] transition">
                <h3 className="text-2xl font-bold text-yellow-300">{g.name}</h3>
                <p className="text-gray-300">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full">
            <BannerSlider />
          </div>
        </section>

        {/* Games grid */}
        <section className="mb-12">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-yellow-300 drop-shadow-md tracking-wide">🎮 Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {gameList.map((game, idx) => (
              <a key={idx} href={game.link} target="_blank" rel="noopener noreferrer" className="bg-black/70 border border-yellow-400 rounded-xl p-3 text-center hover:scale-105 transition cursor-pointer">
                <Image src={`/games/${game.name.toLowerCase().replace(/\s+/g, "")}.webp`} alt={game.name} width={220} height={150} className="mx-auto rounded-lg w-full h-auto" />
                <h3 className="text-lg mt-2 text-yellow-300 font-bold">{game.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-black/70 border border-yellow-400/70 rounded-2xl p-6 md:p-8 shadow-md">
            <h3 className="text-3xl md:text-4xl font-extrabold text-yellow-300 mb-4 tracking-wide">About Us</h3>
            <div className="space-y-4 text-gray-200 leading-7">
              <p><strong className="text-yellow-300">Welcome to Mandy Cast 🎉</strong></p>
              <p>Since 2020, Mandy Cast has been a trusted and verified platform...</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>✅ 100% Signup Bonus</li>
                <li>🤝 50% Referral Bonus</li>
                <li>🎁 20% Regular Bonus</li>
                <li>👑 VIP Offers</li>
                <li>💳 Multiple Payment Options</li>
                <li>🕑 24/7 Support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 right-0 h-full lg:h-auto w-64 bg-black/95 lg:bg-black/80 p-6 z-20 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
      >
        <button onClick={handleSignOut} className="mb-6 w-full py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-lg hover:scale-[1.02] transition cursor-pointer">
          🚪 Sign Out
        </button>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setShowRules(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">📜 Rules</button>
          <button onClick={() => setShowReviews(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">⭐ Reviews</button>
          <button onClick={() => setShowContact(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">📩 Contact Us</button>
          <button onClick={() => setShowAgents(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">🕹 Agent Links</button>
        </nav>
        {/* Reviews */}
        <div className="mt-6 p-4 bg-black/60 rounded-lg text-sm border border-yellow-400/30">
          <h3 className="text-lg font-bold text-yellow-300 mb-2">⭐ Latest Reviews</h3>
          <div className="space-y-2 min-h-[110px]">
            {reviews.slice(0, 4).map((r) => (
              <p key={r.id} className="text-gray-200"><span className="text-yellow-300 font-semibold">{r.user}:</span> {r.text}</p>
            ))}
          </div>
          <div className="mt-3 flex items-center bg-black/70 border border-yellow-400/40 rounded-lg overflow-hidden">
            <input type="text" value={newReview} onChange={(e) => setNewReview(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addReview()} placeholder="Write review..." className="flex-1 px-3 py-2 text-white bg-transparent placeholder-gray-400 outline-none" />
            <button onClick={addReview} className="px-4 py-2 bg-green-500 text-white font-bold text-lg rounded-r-lg hover:bg-green-600 transition cursor-pointer">Submit</button>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
      <Modal title="📜 Terms & Conditions" isOpen={showRules} onClose={() => setShowRules(false)}><ul className="list-disc pl-6 space-y-2">{terms.map((t, i) => <li key={i}>{t}</li>)}</ul></Modal>
      <Modal title="⭐ Player Reviews" isOpen={showReviews} onClose={() => setShowReviews(false)}><div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">{reviews.map((r) => <div key={r.id} className="bg-black/60 rounded-lg p-3"><p className="text-gray-200"><span className="text-yellow-300 font-bold">{r.user}:</span> {r.text}</p></div>)}</div></Modal>
      <Modal title="📩 Contact Us" isOpen={showContact} onClose={() => setShowContact(false)}>
        <p>📘 Facebook: <a href="https://www.facebook.com/profile.php?id=61556688809031" target="_blank" className="text-blue-400 hover:underline">facebook.com/mandycast</a></p>
        <p>📸 Instagram: <a href="https://instagram.com" target="_blank" className="text-pink-400 hover:underline">instagram.com/mandycast</a></p>
        <p>📧 Email: <a href="mailto:mandyusa700@email.com" className="text-yellow-300 hover:underline">mandyusa700@email.com</a></p>
      </Modal>
      <Modal title="🕹 Agent Links" isOpen={showAgents} onClose={() => setShowAgents(false)}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">{agentList.map((a, i) => (
          <a key={i} href={a.link} target="_blank" rel="noopener noreferrer" className="bg-black/70 border border-yellow-400 rounded-xl p-3 text-center hover:scale-105 transition cursor-pointer">
            <Image src={`/games/${a.name.toLowerCase().replace(/\s+/g, "")}.webp`} alt={a.name} width={180} height={120} className="mx-auto rounded-lg" />
            <h3 className="text-lg mt-2 text-yellow-300 font-bold">{a.name}</h3>
          </a>
        ))}</div>
      </Modal>
    </div>
  );
}
