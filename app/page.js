"use client";

import { Cinzel_Decorative } from "next/font/google";

// 🎰 Google font import
const casinoFont = Cinzel_Decorative({
  weight: ["700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/casino-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <main className="relative z-10 text-center px-6 max-w-5xl">
        {/* Title */}
        <h1
          className={`${casinoFont.className} text-4xl md:text-5xl font-bold mt-6 mb-4 
          bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_gold]
          opacity-0 animate-fadeInUp`}
        >
          Welcome to Mandy Cast Casino 
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-200 mb-6 opacity-0 animate-fadeInUp delay-200">
          Spin the reels, catch the fish, and win big — all in one place!
        </p>

        {/* Flyer Image */}
        <div className="flex justify-center mb-6 opacity-0 animate-fadeInUp delay-400">
          <img
            src="/flyer.png"
            alt="Mandy Cast Flyer"
            className="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-yellow-400 hover:scale-105 transition flyer-glow"
          />
        </div>

        {/* CTA Button */}
        <a
          href="/auth/signup"
          className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-extrabold rounded-xl hover:scale-110 transition join-glow opacity-0 animate-fadeInUp delay-600"
        >
          Join Now
        </a>

        {/* Winners ticker */}
        <div className="mt-10 w-full overflow-hidden relative h-8 opacity-0 animate-fadeInUp delay-800">
          <div className="whitespace-nowrap text-yellow-200 font-semibold absolute animate-[ticker_20s_linear_infinite]">
            🎉 Alice just won $250 on Slots • 🐟 Bob caught the Golden Fish worth $600 • 🎲 Carol rolled triple 7s and won $550! 🎉 Alice just won $250 on Slots • 🐟 Bob caught the Golden Fish worth $600 • 🎲 Carol rolled triple 7s and won $550!
          </div>
        </div>

        {/* About Section */}
        <section className="mt-16 bg-black/70 border border-yellow-500/40 rounded-2xl shadow-xl p-8 text-left opacity-0 animate-fadeInUp delay-1000">
          <h2
            className={`${casinoFont.className} text-3xl mt-2 mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_gold]`}
          >
            Welcome to Mandy Cast 🎉
          </h2>
          <p className="text-gray-200 mb-6">
            Since 2020, Mandy Cast has been a trusted and verified platform,
            delivering top-quality entertainment and rewards to thousands of
            players worldwide. Our mission is simple: to provide a seamless,
            secure, and enjoyable experience that no other platform can match.
          </p>

          <ul className="space-y-3 text-lg text-gray-200">
            <li>
              ✅ <strong>100% Signup Bonus</strong> – Kickstart your journey
              with double the excitement.
            </li>
            <li>
              🤝 <strong>50% Referral Bonus</strong> – Invite friends and earn
              big while sharing the fun.
            </li>
            <li>
              🎁 <strong>20% Regular Bonus</strong> – Keep winning with ongoing
              rewards.
            </li>
            <li>
              👑 <strong>Exclusive VIP Offers</strong> – Unlock premium perks
              designed for our VIP members.
            </li>
            <li>
              💳 <strong>Multiple Payment Options</strong> – Fast, secure, and
              flexible transactions.
            </li>
            <li>
              🕑 <strong>24/7 Support</strong> – Our friendly and professional
              team is always here for you.
            </li>
          </ul>

          <p className="mt-6 text-gray-200">
            At Mandy Cast, we don’t just offer games—we create an experience
            filled with fun, rewards, and opportunities to win more every day.
          </p>

          <div className="mt-6 text-center">
            <a
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-lg hover:scale-110 transition join-glow"
            >
              ✨ Join us today!
            </a>
          </div>
        </section>

        {/* Game grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fadeInUp delay-1200">
          {[
            {
              icon: "🎰",
              title: "Slots",
              desc: "Spin the reels & chase jackpots!",
            },
            {
              icon: "🐟",
              title: "Fish Games",
              desc: "Catch fish & win golden rewards!",
            },
            {
              icon: "🎲",
              title: "Card Games",
              desc: "Blackjack, Poker & more fun!",
            },
          ].map((game, idx) => (
            <div
              key={idx}
              className="bg-black/70 p-6 rounded-xl border border-yellow-500/40 shadow-lg hover:scale-105 hover:shadow-[0_0_20px_gold] transition"
            >
              <h2 className="text-3xl mb-2">
                {game.icon} {game.title}
              </h2>
              <p className="text-gray-300">{game.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* CSS for ticker + animations */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes flyerGlow {
          0% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
              0 0 40px rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 35px rgba(255, 215, 0, 0.9),
              0 0 70px rgba(255, 215, 0, 0.6);
          }
          100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
              0 0 40px rgba(255, 215, 0, 0.4);
          }
        }
        .flyer-glow {
          animation: flyerGlow 3s ease-in-out infinite;
        }

        @keyframes joinGlow {
          0% {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
              0 0 20px rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.9),
              0 0 50px rgba(255, 215, 0, 0.6);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
              0 0 20px rgba(255, 215, 0, 0.4);
          }
        }
        .join-glow {
          animation: joinGlow 2.5s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
}
