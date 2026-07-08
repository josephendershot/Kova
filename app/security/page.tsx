import Link from "next/link";
import { en } from "@/lib/i18n/en";
import { SectionStep } from "@/components/ui/section-step";
import { splitItalicTitle } from "@/components/ui/italic-headline";
import "@/app/landing.css";

export const metadata = {
  title: "Security — Accura",
  description: "Enterprise-grade security for Mexican accounting firms.",
};

export default function SecurityPage() {
  const t = en;

  return (
    <div className="sec-root">
      <nav className="sec-nav">
        <Link href="/" className="sec-back">← Accura</Link>
      </nav>
      <main className="sec-main">
        <h1>Security</h1>
        <p className="sec-lead">
          Your clients&apos; data deserves enterprise-grade protection. We&apos;re building
          multiple layers of industry-standard security for Mexican accounting firms.
        </p>

        <div className="sec-grid">
          {t.securityItems.map((item) => {
            const { head, tail } = splitItalicTitle(item.title);
            return (
              <div key={item.title} className="sec-card">
                <h3>
                  {head}
                  {tail ? <span className="lp-italic"> {tail}</span> : null}
                </h3>
                <span className="sec-badge">{item.status}</span>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="sec-features">
          {t.securityFeatures.map((feature) => (
            <SectionStep key={feature.title} title={feature.title} body={feature.body} />
          ))}
        </div>
      </main>
    </div>
  );
}
