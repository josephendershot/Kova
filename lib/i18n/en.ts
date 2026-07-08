import type { Translations } from "./types";

export const en: Translations = {
  navPlatform: "Platform",
  navWorkspace: "Workspace",
  navSecurity: "Security",
  navManifesto: "Manifesto",
  navCta: "Get in touch →",
  heroTitle: "Augmented Accounting Intelligence",
  heroSub:
    "Lead your firm confidently into the AI era. Every workflow, engagement and document in an adaptive environment.",
  heroCtaSecondary: "Learn more",
  problemP1:
    "Accounting firms still operate on portals, phone calls, CRMs/ERPs and Excel spreadsheets. Your firm deserves full autonomy — not more manual work.",
  problemP2:
    "Mexican accountants spend 70% of their time on repetitive tasks that don't require their professional judgment.",
  problemP3:
    "We're not a software vendor. We build and deploy secure, industrial-grade AI agents designed specifically for your accounting firm.",
  demoEyebrow: "See Accura in action",
  demoSub: "One example of an accounting workflow for Mexican firms.",
  platformTitle: "One platform for your entire firm.",
  platformSub: "Core modules designed for every practice area.",
  practiceAreas: ["CAS", "Tax", "Audit", "Advisory"],
  cards: [
    {
      title: "Agents that do the work.",
      body: "Accura operates in the background, executing accounting workflows from start to finish and updating you at key moments. The result is delivered ready for review, with the quality you'd expect from an experienced accountant.",
    },
    {
      title: "Works the way you do.",
      body: "Accura adapts to your firm's standards, your practice and each engagement. It's built on solid accounting principles and adjusts to how your team actually works, delivering accurate results that meet what your clients expect.",
    },
    {
      title: "Doers become reviewers.",
      body: "When Accura handles execution, your accountants shift from doing the work to reviewing it — managing agents, applying judgment and advising clients. Better output, fewer review cycles and a team focused on what truly matters.",
    },
    {
      title: "Scale your revenue capacity.",
      body: "Firms are at capacity: more client demand, compressed margins and scarce experienced resources. Accura gives your team the capacity to serve more clients and take on more complex engagements.",
    },
  ],
  workspaceEyebrow: "The complete accounting workspace",
  workspaceTitle: "Eliminate fragmented processes once and for all.",
  workspaceSub:
    "Accura adapts to your workflows, integrating seamlessly with your established tools to preserve context and end tedious reconciliations.",
  workflowSteps: [
    { key: "Plan", title: "Plan", body: "Manage engagements across clients, organize issue lists, assign staff, and stay ahead of SAT due dates so teams begin with clarity and direction." },
    { key: "Ingest", title: "Ingest", body: "Extract CFDIs, collect supporting documents, and route everything through a secure client portal for clean intake — from XML to bank statements." },
    { key: "Process", title: "Process", body: "Sanitize files, map accounts to your chart, categorize transactions, and surface data exceptions that need attention before they become problems." },
    { key: "Analyze", title: "Analyze", body: "Ask questions about any client, search their records, trace every answer to its CFDI source, and access reliable information instantly." },
    { key: "Review", title: "Review", body: "Check SAT compliance, confirm accuracy, resolve open items, log approvals, and maintain a complete audit trail for every engagement." },
    { key: "Report", title: "Report", body: "Prepare returns, assemble supporting schedules, verify form consistency, and deliver complete packages to clients and regulators." },
  ],
  visibilityEyebrow: "Full control, total visibility",
  visibilitySub: "Get complete transparency into how your workflows operate, keeping you firmly in control.",
  visibilitySteps: [
    { title: "Generate", body: "Automatically draft complete returns in minutes, with every field traced to its source CFDI or document for full auditability." },
    { title: "Review", body: "See exactly how each value was derived, navigate source citations, assign follow-ups and sign off with confidence. No guesswork required." },
    { title: "Iterate", body: "Turn review notes into instant fixes. Our agent reclassifies entries, adds schedules and previews each change before it goes in." },
  ],
  growthEyebrow: "Client portal & firm growth",
  growthSub: "From client intake to year-over-year insight — deepen relationships and scale your practice.",
  growthSteps: [
    { title: "Request", body: "Generate dynamic client binders that adapt to each client's prior year data, requesting only what's needed for this year's return." },
    { title: "Respond", body: "Guide clients through exactly what you need with a modern portal that brings documents, answers and updates straight into the return." },
    { title: "Process", body: "Clients can email your firm's Accura address and we handle the rest. We extract the information, identify SAT notices and place each document exactly where it belongs." },
    { title: "Roll Forward", body: "Connect directly with your ERP or tax engine to import prior-year data or export finalized returns, keeping your systems and the Accura workspace aligned." },
    { title: "Compare", body: "Generate year-over-year return comparisons with explanations for every change, helping reviewers deliver deeper client insight." },
    { title: "Share", body: "Export an audit-ready PDF containing client documents, binder responses, review notes and sign-offs, ready to store or send." },
  ],
  manifestoP1:
    "The SAT issues and receives millions of CFDIs every day. Each invoice carries a world of structured information: items, taxes, withholdings, complements, addendas. All of it already exists in XML — readable, precise, ready to use.",
  manifestoP2:
    "And yet, accounting practice remains largely manual. Not because accountants aren't capable — but because the tools never rose to the level of Latin America's most complex tax regime.",
  manifestoP3:
    "We are a team of accountants and engineers who lived that gap firsthand. Accura was born from that: from the conviction that if the information already exists in structured format, re-entering it by hand is a solved problem — just solved badly.",
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
    { title: "No model training", body: "Your data never trains or improves any AI model" },
    { title: "Full data isolation", body: "Strict tenant separation across every customer" },
    { title: "Traceable AI", body: "Every agent action is logged and auditable" },
    { title: "Encrypted at rest", body: "AES-256 encryption across all stored data" },
    { title: "Encrypted in transit", body: "HTTPS/TLS on every connection" },
    { title: "Mexico-based hosting", body: "All customer data stored in Mexico" },
    { title: "Your data, your control", body: "Export or delete your data at any time. No lock-in, no questions." },
    { title: "No selling or sharing", body: "Firm and client data is never shared with third parties." },
    { title: "Transparent by design", body: "AI steps show sources, changes, and rationale." },
  ],
  footerPrivacy: "Privacy Policy",
  footerSecurity: "Security",
  footerCopy: "© 2026 Accura",
};
