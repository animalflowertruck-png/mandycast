"use client";

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/casino-bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
