"use client";

import { useState, useEffect } from "react";

export default function BannerRotator() {
  // 🎞️ Add all flyer images/videos inside /public/banners/
  const flyers = [
    { type: "image", src: "/banners/flyer1.png" },
    { type: "video", src: "/banners/flyer11.mp4" },
    { type: "image", src: "/banners/flyer3.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const current = flyers[currentIndex];
    let timer;

    if (current.type === "image") {
      // Images stay for 10 seconds
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % flyers.length);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, flyers]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % flyers.length);
  };

  const current = flyers[currentIndex];

  return (
    <div className="w-full h-64 bg-black/70 rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400 mb-8">
      {current.type === "image" ? (
        <img
          src={current.src}
          alt="Promotional Flyer"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={current.src}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
