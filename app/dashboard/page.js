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
  { name: "Lucas Hall", game: "Firekirin", amount: 522 },
  { name: "Amelia Clark", game: "Gameroom", amount: 388 },
  { name: "Mason Adams", game: "Cash Machine", amount: 449 },
  { name: "Harper Lewis", game: "Joker", amount: 696 },
  { name: "Elijah Walker", game: "Vegas Sweeps", amount: 129 },
  { name: "Evelyn Allen", game: "Panda Master", amount: 301 },
  { name: "Alexander Wright", game: "Milkyway", amount: 677 },
  { name: "Abigail King", game: "Blue Dragon", amount: 192 },
  { name: "Michael Green", game: "River Sweeps", amount: 413 },
  { name: "Ella Hill", game: "Orion Star", amount: 254 },
  { name: "Daniel Baker", game: "Cash Machine", amount: 674 },
  { name: "Scarlett Rivera", game: "YOLO", amount: 327 },
  { name: "Henry Perez", game: "Mafia", amount: 583 },
  { name: "Grace Campbell", game: "Gameroom", amount: 699 },
  { name: "Jackson Roberts", game: "Firekirin", amount: 214 },
  { name: "Aria Mitchell", game: "Ultra Panda", amount: 422 },
  { name: "Sebastian Turner", game: "Game Vault", amount: 599 },
  { name: "Luna Parker", game: "Juwa", amount: 134 },
  { name: "Matthew Evans", game: "Joker", amount: 378 },
  { name: "Chloe Edwards", game: "Milkyway", amount: 692 },
  { name: "David Collins", game: "Blue Dragon", amount: 175 },
  { name: "Victoria Stewart", game: "Vegas Sweeps", amount: 645 },
  { name: "Joseph Morris", game: "Orion Star", amount: 308 },
  { name: "Sofia Rogers", game: "Cash Machine", amount: 487 },
  { name: "Samuel Cook", game: "River Sweeps", amount: 299 },
  { name: "Avery Bell", game: "YOLO", amount: 559 },
  { name: "Carter Murphy", game: "Mafia", amount: 401 },
  { name: "Ella-Rose Bailey", game: "Gameroom", amount: 287 },
  { name: "Wyatt Cooper", game: "Juwa", amount: 664 },
  { name: "Layla Richardson", game: "Ultra Panda", amount: 321 },
  { name: "Jack Howard", game: "Game Vault", amount: 276 },
  { name: "Zoe Ward", game: "Firekirin", amount: 438 },
  { name: "Owen Cox", game: "Panda Master", amount: 583 },
  { name: "Mila Diaz", game: "Joker", amount: 367 },
  { name: "Luke Foster", game: "Milkyway", amount: 198 },
  { name: "Ella-Mae Simmons", game: "Vegas Sweeps", amount: 707 },
  { name: "Levi Bryant", game: "River Sweeps", amount: 426 },
  { name: "Hannah Gray", game: "Blue Dragon", amount: 315 },
  { name: "Ethan", game: "Ultra Panda", amount: 280 },
  { name: "George", game: "Blue Dragon", amount: 410 },
  { name: "Hannah", game: "Vegas Sweeps", amount: 700 },
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
  "We are a 100% legitimate platform with over 5 years of continuous operation."
];

