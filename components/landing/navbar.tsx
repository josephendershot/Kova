"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Lang, Translations } from "@/lib/i18n";
import { track } from "@/lib/analytics";

interface NavbarProps {
  lang: Lang;
  t: Translations;
  scrolled: boolean;
  onToggleLang: () => void;
  onOpenTrial: () => void;
}

const NAV_LINKS = [
  { href: "#platform", key: "navPlatform" as const },
  { href: "#workspace", key: "navWorkspace" as const },
  { href: "#manifesto", key: "navManifesto" as const },
  { href: "#security", key: "navSecurity" as const },
];

export function Navbar({ lang, t, scrolled, onToggleLang, onOpenTrial }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [menuOpen]);

  return (
    <nav className={`lp-nav${scrolled ? " lp-nav--scrolled" : ""}`}>
      <Link href="/" className="lp-nav-brand" aria-label="Accura home">
        <svg viewBox="0 0 100 100" className="lp-nav-logo" aria-hidden="true">
          <path d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 50 95 L 50 50 L 11 27.5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <span className="lp-nav-name">Accura</span>
      </Link>

      <div className="lp-nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="lp-nav-link">
            {t[link.key]}
          </a>
        ))}
      </div>

      <div className="lp-nav-actions">
        <button type="button" className="lp-btn-menu" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-label="Menu">
          <span className="lp-btn-menu-bar" />
          <span className="lp-btn-menu-bar" />
        </button>
        <button type="button" onClick={onToggleLang} className="lp-btn-lang">
          {lang === "en" ? "ES" : "EN"}
        </button>
        <button
          type="button"
          onClick={() => {
            track("cta_nav_click");
            onOpenTrial();
          }}
          className="lp-btn-nav"
        >
          {t.navCta}
        </button>
      </div>

      {menuOpen && (
        <div className="lp-mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="lp-mobile-menu-link" onClick={() => setMenuOpen(false)}>
              {t[link.key]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
