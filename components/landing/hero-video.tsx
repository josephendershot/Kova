"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const load = () => setVideoSrc("/hero.mp4");

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(load, 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.play().catch(() => {});
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      className="lp-hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      src={videoSrc ?? undefined}
    />
  );
}
