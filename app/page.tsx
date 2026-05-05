"use client";

import { useEffect, useState } from "react";
import { CardItem } from "@/components/card-item";
import { TrialModal } from "@/components/trial-modal";

const BONE = "#ffffff";
const BLACK = "#111";

type Lang = "en" | "es";

const T = {
  en: {
    navCta: "Get in touch →",
    heroTitle: "The new era of accounting",
    heroSub: "Your accounting firm, running on autopilot",
    problemP1:
      "Accounting firms still operate on portals, phone calls, CRMs/ERPs and Excel spreadsheets. Your firm deserves full autonomy — not more manual work.",
    problemP2:
      "Mexican accountants spend 70% of their time on repetitive tasks that don't require their professional judgment.",
    problemP3:
      "We're not a software vendor. We build and deploy secure, industrial-grade AI agents designed specifically for your accounting firm.",
    platformTitle: "One platform for your entire firm.",
    platformSub: "Core modules designed for every practice area.",
    practiceAreas: ["CAS", "Tax", "Audit", "Advisory"],
    cards: [
      {
        title: "Agents that do the work.",
        body: "Kova operates in the background, executing accounting workflows from start to finish and updating you at key moments. The result is delivered ready for review, with the quality you'd expect from an experienced accountant.",
      },
      {
        title: "Works the way you do.",
        body: "Kova adapts to your firm's standards, your practice and each engagement. It's built on solid accounting principles and adjusts to how your team actually works, delivering accurate results that meet what your clients expect.",
      },
      {
        title: "Doers become reviewers.",
        body: "When Kova handles execution, your accountants shift from doing the work to reviewing it — managing agents, applying judgment and advising clients. Better output, fewer review cycles and a team focused on what truly matters.",
      },
      {
        title: "Scale your revenue capacity.",
        body: "Firms are at capacity: more client demand, compressed margins and scarce experienced resources. Kova gives your team the capacity to serve more clients and take on more complex engagements.",
      },
    ],
    manifestoTitle:
      "Mexican accounting is a complexity problem — not an effort problem.",
    manifestoP1:
      "The SAT issues and receives millions of CFDIs every day. Each invoice carries a world of structured information: items, taxes, withholdings, complements, addendas. All of it already exists in XML — readable, precise, ready to use.",
    manifestoP2:
      "And yet, accounting practice remains largely manual. Not because accountants aren't capable — but because the tools never rose to the level of Latin America's most complex tax regime.",
    manifestoP3:
      "We are a team of accountants and engineers who lived that gap firsthand. Kova was born from that: from the conviction that if the information already exists in structured format, re-entering it by hand is a solved problem — just solved badly.",
    manifestoP4:
      "We build agents that do real accounting work: they classify, reconcile, detect inconsistencies and prepare information for filing — operating on the logic of the Mexican tax regime, not on a generic AI layer.",
    manifestoP5:
      "Our mission is straightforward: let Mexican accountants spend their time on judgment and clients — not on the SAT portal.",
    manifestoP6:
      "Globally, the accounting profession is under pressure. Experienced accountants are retiring faster than new professionals are entering. In the US alone, 300,000 accountants left the profession in the last two years. In Latin America, the gap is even wider — demand for accounting services grows while talent becomes scarcer.",
    manifestoP7:
      "For multinational companies operating in Mexico, the challenge multiplies. They must navigate transfer pricing rules, foreign investment regulations, maquiladora regimes, and constant SAT requirements — all while their global ERP systems weren't built for Mexican fiscal complexity. Most end up relying on spreadsheets and local workarounds.",
    manifestoP8:
      "Latin America represents one of the most complex regulatory environments in the world. Brazil's tax code, Colombia's electronic invoicing, Argentina's inflation accounting — each country demands specialized knowledge. Mexico sits at the center: a $1.3 trillion economy with 70+ million taxpayers and the most advanced electronic invoicing system in the region.",
    securityTitle: "Security built for accounting firms",
    securitySub: "Your clients' data deserves enterprise-grade protection. We're building multiple layers of industry-standard security.",
    securityItems: [
      { title: "SOC 2 Type II", status: "Coming Soon", desc: "Security, availability, and confidentiality certification" },
      { title: "ISO 27001", status: "Coming Soon", desc: "Information security management standard" },
      { title: "GDPR", status: "Coming Soon", desc: "European data protection compliance" },
      { title: "LFPDPPP", status: "Coming Soon", desc: "Mexican Federal Data Protection Law compliance" },
      { title: "CNBV Standards", status: "Coming Soon", desc: "Mexican financial regulatory compliance" },
      { title: "SAT Integration", status: "Coming Soon", desc: "Secure connection with Mexican tax authority" },
    ],
    securityFeatures: [
      { title: "No model training", desc: "Your data never trains or improves any AI model" },
      { title: "Full data isolation", desc: "Strict tenant separation across every customer" },
      { title: "Traceable AI", desc: "Every agent action is logged and auditable" },
      { title: "Encrypted at rest", desc: "AES-256 encryption across all stored data" },
      { title: "Encrypted in transit", desc: "HTTPS/TLS on every connection" },
      { title: "Mexico-based hosting", desc: "All customer data stored in Mexico" },
      { title: "Your data, your control", desc: "Export or delete your data at any time. No lock-in, no questions." },
      { title: "No selling or sharing", desc: "Firm and client data is never shared with third parties." },
      { title: "Transparent by design", desc: "AI steps show sources, changes, and rationale." },
    ],
    trialTitle: "Get in touch",
    trialBody: "Leave us your information and we'll contact you shortly.",
    trialAccept: "Send",
    footerCopy: "© 2026 Kova",
  },
  es: {
    navCta: "Contáctanos →",
    heroTitle: "La nueva era de la contabilidad",
    heroSub: "Tu despacho contable, operando en piloto automático",
    problemP1:
      "Los despachos contables aún operan con portales, llamadas, CRMs/ERPs y hojas de Excel. Tu firma merece autonomía total — no más trabajo manual.",
    problemP2:
      "Los contadores mexicanos pasan el 70% de su tiempo en tareas repetitivas que no requieren su criterio profesional.",
    problemP3:
      "No somos un proveedor de software. Construimos e implementamos agentes de IA seguros y de grado industrial, diseñados específicamente para tu despacho contable.",
    platformTitle: "Una plataforma para todo tu despacho.",
    platformSub:
      "Módulos centrales diseñados para las necesidades de cada área de práctica.",
    practiceAreas: ["CAS", "Impuestos", "Auditoría", "Asesoría"],
    cards: [
      {
        title: "Agentes que hacen el trabajo.",
        body: "Kova opera en segundo plano, ejecutando flujos de trabajo contables de principio a fin y actualizándote en momentos clave. El resultado se entrega listo para revisión, con la calidad que esperarías de un contador experimentado.",
      },
      {
        title: "Trabaja como tú lo haces.",
        body: "Kova se adapta a los estándares de tu despacho, tu práctica y cada compromiso. Está construido sobre principios contables sólidos y se ajusta a cómo trabaja realmente tu equipo, entregando resultados precisos que cumplen con lo que tus clientes esperan.",
      },
      {
        title: "Los ejecutores se vuelven revisores.",
        body: "Cuando Kova se encarga de la ejecución, tus contadores pasan de hacer el trabajo a revisarlo: gestionando agentes, aplicando criterio y asesorando clientes. Mejor producto, menos ciclos de revisión y un equipo enfocado en lo que realmente importa.",
      },
      {
        title: "Amplía tu capacidad de ingresos.",
        body: "Los despachos están al límite: más demanda de clientes, márgenes apretados y pocos recursos experimentados. Kova le da a tu equipo la capacidad para atender más clientes y compromisos más complejos.",
      },
    ],
    manifestoTitle:
      "La contabilidad mexicana es un problema de complejidad — no de esfuerzo.",
    manifestoP1:
      "El SAT emite y recibe millones de CFDIs cada día. Cada factura lleva consigo un mundo de información estructurada: conceptos, impuestos, retenciones, complementos, addendas. Todo eso ya existe en XML — legible, preciso, listo para usarse.",
    manifestoP2:
      "Y aun así, la práctica contable sigue siendo en gran parte manual. No porque los contadores no sean capaces — sino porque las herramientas nunca estuvieron a la altura del régimen fiscal más complejo de América Latina.",
    manifestoP3:
      "Somos un equipo de contadores e ingenieros que vivimos ese desfase de primera mano. Kova nació de ahí: de la convicción de que si la información ya existe en formato estructurado, re-capturarla a mano es un problema resuelto — solo que mal.",
    manifestoP4:
      "Construimos agentes que hacen trabajo contable real: clasifican, concilian, detectan inconsistencias y preparan información para presentación — operando sobre la lógica del régimen mexicano, no sobre una capa genérica de IA.",
    manifestoP5:
      "Nuestra misión es directa: que los contadores mexicanos dediquen su tiempo al criterio y al cliente — no al portal del SAT.",
    manifestoP6:
      "Globalmente, la profesión contable está bajo presión. Los contadores experimentados se retiran más rápido de lo que entran nuevos profesionales. Solo en EE.UU., 300,000 contadores dejaron la profesión en los últimos dos años. En América Latina, la brecha es aún mayor — la demanda de servicios contables crece mientras el talento escasea.",
    manifestoP7:
      "Para las empresas multinacionales que operan en México, el desafío se multiplica. Deben navegar reglas de precios de transferencia, regulaciones de inversión extranjera, regímenes de maquiladoras y requisitos constantes del SAT — todo mientras sus sistemas ERP globales no fueron construidos para la complejidad fiscal mexicana. La mayoría termina dependiendo de hojas de cálculo y soluciones locales improvisadas.",
    manifestoP8:
      "América Latina representa uno de los entornos regulatorios más complejos del mundo. El código fiscal de Brasil, la facturación electrónica de Colombia, la contabilidad inflacionaria de Argentina — cada país exige conocimiento especializado. México está en el centro: una economía de $1.3 billones de dólares con más de 70 millones de contribuyentes y el sistema de facturación electrónica más avanzado de la región.",
    securityTitle: "Seguridad diseñada para despachos contables",
    securitySub: "Los datos de tus clientes merecen protección de nivel empresarial. Estamos construyendo múltiples capas de seguridad estándar de la industria.",
    securityItems: [
      { title: "SOC 2 Type II", status: "Próximamente", desc: "Certificación de seguridad, disponibilidad y confidencialidad" },
      { title: "ISO 27001", status: "Próximamente", desc: "Estándar de gestión de seguridad de la información" },
      { title: "GDPR", status: "Próximamente", desc: "Cumplimiento de protección de datos europea" },
      { title: "LFPDPPP", status: "Próximamente", desc: "Cumplimiento de la Ley Federal de Protección de Datos" },
      { title: "Estándares CNBV", status: "Próximamente", desc: "Cumplimiento regulatorio financiero mexicano" },
      { title: "Integración SAT", status: "Próximamente", desc: "Conexión segura con la autoridad fiscal mexicana" },
    ],
    securityFeatures: [
      { title: "Sin entrenamiento de modelos", desc: "Tus datos nunca entrenan ni mejoran ningún modelo de IA" },
      { title: "Aislamiento total de datos", desc: "Separación estricta entre cada cliente" },
      { title: "IA trazable", desc: "Cada acción de agente está registrada y auditable" },
      { title: "Encriptado en reposo", desc: "Encriptación AES-256 en todos los datos almacenados" },
      { title: "Encriptado en tránsito", desc: "HTTPS/TLS en cada conexión" },
      { title: "Hosting en México", desc: "Todos los datos de clientes almacenados en México" },
      { title: "Tus datos, tu control", desc: "Exporta o elimina tus datos cuando quieras. Sin ataduras ni preguntas." },
      { title: "Prohibida su venta o distribución.", desc: "Los datos de la empresa y de los clientes nunca se comparten con terceros." },
      { title: "Transparente por diseño", desc: "Los pasos de la IA muestran las fuentes, los cambios y la justificación." },
    ],
    trialTitle: "Contáctanos",
    trialBody: "Déjanos tu información y te contactaremos pronto.",
    trialAccept: "Enviar",
    footerCopy: "© 2026 Kova",
  },
};

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openTrial = () => setTrialOpen(true);
  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));

  return (
    <div className="lp-root">
      {/* ── Navbar ── */}
      <nav
        className="lp-nav"
        style={{
          background: scrolled
            ? "linear-gradient(to bottom,rgba(245,245,240,0.94),rgba(245,245,240,0.72))"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="lp-nav-brand">
          <svg
            viewBox="0 0 100 100"
            className="lp-nav-logo"
            style={{ color: scrolled ? BLACK : "#fff" }}
          >
            <path d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
            <path d="M 50 95 L 50 50 L 11 27.5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <span
            className="lp-nav-name"
            style={{ color: scrolled ? BLACK : "#fff" }}
          >
            Kova
          </span>
        </div>
        <div className="lp-nav-actions">
          <button
            onClick={toggleLang}
            className="lp-btn-lang"
            style={{
              color: scrolled ? BLACK : "#fff",
              border: `1px solid ${scrolled ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.38)"}`,
            }}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={openTrial}
            className="lp-btn-nav"
            style={{
              color: scrolled ? BLACK : "#fff",
              border: `1px solid ${scrolled ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.42)"}`,
            }}
          >
            {t.navCta}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <video
          className="lp-hero-video"
          autoPlay
          muted
          loop
          playsInline
          src="/hero.mp4"
        />
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <div className="lp-hero-inner">
            <div className="lp-hero-text">
              <h1 className="lp-hero-title">{t.heroTitle}</h1>
              <p className="lp-hero-sub">{t.heroSub}</p>
            </div>
            <button onClick={openTrial} className="lp-btn-hero">
              {t.navCta}
            </button>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="lp-section-bone lp-problem">
        <div className="lp-prose-center">
          <p className="lp-body-text">{t.problemP1}</p>
          <p className="lp-body-text lp-mt18">{t.problemP2}</p>
          <p className="lp-body-text lp-mt18 lp-highlight">{t.problemP3}</p>
        </div>
        <div className="lp-screenshot">
          <video
            className="lp-demo-video"
            controls
            playsInline
            src="/demo.mp4"
          />
        </div>
      </section>

      {/* ── Platform ── */}
      <section className="lp-section-bone">
        <div className="lp-platform-wrap">
          <p className="lp-body-text lp-text-center">{t.platformTitle}</p>
          <p className="lp-body-text lp-text-center lp-mb52">{t.platformSub}</p>
          <div className="lp-practice-grid">
            {t.practiceAreas.map((item) => (
              <div key={item} className="lp-practice-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="lp-section-bone lp-cards-section">
        {t.cards.map((card, i) => {
          const videoMap = ["/agents.mp4", "/works.mp4", "/doers.mp4", "/scale.mp4"];
          return (
            <CardItem key={card.title} {...card} index={i} videoSrc={videoMap[i]} />
          );
        })}
      </section>

      {/* ── Manifesto ── */}
      <section className="lp-section-black lp-manifesto">
        <div className="lp-manifesto-container">
          {/* Left image - paste URL here */}
          <div className="lp-manifesto-image lp-manifesto-image-left">
            <img src="/manifesto1.png" alt="Manifesto illustration" className="lp-manifesto-img" />
          </div>

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

          {/* Right image - paste URL here */}
          <div className="lp-manifesto-image lp-manifesto-image-right">
            <img src="/manifesto2.png" alt="Manifesto illustration" className="lp-manifesto-img" />
          </div>
        </div>
      </section>

      {/* ── Security ── */}
      <section className="lp-section-bone lp-security">
        <div className="lp-security-wrap">
          <h2 className="lp-security-title">
            {lang === "en" ? (
              <>Security built for accounting <span className="lp-italic">firms</span></>
            ) : (
              <>Seguridad diseñada para despachos <span className="lp-italic">contables</span></>
            )}
          </h2>
          <p className="lp-security-sub">{t.securitySub}</p>

          {/* Certifications Grid */}
          <div className="lp-certifications-grid">
            {t.securityItems.map((item) => {
              const lastSpace = item.title.lastIndexOf(" ");
              const head = lastSpace > -1 ? item.title.slice(0, lastSpace) : item.title;
              const tail = lastSpace > -1 ? item.title.slice(lastSpace + 1) : "";
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

          {/* Security Features */}
          <div className="lp-security-features">
            {t.securityFeatures.map((feature) => {
              const lastSpace = feature.title.lastIndexOf(" ");
              const head = lastSpace > -1 ? feature.title.slice(0, lastSpace) : feature.title;
              const tail = lastSpace > -1 ? feature.title.slice(lastSpace + 1) : "";
              return (
                <div key={feature.title} className="lp-feature-item">
                  <h4 className="lp-feature-title">
                    {head}
                    {tail ? <span className="lp-italic"> {tail}</span> : null}
                  </h4>
                  <p className="lp-feature-desc">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <video
          className="lp-footer-video"
          autoPlay
          muted
          loop
          playsInline
          src="/footer.mp4"
        />
        <div className="lp-footer-overlay" />
        <div className="lp-footer-bar">
          <div className="lp-footer-brand">
            <svg viewBox="0 0 100 100" className="lp-footer-logo">
              <path d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
              <path d="M 50 95 L 50 50 L 11 27.5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <span className="lp-footer-name">Kova</span>
          </div>
          <div className="lp-footer-right">
            <button onClick={openTrial} className="lp-btn-footer">
              {t.navCta}
            </button>
            <p className="lp-footer-copy">{t.footerCopy}</p>
          </div>
        </div>
      </footer>

      {/* ── Trial modal ── */}
      <TrialModal
        isOpen={trialOpen}
        onClose={() => setTrialOpen(false)}
        lang={lang}
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        /* ── Base font ── */
        .lp-root {
          background: ${BONE};
          overflow-x: hidden;
          font-family: 'Lato', 'Lato Placeholder', sans-serif;
          font-size: 22px;
          letter-spacing: -0.5px;
          line-height: 1.55;
          color: rgb(136,136,136);
        }
        .lp-italic {
          font-family: Georgia, serif;
          font-style: italic;
        }

        /* ── Nav ── */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          transition: background 240ms ease, backdrop-filter 240ms ease;
        }
        .lp-nav-brand { display: flex; align-items: center; gap: 8px; }
        .lp-nav-logo {
          height: 26px;
          width: 26px;
          transition: color 240ms ease;
        }
        .lp-nav-name {
          font-family: 'Lato', sans-serif;
          font-size: 17px; font-weight: 700;
          letter-spacing: -0.04em;
          transition: color 240ms ease;
        }
        .lp-nav-actions { display: flex; align-items: center; gap: 8px; }
        .lp-btn-lang {
          font-family: 'Lato', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.04em;
          background: transparent;
          padding: 6px 12px;
          cursor: pointer; border-radius: 10px;
          transition: all 160ms ease;
          min-width: 40px; text-align: center;
        }
        .lp-btn-lang:hover { background: rgba(255,255,255,0.12); }
        .lp-btn-nav {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          background: transparent;
          padding: 8px 16px;
          cursor: pointer; border-radius: 14px;
          transition: all 160ms ease;
          white-space: nowrap;
        }
        .lp-btn-nav:hover { background: rgba(255,255,255,0.12); }

        /* ── Hero ── */
        .lp-hero {
          min-height: 100vh; position: relative;
          overflow: hidden; background: ${BLACK};
        }
        .lp-hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .lp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.18) 42%,rgba(0,0,0,0.78) 100%);
        }
        .lp-hero-content {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 80px 24px 48px;
        }
        .lp-hero-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .lp-hero-text { max-width: 780px; flex: 1; min-width: 0; }
        .lp-hero-title {
          font-family: Georgia, serif;
          font-style: italic;
          margin: 0;
          font-size: clamp(36px, 6.8vw, 96px);
          font-weight: 300;
          letter-spacing: -0.055em;
          line-height: 0.94;
          color: ${BONE};
        }
        .lp-hero-sub {
          margin: 18px 0 0;
          font-size: clamp(15px, 2vw, 20px);
          color: rgba(245,245,240,0.55);
          font-weight: 300;
        }
        .lp-btn-hero {
          font-family: 'Lato', sans-serif;
          font-size: clamp(16px, 2.5vw, 30px);
          background: ${BONE};
          color: ${BLACK};
          border: none;
          padding: clamp(14px, 2vw, 26px) clamp(24px, 4vw, 52px);
          cursor: pointer; font-weight: 400;
          flex-shrink: 0; align-self: flex-end;
          border-radius: 20px;
          transition: background 140ms ease;
          white-space: nowrap;
        }
        .lp-btn-hero:hover { background: #e8e8e4; }

        /* ── Sections ── */
        .lp-section-bone { background: ${BONE}; }
        .lp-section-black { background: ${BLACK}; }

        /* ── Problem ── */
        .lp-problem { padding-top: 80px; padding-bottom: 60px; }
        .lp-prose-center {
          max-width: 820px; margin: 0 auto;
          text-align: center; padding: 0 20px;
        }
        .lp-body-text { margin: 0; font-size: clamp(16px, 2vw, 22px); line-height: 1.7; }
        .lp-mt18 { margin-top: 16px; }
        .lp-mb52 { margin-bottom: 40px; }
        .lp-text-center { text-align: center; }
        .lp-screenshot {
          margin: 40px auto 0;
          width: 90vw; max-width: 1280px;
          aspect-ratio: 16/9;
          overflow: hidden;
          border-radius: 12px;
          background: ${BLACK};
        }
        .lp-demo-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── Platform ── */
        .lp-platform-wrap {
          max-width: 1200px; margin: 0 auto; padding: 60px 20px;
        }
        .lp-practice-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .lp-practice-item {
          padding: 28px 16px;
          text-align: center; font-weight: 400;
          color: ${BLACK}; font-size: clamp(16px, 1.8vw, 22px);
        }

        /* ── Cards ── */
        .lp-cards-section { padding-bottom: 40px; }

        /* ── Manifesto ── */
        .lp-manifesto { padding: 80px 0; overflow: hidden; }
        .lp-manifesto-container {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          max-width: 100%;
          margin: 0 auto;
          position: relative;
        }
        .lp-manifesto-wrap {
          max-width: 820px;
          width: 100%;
          position: relative;
          z-index: 10;
          padding: 0 40px;
        }
        .lp-manifesto-image-left,
        .lp-manifesto-image-right {
          width: 0;
          position: sticky;
          top: 50vh;
          z-index: 0;
        }
        .lp-manifesto-image-left .lp-manifesto-img {
          position: absolute;
          right: -50px;
          transform: translateY(-50%) rotate(-7deg);
          width: clamp(450px, 55vw, 950px);
          max-width: none;
          height: auto;
          pointer-events: none;
        }
        .lp-manifesto-image-right .lp-manifesto-img {
          position: absolute;
          left: -260px;
          transform: translateY(-50%);
          width: clamp(500px, 65vw, 1200px);
          max-width: none;
          height: auto;
          pointer-events: none;
        }
        .lp-manifesto-title {
          margin: 0 0 48px;
          text-align: center;
          font-size: clamp(22px, 3.6vw, 50px);
          font-weight: 300; letter-spacing: -0.04em;
          line-height: 1.15; color: ${BONE};
        }
        .lp-manifesto-p {
          margin: 0 0 24px;
          font-size: clamp(14px, 1.5vw, 19px);
          line-height: 1.85; color: rgba(136,136,136,0.72);
          text-align: left;
        }
        .lp-manifesto-p-dim { 
          color: rgba(136,136,136,0.42); 
          font-size: clamp(13px, 1.4vw, 17px); 
          text-align: left; 
        }

        /* ── Security ── */
        .lp-security { padding: 80px 20px; }
        .lp-security-wrap { max-width: 900px; margin: 0 auto; text-align: center; }
        .lp-security-title {
          margin: 0 0 20px;
          font-size: clamp(26px, 4vw, 54px);
          font-weight: 700; letter-spacing: -0.04em;
          line-height: 1.08; color: ${BLACK};
        }
        .lp-security-sub {
          margin: 0 auto 64px;
          font-size: clamp(15px, 1.6vw, 19px);
          line-height: 1.9;
          color: rgb(136,136,136);
          max-width: 580px;
        }
        .lp-certifications-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 32px;
          margin-bottom: 80px;
        }
        .lp-cert-card {
          background: transparent;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: center;
          border: 1px solid rgba(136,136,136,0.25);
          border-radius: 16px;
        }
        .lp-cert-title {
          margin: 0;
          font-size: clamp(20px, 2.8vw, 32px);
          font-weight: 700;
          color: ${BLACK};
          letter-spacing: -0.04em;
          line-height: 1.15;
        }
        .lp-cert-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(17,17,17,0.08);
          color: rgb(136,136,136);
          padding: 6px 14px;
          border-radius: 20px;
          margin: 4px auto 0;
        }
        .lp-cert-desc {
          margin: 8px 0 0;
          font-size: clamp(14px, 1.4vw, 17px);
          color: rgb(136,136,136);
          line-height: 1.6;
        }
        .lp-security-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 32px;
        }
        .lp-feature-item {
          text-align: center;
        }
        .lp-feature-title {
          margin: 0;
          font-size: clamp(20px, 2.8vw, 32px);
          font-weight: 700;
          color: ${BLACK};
          letter-spacing: -0.04em;
          line-height: 1.15;
        }
        .lp-feature-desc {
          margin: 12px 0 0;
          font-size: clamp(14px, 1.4vw, 17px);
          color: rgb(136,136,136);
          line-height: 1.6;
        }
        .lp-highlight {
          color: ${BLACK};
          font-weight: 400;
        }

        /* ── Footer ── */
        .lp-footer {
          position: relative; min-height: 100vh;
          display: block; line-height: 0;
          overflow: hidden; background: ${BLACK};
        }
        .lp-footer-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .lp-footer-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.60) 100%);
        }
        .lp-footer-bar {
          position: absolute; bottom: 24px;
          left: 20px; right: 20px; z-index: 1;
          display: flex; align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .lp-footer-brand { display: flex; align-items: center; gap: 8px; }
        .lp-footer-logo {
          height: 18px;
          width: 18px;
          color: ${BONE};
        }
        .lp-footer-name {
          font-size: 14px; font-weight: 700;
          letter-spacing: -0.04em; color: ${BONE};
        }
        .lp-footer-right {
          display: flex; align-items: center;
          gap: 12px; flex-wrap: wrap;
        }
        .lp-btn-footer {
          font-family: 'Lato', sans-serif;
          font-size: clamp(14px, 2vw, 26px);
          color: ${BONE}; background: transparent;
          border: 1px solid rgba(245,245,240,0.32);
          padding: clamp(10px, 1.2vw, 16px) clamp(16px, 2vw, 28px);
          cursor: pointer; border-radius: 18px;
          transition: all 160ms ease;
          white-space: nowrap;
        }
        .lp-btn-footer:hover { background: rgba(245,245,240,0.12); }
        .lp-footer-copy {
          margin: 0; font-size: 12px;
          color: rgba(245,245,240,0.38);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .lp-nav { padding: 12px 16px; }
          .lp-btn-nav { font-size: 12px; padding: 7px 12px; }
          .lp-btn-lang { font-size: 11px; padding: 6px 10px; min-width: 36px; }

          .lp-hero-content { padding: 72px 16px 36px; }
          .lp-hero-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .lp-btn-hero {
            align-self: stretch;
            text-align: center;
            font-size: 16px;
            padding: 16px 20px;
            border-radius: 16px;
          }

          .lp-problem { padding-top: 56px; padding-bottom: 40px; }
          .lp-platform-wrap { padding: 48px 16px; }
          .lp-practice-grid { grid-template-columns: repeat(2, 1fr); }
          .lp-practice-item { padding: 20px 12px; }

          .lp-manifesto { padding: 60px 16px; }
          .lp-manifesto-title { margin-bottom: 32px; }
          .lp-manifesto-image { display: none; }

          .lp-security { padding: 60px 16px; }
          .lp-certifications-grid { grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px; }
          .lp-security-features { grid-template-columns: 1fr; gap: 40px; }

          .lp-footer-bar {
            flex-direction: column;
            align-items: flex-start;
            bottom: 20px; left: 16px; right: 16px;
          }
          .lp-footer-right { flex-direction: column; align-items: flex-start; gap: 8px; }
          .lp-btn-footer { font-size: 14px; padding: 12px 20px; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .lp-hero-inner { flex-direction: column; align-items: flex-start; gap: 24px; }
          .lp-btn-hero { align-self: stretch; text-align: center; }
          .lp-practice-grid { grid-template-columns: repeat(2, 1fr); }
          .lp-manifesto-image { display: none; }
          .lp-certifications-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
          .lp-security-features { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; }
        }
      `}</style>
    </div>
  );
}