// ⭐ Reviews (50)
const initialReviews = [
  { id: 1, user: "Olivia Carter", text: "Amazing games and smooth experience!" },
  { id: 2, user: "Liam Johnson", text: "Really fun and easy to play, highly recommend." },
  { id: 3, user: "Sophia Martinez", text: "Customer support was super helpful when I needed them." },
  { id: 4, user: "Noah Anderson", text: "Fast withdrawals, I got my winnings quickly!" },
  { id: 5, user: "Isabella Brown", text: "Great variety of slots and tables to choose from." },
  { id: 6, user: "Ethan Garcia", text: "The bonuses and rewards keep me coming back." },
  { id: 7, user: "Ava Davis", text: "Simple to use and works perfectly on my phone." },
  { id: 8, user: "James Wilson", text: "I love the graphics and the smooth gameplay." },
  { id: 9, user: "Mia Thompson", text: "Really addictive but in the best way possible!" },
  { id: 10, user: "Benjamin Scott", text: "Best online gaming experience I’ve had so far." },
  { id: 11, user: "Charlotte Young", text: "Payouts are legit, I cashed out with no issues." },
  { id: 12, user: "Lucas Hall", text: "Very user-friendly and fun to play with friends." },
  { id: 13, user: "Amelia Clark", text: "I enjoy the daily bonuses, they add a nice touch." },
  { id: 14, user: "Mason Adams", text: "Support team responded quickly to my questions." },
  { id: 15, user: "Harper Lewis", text: "Exciting games that keep you entertained for hours." },
  { id: 16, user: "Elijah Walker", text: "I had no problems depositing or withdrawing." },
  { id: 17, user: "Evelyn Allen", text: "I’ve tried others, but this one is by far the best." },
  { id: 18, user: "Alexander Wright", text: "The jackpots make it so thrilling to play." },
  { id: 19, user: "Abigail King", text: "Love the interface, very clean and modern." },
  { id: 20, user: "Michael Green", text: "Safe and secure, I feel comfortable playing here." },
  { id: 21, user: "Ella Hill", text: "Easy sign-up process and smooth gameplay." },
  { id: 22, user: "Daniel Baker", text: "Great graphics and no lag while playing." },
  { id: 23, user: "Scarlett Rivera", text: "Enjoying it more than I expected, very fun." },
  { id: 24, user: "Henry Perez", text: "Fast payouts, exactly what I was looking for." },
  { id: 25, user: "Grace Campbell", text: "The live games are really exciting and realistic." },
  { id: 26, user: "Jackson Roberts", text: "I appreciate the different payment options available." },
  { id: 27, user: "Aria Mitchell", text: "Definitely one of my top gaming choices now." },
  { id: 28, user: "Sebastian Turner", text: "The rewards system keeps me motivated to play." },
  { id: 29, user: "Luna Parker", text: "Smooth design, everything works flawlessly." },
  { id: 30, user: "Matthew Evans", text: "Great entertainment, I’ve been recommending it to friends." },
  { id: 31, user: "Chloe Edwards", text: "I love that I can play on both desktop and mobile." },
  { id: 32, user: "David Collins", text: "Very reliable platform, I’ve had no problems so far." },
  { id: 33, user: "Victoria Stewart", text: "Lots of game choices and fun challenges." },
  { id: 34, user: "Joseph Morris", text: "Trustworthy site, payouts are always on time." },
  { id: 35, user: "Sofia Rogers", text: "Friendly support staff who actually care." },
  { id: 36, user: "Samuel Cook", text: "Exciting themes and constant new updates." },
  { id: 37, user: "Avery Bell", text: "The bonuses are great and easy to claim." },
  { id: 38, user: "Carter Murphy", text: "Definitely my favorite gaming site right now." },
  { id: 39, user: "Ella-Rose Bailey", text: "The interface is simple and very intuitive." },
  { id: 40, user: "Wyatt Cooper", text: "Fun and fair, I enjoy playing every day." },
  { id: 41, user: "Layla Richardson", text: "Quick payouts, I was impressed by the speed." },
  { id: 42, user: "Jack Howard", text: "Plenty of games to choose from, never gets boring." },
  { id: 43, user: "Zoe Ward", text: "Great for casual gaming or longer sessions." },
  { id: 44, user: "Owen Cox", text: "The deposit process is fast and super easy." },
  { id: 45, user: "Mila Diaz", text: "I love the jackpots, always keeps me excited." },
  { id: 46, user: "Luke Foster", text: "Reliable payouts, I’ve cashed out several times." },
  { id: 47, user: "Ella-Mae Simmons", text: "Everything loads quickly and works smoothly." },
  { id: 48, user: "Levi Bryant", text: "One of the most entertaining gaming experiences online." },
  { id: 49, user: "Hannah Gray", text: "I love the daily promotions and extra bonuses." },
  { id: 50, user: "Daniel Ross", text: "Safe, fast, and fun — exactly what I wanted." },
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

  // Sidebar mini reviews cycle
  const [miniStart, setMiniStart] = useState(0);
  const [miniFade, setMiniFade] = useState(true);

  // Rotating slogan fade
  const [sloganFade, setSloganFade] = useState(true);

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

      {/* Main */}
      <div className="flex-1 relative z-10 p-8">
        {/* Title */}
        <h1
          className="text-center text-6xl md:text-7xl font-extrabold mb-2 tracking-wider
                     bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_28px_rgba(255,215,0,0.9)]"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
           Mandy Cast Casino
        </h1>

        {/* Rotating slogan */}
        <div
          className={`text-center text-lg md:text-xl text-yellow-200 mb-6 transition-opacity duration-500 ${
            sloganFade ? "opacity-100" : "opacity-60"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Winners never quit, Quitters never win
        </div>

        {/* Wins + Deposit + Message */}
        <section className="mb-10 max-w-5xl mx-auto flex items-center justify-between gap-8">
          {/* Wins */}
          <div className="flex-1 min-w-0">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4 text-green-400 tracking-wide"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              🏆 Recent Wins
            </h2>
            {currentWin && (
              <div className="bg-black/70 border border-green-400/70 rounded-xl p-4">
                <p className="text-xl">
                  <span className="font-bold text-yellow-300">{currentWin.name}</span> just won{" "}
                  <span className="font-bold text-pink-400">${currentWin.amount}</span> on{" "}
                  <span className="text-blue-400">{currentWin.game}</span> 🎉
                </p>
              </div>
            )}
          </div>

          {/* Buttons side by side */}
          <div className="flex gap-4 shrink-0 ml-8">
            {/* Deposit */}
            <button
              onClick={() => setShowDeposit(true)}
              className="px-7 py-3 rounded-2xl text-lg md:text-2xl font-extrabold text-black
                         bg-gradient-to-r from-yellow-300 via-amber-300 to-pink-500
                         shadow-[0_0_25px_rgba(255,215,0,0.55)] hover:shadow-[0_0_35px_rgba(255,215,0,0.85)]
                         hover:scale-[1.03] transition cursor-pointer animate-bounce"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              💳 Deposit
            </button>

            {/* Message Us */}
            <a
              href="https://www.facebook.com/profile.php?id=61556688809031"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-2xl text-lg md:text-2xl font-extrabold text-black
                         bg-gradient-to-r from-blue-400 to-indigo-500
                         shadow-[0_0_25px_rgba(0,0,255,0.55)] hover:shadow-[0_0_35px_rgba(0,0,255,0.85)]
                         hover:scale-[1.03] transition cursor-pointer animate-pulse"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              💬 Message Us
            </a>
          </div>
        </section>

        {/* Featured + Banners */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Featured (vertical) */}
          <div className="flex flex-col gap-6">
            {[
              { name: "🎣 Fish Games", desc: "Shoot fish & win big" },
              { name: "🎰 Slot Games", desc: "Spin the reels" },
              { name: "🎡 Roulette", desc: "Classic wheel of fortune" },
            ].map((g, i) => (
              <div
                key={i}
                className="bg-black/70 border-2 border-yellow-400 rounded-xl p-6 text-center hover:scale-[1.02] transition"
              >
                <h3 className="text-2xl font-bold text-yellow-300" style={{ fontFamily: "var(--font-orbitron)" }}>
                  {g.name}
                </h3>
                <p className="text-gray-300">{g.desc}</p>
              </div>
            ))}
          </div>

          {/* Banners */}
          <BannerSlider />
        </section>

        {/* Games */}
        <section className="mb-12">
          <h2
            className="text-5xl font-extrabold text-center mb-8 text-yellow-300 drop-shadow-md tracking-wide"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            🎮 Games
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {gameList.map((game, idx) => (
              <a
                key={idx}
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/70 border border-yellow-400 rounded-xl p-3 text-center hover:scale-105 transition cursor-pointer"
              >
                <Image
                  src={`/games/${game.name.toLowerCase().replace(/\s+/g, "")}.webp`}
                  alt={game.name}
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg"
                />
                <h3 className="text-lg mt-2 text-yellow-300 font-bold">{game.name}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-black/70 border border-yellow-400/70 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(255,215,0,0.25)]">
            <h3
              className="text-3xl md:text-4xl font-extrabold text-yellow-300 mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              About Us
            </h3>
            <div className="space-y-4 text-gray-200 leading-7">
              <p>
                <strong className="text-yellow-300">Welcome to Mandy Cast 🎉</strong>
              </p>
              <p>
                Since 2020, Mandy Cast has been a trusted and verified platform, delivering top-quality entertainment and rewards to thousands of players worldwide. Our mission is simple: to provide a seamless, secure, and enjoyable experience that no other platform can match.
              </p>
              <p className="text-yellow-200 font-semibold">Why Choose Us?</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>✅ 100% Signup Bonus – Kickstart your journey with double the excitement.</li>
                <li>🤝 50% Referral Bonus – Invite friends and earn big while sharing the fun.</li>
                <li>🎁 20% Regular Bonus – Keep winning with ongoing rewards.</li>
                <li>👑 Exclusive VIP Offers – Unlock premium perks designed for our VIP members.</li>
                <li>💳 Multiple Payment Options – Fast, secure, and flexible transactions.</li>
                <li>🕑 24/7 Support – Our friendly and professional team is always here for you.</li>
              </ul>
              <p>
                At Mandy Cast, we don’t just offer games—we create an experience filled with fun, rewards, and opportunities to win more every day.
              </p>
              <p className="text-yellow-200">
                ✨ Join us today and start your journey of entertainment and earning with the platform players trust.
              </p>
            </div>
          </div>

          {/* Closing banner */}
          <div
            className="mt-8 text-center text-4xl md:text-5xl font-extrabold
                       bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500 bg-clip-text text-transparent
                       drop-shadow-[0_0_26px_rgba(255,215,0,0.85)] tracking-wider"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Mandy Cast
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-black/80 p-6 relative z-20 flex flex-col">
        <button
          onClick={handleSignOut}
          className="mb-6 w-full py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-lg hover:scale-[1.02] transition cursor-pointer"
        >
          🚪 Sign Out
        </button>

        <nav className="flex flex-col gap-4">
          <button onClick={() => setShowRules(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">
            📜 Rules
          </button>
          <button onClick={() => setShowReviews(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">
            ⭐ Reviews
          </button>
          <button onClick={() => setShowContact(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">
            📩 Contact Us
          </button>
          <button onClick={() => setShowAgents(true)} className="py-2 px-4 bg-black/60 rounded-lg text-yellow-300 font-bold hover:scale-[1.02] transition cursor-pointer">
            🕹 Agent Links
          </button>
        </nav>

        {/* Mini Reviews */}
        <div className="mt-6 p-4 bg-black/60 rounded-lg text-sm border border-yellow-400/30">
          <h3 className="text-lg font-bold text-yellow-300 mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>
            ⭐ Latest Reviews
          </h3>

          <div className={`space-y-2 min-h-[110px] transition-opacity duration-300 ${miniFade ? "opacity-100" : "opacity-0"}`}>
            {getMiniReviews().map((r) => (
              <p key={r.id} className="text-gray-200">
                <span className="text-yellow-300 font-semibold">{r.user}:</span> {r.text}
              </p>
            ))}
          </div>

          <div className="mt-3 flex items-center bg-black/70 border border-yellow-400/40 rounded-lg overflow-hidden">
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addReview();
              }}
              placeholder="Write review..."
              className="flex-1 px-3 py-2 text-white bg-transparent placeholder-gray-400 outline-none"
            />
            <button
              onClick={addReview}
              className="px-4 py-2 bg-green-500 text-white font-bold text-lg rounded-r-lg hover:bg-green-600 transition cursor-pointer"
            >
              ➕
            </button>
          </div>
        </div>
      </aside>

      {/* Deposit placeholder */}
      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />

      {/* Modals */}
      <Modal title="📜 Terms & Conditions" isOpen={showRules} onClose={() => setShowRules(false)}>
        <ul className="list-disc pl-6 space-y-2">
          {terms.map((term, idx) => (
            <li key={idx}>{term}</li>
          ))}
        </ul>
      </Modal>

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

      <Modal title="📩 Contact Us" isOpen={showContact} onClose={() => setShowContact(false)}>
        <div className="space-y-4 text-lg">
          <p>📘 Facebook: <a href="https://www.facebook.com/profile.php?id=61556688809031" target="_blank" className="text-blue-400 hover:underline">facebook.com/mandycast</a></p>
          <p>📘 Facebook: <a href="https://www.facebook.com/profile.php?id=61577168813662" target="_blank" className="text-blue-400 hover:underline">facebook.com/mandycastii</a></p>
          <p>📘 Facebook: <a href="https://www.facebook.com/profile.php?id=61573703266334" target="_blank" className="text-blue-400 hover:underline">facebook.com/mandycastbackup</a></p>
          <p>📘 Facebook: <a href="https://www.facebook.com/groups/1479858426495795" target="_blank" className="text-blue-400 hover:underline">facebook.com/mandycastgroup</a></p>
          <p>📸 Instagram: <a href="https://instagram.com" target="_blank" className="text-pink-400 hover:underline">instagram.com/mandycast</a></p>
          <p>📧 Email: <a href="mailto:mandyusa700@email.com" className="text-yellow-300 hover:underline">mandyusa700@email.com</a></p>
        </div>
      </Modal>

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
