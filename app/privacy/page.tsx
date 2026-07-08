import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Accura",
  description: "Privacy policy for Accura accounting intelligence platform.",
};

export default function PrivacyPage() {
  return (
    <div className="privacy-root">
      <nav className="privacy-nav">
        <Link href="/" className="privacy-back">← Accura</Link>
      </nav>
      <main className="privacy-main">
        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last updated: March 2026</p>

        <p>
          Accura (&quot;we&quot;, &quot;our&quot;) respects your privacy. This policy describes how we collect,
          use, and protect personal information when you visit our website or join our waitlist.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you contact us or join the waitlist, we may collect your name, work email, company name,
          company size, phone number, intended use case, ERP system, and how you heard about us.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use the information you provide to respond to your inquiry, communicate about our services,
          and improve our offering. We do not sell or share personal information with third parties for
          marketing purposes.
        </p>

        <h2>Data protection (LFPDPPP)</h2>
        <p>
          For users in Mexico, we process personal data in accordance with the Ley Federal de Protección
          de Datos Personales en Posesión de los Particulares (LFPDPPP). You may request access,
          correction, or deletion of your data by contacting us.
        </p>

        <h2>Security</h2>
        <p>
          We apply industry-standard security measures including encryption in transit and at rest,
          strict tenant isolation, and Mexico-based hosting for customer data.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related requests, contact us through the form on our{" "}
          <Link href="/">homepage</Link>.
        </p>
      </main>

      <style>{`
        .privacy-root {
          min-height: 100vh;
          background: #ffffff;
          color: #111;
          font-family: 'Lato', sans-serif;
          line-height: 1.7;
        }
        .privacy-nav {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(17,17,17,0.08);
        }
        .privacy-back {
          color: #111;
          text-decoration: none;
          font-size: 15px;
        }
        .privacy-back:hover { opacity: 0.6; }
        .privacy-main {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .privacy-main h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin: 0 0 8px;
        }
        .privacy-updated {
          color: rgb(136,136,136);
          font-size: 14px;
          margin: 0 0 32px;
        }
        .privacy-main h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 32px 0 12px;
          letter-spacing: -0.02em;
        }
        .privacy-main p {
          margin: 0 0 16px;
          color: rgb(68,68,68);
          font-size: 16px;
        }
        .privacy-main a {
          color: #111;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
