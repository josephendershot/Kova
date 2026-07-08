import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accura.mx";

export const metadata: Metadata = {
  title: "Accura — Augmented Accounting Intelligence",
  description:
    "Lead your firm confidently into the AI era. The complete accounting workspace for Mexican firms.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Accura — Augmented Accounting Intelligence",
    description:
      "Lead your firm confidently into the AI era. The complete accounting workspace for Mexican firms.",
    url: siteUrl,
    siteName: "Accura",
    locale: "en_US",
    type: "website",
    images: [{ url: "/portada.jpg", width: 1280, height: 720, alt: "Accura" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accura — Augmented Accounting Intelligence",
    description:
      "The complete accounting workspace for Mexican firms.",
    images: ["/portada.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
