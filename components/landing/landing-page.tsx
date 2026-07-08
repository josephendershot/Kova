"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardItem } from "@/components/card-item";
import { DemoVideo } from "@/components/demo-video";
import { HeroVideo } from "@/components/landing/hero-video";
import { Navbar } from "@/components/landing/navbar";
import { LazyVideo } from "@/components/lazy-video";
import { SectionStep } from "@/components/ui/section-step";
import { splitItalicTitle } from "@/components/ui/italic-headline";
import { track } from "@/lib/analytics";
import { getTranslations, type Lang } from "@/lib/i18n";

const TrialModal = dynamic(
  () => import("@/components/trial-modal").then((m) => m.TrialModal),
  { ssr: false }
);

const CARD_VIDEOS = ["/agents.mp4", "/works.mp4", "/doers.mp4", "/scale.mp4"];

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const t = getTranslations(lang);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const fired = { half: false };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = window.scrollY / max;
      if (!fired.half && pct >= 0.5) {
        fired.half = true;
        track("scroll_depth_50");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openTrial = () => {
    track("waitlist_open");
    setTrialOpen(true);
  };
  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));

  return (
    <div className="lp-root">
      <Navbar
        lang={lang}
        t={t}
        scrolled={scrolled}
        onToggleLang={toggleLang}
        onOpenTrial={openTrial}
      />

      <section className="lp-hero">
        <HeroVideo />
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <div className="lp-hero-inner">
            <div className="lp-hero-text">
              <h1 className="lp-hero-title">{t.heroTitle}</h1>
              <p className="lp-hero-sub">{t.heroSub}</p>
            </div>
            <div className="lp-hero-ctas">
              <button
                type="button"
                onClick={() => {
                  track("cta_hero_click");
                  openTrial();
                }}
                className="lp-btn-hero"
              >
                {t.navCta}
              </button>
              <a href="#platform" className="lp-btn-hero-secondary">
                {t.heroCtaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="lp-section-bone lp-problem">
        <div className="lp-prose-center">
          <p className="lp-body-text">{t.problemP1}</p>
          <p className="lp-body-text lp-mt18">{t.problemP2}</p>
          <p className="lp-body-text lp-mt18 lp-highlight">{t.problemP3}</p>
        </div>
        <div className="lp-demo-label">
          <p className="lp-eyebrow lp-text-center">{t.demoEyebrow}</p>
          <p className="lp-body-text lp-text-center lp-demo-sub">{t.demoSub}</p>
        </div>
        <div className="lp-screenshot">
          <DemoVideo
            key={lang}
            className="lp-demo-video"
            poster="/portada.jpg"
            src={lang === "es" ? "/demo-es.mp4" : "/demo.mp4"}
          />
        </div>
      </section>

      <section id="platform" className="lp-section-bone">
        <div className="lp-platform-wrap">
          <h2 className="lp-body-text lp-text-center">{t.platformTitle}</h2>
          <p className="lp-body-text lp-text-center lp-mb52">{t.platformSub}</p>
          <div className="lp-practice-grid">
            {t.practiceAreas.map((item) => (
              <div key={item} className="lp-practice-item">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section-bone lp-cards-section">
        {t.cards.map((card, i) => (
          <CardItem key={card.title} {...card} index={i} videoSrc={CARD_VIDEOS[i]} />
        ))}
      </section>

      <section id="workspace" className="lp-section-bone lp-workspace">
        <div className="lp-workspace-wrap">
          <p className="lp-eyebrow lp-text-center">{t.workspaceEyebrow}</p>
          <h2 className="lp-section-title lp-text-center">{t.workspaceTitle}</h2>
          <p className="lp-body-text lp-text-center lp-workspace-sub">{t.workspaceSub}</p>
          <div className="lp-workflow-grid">
            {t.workflowSteps.map((step) => (
              <div key={step.key} className="lp-workflow-step">
                <span className="lp-workflow-key">{step.key}</span>
                <h3 className="lp-workflow-title">{step.title}</h3>
                <p className="lp-workflow-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section-black lp-feature-section">
        <div className="lp-feature-wrap">
          <p className="lp-eyebrow lp-eyebrow-dark lp-text-center">{t.visibilityEyebrow}</p>
          <h2 className="lp-section-title lp-section-title-dark lp-text-center">
            {lang === "en" ? (
              <>Peek inside the <span className="lp-italic">black box.</span></>
            ) : (
              <>Mira dentro de la <span className="lp-italic">caja negra.</span></>
            )}
          </h2>
          <p className="lp-feature-sub lp-text-center">{t.visibilitySub}</p>
          <div className="lp-steps-grid">
            {t.visibilitySteps.map((step) => (
              <SectionStep key={step.title} title={step.title} body={step.body} dark />
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section-bone lp-feature-section lp-feature-section-border">
        <div className="lp-feature-wrap">
          <p className="lp-eyebrow lp-text-center">{t.growthEyebrow}</p>
          <h2 className="lp-section-title lp-text-center">
            {lang === "en" ? (
              <>Grow your firm with <span className="lp-italic">confidence.</span></>
            ) : (
              <>Haz crecer tu despacho con <span className="lp-italic">confianza.</span></>
            )}
          </h2>
          <p className="lp-body-text lp-text-center lp-feature-sub-light">{t.growthSub}</p>
          <div className="lp-steps-grid lp-steps-grid-6">
            {t.growthSteps.map((step) => (
              <SectionStep key={step.title} title={step.title} body={step.body} />
            ))}
          </div>
        </div>
      </section>

      <section id="manifesto" className="lp-section-black lp-manifesto">
        <div className="lp-manifesto-wrap">
          <h2 className="lp-manifesto-title">
            {lang === "en" ? (
              <>Mexican <span className="lp-italic">accounting</span> is a complexity problem — not an effort <span className="lp-italic">problem.</span></>
            ) : (
              <>La contabilidad mexicana es un problema de <span className="lp-italic">complejidad</span> — no de <span className="lp-italic">esfuerzo.</span></>
            )}
          </h2>
          <p className="lp-manifesto-p">{t.manifestoP1}</p>
          <p className="lp-manifesto-p">{t.manifestoP2}</p>
          <p className="lp-manifesto-p">{t.manifestoP6}</p>
          <p className="lp-manifesto-p">{t.manifestoP7}</p>
          <p className="lp-manifesto-p">{t.manifestoP8}</p>
          <p className="lp-manifesto-p">{t.manifestoP3}</p>
          <p className="lp-manifesto-p">{t.manifestoP4}</p>
          <p className="lp-manifesto-p lp-manifesto-p-dim">{t.manifestoP5}</p>
        </div>
      </section>

      <section id="security" className="lp-section-bone lp-security">
        <div className="lp-security-wrap">
          <h2 className="lp-security-title">
            {lang === "en" ? (
              <>Security built for accounting <span className="lp-italic">firms</span></>
            ) : (
              <>Seguridad diseñada para despachos <span className="lp-italic">contables</span></>
            )}
          </h2>
          <p className="lp-security-sub">{t.securitySub}</p>

          <div className="lp-certifications-grid">
            {t.securityItems.map((item) => {
              const { head, tail } = splitItalicTitle(item.title);
              return (
                <div key={item.title} className="lp-cert-card">
                  <h3 className="lp-cert-title">
                    {head}
                    {tail ? <span className="lp-italic"> {tail}</span> : null}
                  </h3>
                  <span className="lp-cert-badge">{item.status}</span>
                  <p className="lp-cert-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="lp-security-features">
            {t.securityFeatures.map((feature) => {
              const { head, tail } = splitItalicTitle(feature.title);
              return (
                <div key={feature.title} className="lp-feature-item">
                  <h4 className="lp-feature-title">
                    {head}
                    {tail ? <span className="lp-italic"> {tail}</span> : null}
                  </h4>
                  <p className="lp-feature-desc">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <LazyVideo
          className="lp-footer-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="/footer.mp4"
        />
        <div className="lp-footer-overlay" />
        <div className="lp-footer-bar">
          <div className="lp-footer-brand">
            <svg viewBox="0 0 100 100" className="lp-footer-logo" aria-hidden="true">
              <path d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
              <path d="M 50 95 L 50 50 L 11 27.5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <span className="lp-footer-name">Accura</span>
          </div>
          <div className="lp-footer-right">
            <button type="button" onClick={openTrial} className="lp-btn-footer">
              {t.navCta}
            </button>
            <p className="lp-footer-copy">{t.footerCopy}</p>
          </div>
        </div>
        <div className="lp-footer-legal">
          <a href="#security" className="lp-footer-link">{t.footerSecurity}</a>
          <Link href="/privacy" className="lp-footer-link">{t.footerPrivacy}</Link>
        </div>
      </footer>

      <TrialModal isOpen={trialOpen} onClose={() => setTrialOpen(false)} lang={lang} />
    </div>
  );
}
