import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">
        {children}
      </body>
    </html>
  );
}
