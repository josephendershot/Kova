"use client";

import { useEffect, useRef, useState } from "react";

const BLACK = "#111";

interface CardItemProps {
  title: string;
  body: string;
  index: number;
  videoSrc?: string;
}

export function CardItem({ title, body, index, videoSrc }: CardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setLoadVideo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;
    const video = videoRef.current;
    const play = () => {
      video.play().catch(() => {});
    };
    if (video.readyState >= 2) {
      setVideoReady(true);
      play();
    } else {
      video.addEventListener("loadeddata", () => {
        setVideoReady(true);
        play();
      }, { once: true });
    }
  }, [loadVideo, videoSrc]);

  const lastSpace = title.lastIndexOf(" ");
  const head = lastSpace > -1 ? title.slice(0, lastSpace) : title;
  const tail = lastSpace > -1 ? title.slice(lastSpace + 1) : "";

  return (
    <div
      ref={ref}
      className="lp-card-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 580ms ease ${index * 80}ms, transform 580ms ease ${index * 80}ms`,
      }}
    >
      <h3 className="lp-card-title">
        {head}
        {tail ? <span className="lp-italic"> {tail}</span> : null}
      </h3>
      <p className="lp-card-body">{body}</p>
      <div className="lp-card-video-wrap">
        {!videoReady && <div className="lp-card-video-skeleton" aria-hidden="true" />}
        {videoSrc && loadVideo ? (
          <video
            ref={videoRef}
            className="lp-card-video"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={videoSrc}
          />
        ) : !videoSrc ? (
          <div className="lp-card-video-placeholder" />
        ) : null}
      </div>

      <style>{`
        .lp-card-item {
          max-width: 860px; margin: 0 auto;
          padding: 64px 20px; text-align: center;
        }
        .lp-card-title {
          margin: 0;
          font-size: clamp(26px, 4vw, 54px);
          font-weight: 700; color: ${BLACK};
          letter-spacing: -0.04em; line-height: 1.08;
        }
        .lp-card-body {
          margin: 20px auto 0;
          font-size: clamp(15px, 1.6vw, 19px);
          line-height: 1.9; max-width: 580px;
          color: rgb(136,136,136);
        }
        .lp-card-video-wrap {
          position: relative;
          margin: 32px auto 0;
          width: 100%; max-width: 720px;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 12px;
          background: ${BLACK};
        }
        .lp-card-video-skeleton {
          position: absolute; inset: 0;
          background: linear-gradient(
            110deg,
            #1a1a1a 8%,
            #2a2a2a 18%,
            #1a1a1a 33%
          );
          background-size: 200% 100%;
          animation: lp-card-shimmer 1.4s ease-in-out infinite;
        }
        @keyframes lp-card-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .lp-card-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 400ms ease;
        }
        .lp-card-video-placeholder {
          width: 100%; height: 100%;
          background: ${BLACK};
        }
        .lp-italic {
          font-family: Georgia, serif;
          font-style: italic;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-video-skeleton { animation: none; }
          .lp-card-item { transition: none; }
        }
        @media (max-width: 640px) {
          .lp-card-item { padding: 48px 16px; }
          .lp-card-video-wrap { border-radius: 10px; }
        }
      `}</style>
    </div>
  );
}
