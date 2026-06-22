"use client";

import { useEffect, useRef, useState } from "react";

const BONE = "#ffffff";
const BLACK = "#111";

interface CardItemProps {
  title: string;
  body: string;
  index: number;
  videoSrc?: string;
}

export function CardItem({ title, body, videoSrc }: CardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

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
      { threshold: 0.15, rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
        transition: "opacity 580ms ease, transform 580ms ease",
      }}
    >
      <h3 className="lp-card-title">
        {head}
        {tail ? <span className="lp-italic"> {tail}</span> : null}
      </h3>
      <p className="lp-card-body">{body}</p>
      <div className="lp-card-video-wrap">
        {videoSrc ? (
          <video
            className="lp-card-video"
            autoPlay
            muted
            loop
            playsInline
            preload={loadVideo ? "auto" : "none"}
            src={loadVideo ? videoSrc : undefined}
          />
        ) : (
          <div className="lp-card-video-placeholder" />
        )}
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
          margin: 32px auto 0;
          width: 100%; max-width: 720px;
          overflow: hidden; background: transparent;
        }
        .lp-card-video {
          width: 100%;
          height: auto;
          display: block;
        }
        .lp-card-video-placeholder {
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .lp-italic {
          font-family: Georgia, serif;
          font-style: italic;
        }

        @media (max-width: 640px) {
          .lp-card-item { padding: 48px 16px; }
        }
      `}</style>
    </div>
  );
}
