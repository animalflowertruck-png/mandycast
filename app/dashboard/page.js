"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import Modal from "../../components/Modal";
import BannerSlider from "../../components/BannerSlider";
import DepositModal from "../../components/DepositModal";
import { Orbitron, Poppins } from "next/font/google";
import { Cinzel_Decorative } from "next/font/google";

// 🎰 Google font import
const casinoFont = Cinzel_Decorative({
  weight: ["700"],
  subsets: ["latin"],
});

// Fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-orbitron",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

// 🎰 Player Games list
const gameList = [
  { name: "Orion Star", link: "http://start.orionstars.vip:8580/index.html" },
  { name: "Fire Kirin", link: "http://start.firekirin.xyz:8580" },
  { name: "Milkyway", link: "https://milkywayapp.xyz" },
  { name: "Gameroom", link: "https://www.gameroom777.com/m" },
  { name: "Joker", link: "https://www.joker777.win/" },
  { name: "Ultra Panda", link: "http://www.ultrapanda.mobi/" },
  { name: "Juwa", link: "http://dl.juwa777.com" },
  { name: "Game Vault", link: "http://download.gamevault999.com" },
  { name: "Mafia", link: "http://www.mafia77777.com" },
  { name: "YOLO", link: "https://yolo777.game/" },
  { name: "Blue Dragon", link: "http://app.bluedragon777.com" },
  { name: "Panda Master", link: "https://pandamaster.vip:8888/index.html" },
  { name: "Cash Machine", link: "http://www.cashmachine777.com" },
  { name: "Vegas Sweeps", link: "https://m.lasvegassweeps.com/" },
  { name: "River Sweeps", link: "https://getapp.river777.com/" },
];

// 👔 Agent Links list
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
  { name: "Blue Dragon", link: "https://agent.bluedragon777.com/Work/com_SetScore.aspx?sid=0113266431&action=setServerScore&tid=1701738577130" },
  { name: "Panda Master", link: "https://pandamaster.vip/default.aspx?638276565951391914" },
  { name: "River Sweeps", link: "https://river-pay.com/cashier/create" },
];

// 🎉 Fake wins list
const wins = [
  { name: "Alice", game: "Juwa", amount: 420 },
  { name: "Bob", game: "Milkyway", amount: 700 },
  { name: "Charlie", game: "Fire Kirin", amount: 315 },
  { name: "Diana", game: "Orion Star", amount: 590 },
  // ... keep your full wins list
];

// 📜 Terms list
const terms = [
  "Minimum Deposit: $5",
  "Maximum Deposit: No limit",
  "Deposit Bonus: All regular deposits receive a 20% bonus",
  "Freeplay requires active promotion of our platform (e.g., like, comment, and share).",
  "Redeemable freeplay can be cashed out at $10 once you grow it to $30 in-game. Remaining freeplay balance will be redeemed and reset to zero.",
  "Minimum Cashout: $15",
  "Maximum Cashout: $700 (determined solely by deposit amount; bonuses are not included in cashout eligibility).",
  "Signup Bonus Deduction: Any signup bonus will be deducted at the time of cashout.",
  "Cashout Frequency: Up to 3 cashouts allowed per day. Additional requests within 24 hours will be limited to 50% payout.",
  "Processing Schedule: Cashouts are processed three times daily. If a delay occurs, you will be notified.",
  "Claim Window: You must claim your cashout within 24 hours of your deposit.",
  "Game Re-entry Rule: Once a cashout request is submitted, do not re-enter the game. Any additional funds will be reset to zero.",
  "Referral bonuses are credited after your referred player completes three deposits.",
  "You will then receive 50% of their first deposit as a referral reward.",
  "We are a 100% legitimate platform with over 5 years of continuous operation.",
];

// ⭐ Reviews
const initialReviews = [
  { id: 1, user: "Olivia Carter", text: "Amazing games and smooth experience!" },
  { id: 2, user: "Liam Johnson", text: "Really fun and easy to play, highly recommend." },
  // ... keep full 50 reviews
];

