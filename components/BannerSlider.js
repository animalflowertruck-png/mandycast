"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Rotating banner that supports both images and videos.
 * - Fixed height container (h-[400px]) for stable layout.
 * - Uses object-contain so flyers never crop (letterboxed if needed).
 * - Images show for 10s; videos play fully before switching.
 * - Smooth fade transition.
 * - Entire banner is clickable: call onDepositClick() to open deposit modal.
 *
 * Place your files in /public/banners/ (already done).
 * Update the list below only if filenames change.
 */
const banners = [
  "/banners/flyer1.jpeg",
  "/banners/flyer2.png",
  "/banners/flyer3.png",
  "/banners/flyer4.png",
  "/banners/flyer5.png",
  "/banners/flyer6.png",
  "/banners/flyer7.png",
  "/banners/flyer8.png",
  "/banners/flyer9.jpeg",
  "/banners/flyer10.jpg",
  "/banners/flyer11.mp4",
  "/banners/flyer12.mp4",
  "/banners/flyer13.mp4",
  "/banners/flyer14.mp4",
  "/banners/flyer15.mp4",
  "/banners/flyer16.mp4",
  "/banners/flyer17.mp4",
];

export default function BannerSlider({ onDepositClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const file = banners[currentIndex];
    let timer;

    if (file.endsWith(".mp4")) {
      const v = videoRef.current;
      if (v) {
        // ensure playback starts
        v.currentTime = 0;
        v.play().catch(() => {});
        const onEnded = () => nextSlide();
        v.addEventListener("ended", onEnded);
        return () => v.removeEventListener("ended", onEnded);
      }
    } else {
      // image: 10s
      timer = setTimeout(() => nextSlide(), 10000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const nextSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
      setFadeIn(true);
    }, 350);
  };

  const file = banners[currentIndex];
  const isVideo = file.endsWith(".mp4");

  return (
    <button
      type="button"
      onClick={onDepositClick}
      className="group relative w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-black/60 via-black/50 to-black/60 border border-yellow-400/50 shadow-[0_0_30px_rgba(255,215,0,0.25)] cursor-pointer"
      aria-label="Open deposit from banner"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >
        {/* Media area with object-contain so nothing gets cropped */}
        {isVideo ? (
          <video
            key={file}
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            muted
            playsInline
          >
            <source src={file} type="video/mp4" />
          </video>
        ) : (
          <Image
            key={file}
            src={file}
            alt="Banner"
            fill
            className="object-contain bg-black"
            priority
          />
        )}
      </div>

      {/* Subtle overlay + hover hint */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/30" />
      <div className="absolute bottom-3 right-3 text-xs md:text-sm font-semibold text-yellow-300 opacity-80 group-hover:opacity-100">
        
      </div>
    </button>
  );
}
