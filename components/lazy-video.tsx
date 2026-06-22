"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  rootMargin?: string;
}

/** Carga el src del video solo cuando entra (o está cerca) del viewport. */
export function LazyVideo({ src, rootMargin = "300px", ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          obs.disconnect();
        }
      },
      { rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [src, rootMargin]);

  return (
    <video
      ref={ref}
      {...props}
      src={activeSrc}
      preload={activeSrc ? props.preload ?? "auto" : "none"}
    />
  );
}