export default function Dashboard() {
  const router = useRouter();

  const [currentWin, setCurrentWin] = useState(wins[0]);
  const [showRules, setShowRules] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");

  const [miniStart, setMiniStart] = useState(0);
  const [miniFade, setMiniFade] = useState(true);
  const [sloganFade, setSloganFade] = useState(true);

  // ✅ 30-minute auto logout
  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const diff = Date.now() - parseInt(loginTime, 10);
        if (diff > 30 * 60 * 1000) {
          signOut(auth).then(() => router.push("/auth/login"));
        }
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  // rotate wins
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentWin(wins[Math.floor(Math.random() * wins.length)]);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  // rotate mini reviews every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setMiniFade(false);
      setTimeout(() => {
        setMiniStart((s) => (s + 4) % reviews.length);
        setMiniFade(true);
      }, 250);
    }, 5000);
    return () => clearInterval(t);
  }, [reviews.length]);

  // slogan fade pulse
  useEffect(() => {
    const t = setInterval(() => setSloganFade((v) => !v), 2500);
    return () => clearInterval(t);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  const addReview = () => {
    if (!newReview.trim()) return;
    setReviews((prev) => [...prev, { id: Date.now(), user: "Anonymous", text: newReview }]);
    setNewReview("");
  };

  const getMiniReviews = () => {
    if (reviews.length <= 4) return reviews;
    const end = miniStart + 4;
    return end <= reviews.length
      ? reviews.slice(miniStart, end)
      : [...reviews.slice(miniStart), ...reviews.slice(0, end - reviews.length)];
  };

  return (
    <div className={`${poppins.variable} ${orbitron.variable} font-sans relative min-h-screen flex bg-black text-white`}>
      {/* Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="/casino-bg.mp4" type="video/mp4" />
      </video>

      {/* Main content (your full UI here — titles, slogans, wins, deposit button, banners, games, about us, etc) */}

      {/* Sidebar (reviews, rules, contact, agents, mini reviews, etc) */}

      {/* Deposit Modal */}
      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />

      {/* Rules Modal */}
      <Modal title="📜 Terms & Conditions" isOpen={showRules} onClose={() => setShowRules(false)}>
        <ul className="list-disc pl-6 space-y-2">
          {terms.map((term, idx) => (
            <li key={idx}>{term}</li>
          ))}
        </ul>
      </Modal>

      {/* Reviews Modal */}
      <Modal title="⭐ Player Reviews" isOpen={showReviews} onClose={() => setShowReviews(false)}>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-black/60 rounded-lg p-3">
              <p className="text-gray-200">
                <span className="text-yellow-300 font-bold">{r.user}:</span> {r.text}
              </p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal title="📩 Contact Us" isOpen={showContact} onClose={() => setShowContact(false)}>
        <div className="space-y-4 text-lg">
          <p>
            📘 Facebook:{" "}
            <a href="https://www.facebook.com/profile.php?id=61556688809031" target="_blank" className="text-blue-400 hover:underline">
              facebook.com/mandycast
            </a>
          </p>
          <p>
            📘 Facebook:{" "}
            <a href="https://www.facebook.com/profile.php?id=61577168813662" target="_blank" className="text-blue-400 hover:underline">
              facebook.com/mandycastii
            </a>
          </p>
          <p>
            📘 Facebook:{" "}
            <a href="https://www.facebook.com/profile.php?id=61573703266334" target="_blank" className="text-blue-400 hover:underline">
              facebook.com/mandycastbackup
            </a>
          </p>
          <p>
            📘 Facebook Group:{" "}
            <a href="https://www.facebook.com/groups/1479858426495795" target="_blank" className="text-blue-400 hover:underline">
              facebook.com/mandycastgroup
            </a>
          </p>
          <p>
            📸 Instagram:{" "}
            <a href="https://instagram.com" target="_blank" className="text-pink-400 hover:underline">
              instagram.com/mandycast
            </a>
          </p>
          <p>
            📧 Email:{" "}
            <a href="mailto:mandyusa700@email.com" className="text-yellow-300 hover:underline">
              mandyusa700@email.com
            </a>
          </p>
        </div>
      </Modal>

      {/* Agents Modal */}
      <Modal title="🕹 Agent Links" isOpen={showAgents} onClose={() => setShowAgents(false)}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agentList.map((agent, idx) => (
            <a
              key={idx}
              href={agent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/70 border border-yellow-400 rounded-xl p-3 text-center hover:scale-105 transition cursor-pointer"
            >
              <Image
                src={`/games/${agent.name.toLowerCase().replace(/\s+/g, "")}.webp`}
                alt={agent.name}
                width={180}
                height={120}
                className="mx-auto rounded-lg"
              />
              <h3 className="text-lg mt-2 text-yellow-300 font-bold">{agent.name}</h3>
            </a>
          ))}
        </div>
      </Modal>
    </div>
  );
}
