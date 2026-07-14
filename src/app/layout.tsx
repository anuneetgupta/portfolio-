import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anuneet Gupta | AI/ML Engineer & Computer Vision Specialist",
  description:
    "Portfolio of Anuneet Gupta — AI/ML Engineer specializing in Computer Vision, NLP, and LLM-powered applications. Ideathon Winner 2026. Builder of Samarpan & Dharma Setu.",
  keywords: [
    "Anuneet Gupta",
    "AI Engineer",
    "ML Engineer",
    "Computer Vision",
    "NLP",
    "LLM",
    "Machine Learning",
    "Portfolio",
    "Samarpan",
    "Dharma Setu",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Anuneet Gupta", url: "https://github.com/anuneetgupta" }],
  creator: "Anuneet Gupta",
  openGraph: {
    title: "Anuneet Gupta | AI/ML Engineer",
    description:
      "Building production-ready AI products. Computer Vision, NLP & LLM specialist. Ideathon Winner 2026.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuneet Gupta | AI/ML Engineer",
    description:
      "Building production-ready AI products. Computer Vision, NLP & LLM specialist.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* All fonts loaded via CDN to avoid build-time fetch failures */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..900&family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
