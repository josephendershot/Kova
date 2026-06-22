"use client";

import { useEffect, useRef, useState } from "react";

interface DemoVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function DemoVideo({
  src,
  poster = "/portada.jpg",
  className,
}: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
  }, [src]);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.src = src;
    video.load();
    setActive(true);

    try {
      await video.play();
    } catch {
      setActive(false);
    }
  };

  return (
    <div className="demo-video-wrap">
      <video
        ref={videoRef}
        className={className}
        controls={active}
        playsInline
        preload="none"
        style={{ opacity: active ? 1 : 0 }}
      />

      {!active && (
        <>
          <img
            src={poster}
            alt=""
            className={`${className ?? ""} demo-video-poster`}
            loading="eager"
            decoding="async"
          />
          <button
            type="button"
            className="demo-video-play"
            onClick={handlePlay}
            aria-label="Play demo"
          >
            <span className="demo-video-play-icon" />
          </button>
        </>
      )}

      <style>{`
        .demo-video-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .demo-video-wrap video,
        .demo-video-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #111;
        }
        .demo-video-play {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: rgba(0, 0, 0, 0.18);
          cursor: pointer;
          padding: 0;
          transition: background 200ms ease;
        }
        .demo-video-play:hover {
          background: rgba(0, 0, 0, 0.28);
        }
        .demo-video-play-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          position: relative;
        }
        .demo-video-play-icon::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 54%;
          transform: translate(-50%, -50%);
          border-style: solid;
          border-width: 14px 0 14px 22px;
          border-color: transparent transparent transparent #111;
        }
        @media (max-width: 640px) {
          .demo-video-play-icon {
            width: 56px;
            height: 56px;
          }
          .demo-video-play-icon::after {
            border-width: 11px 0 11px 18px;
          }
        }
      `}</style>
    </div>
  );
}
