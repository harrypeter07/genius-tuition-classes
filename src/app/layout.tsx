import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akram's Genius Academy | Premier Offline Coaching in Koradi, Nagpur",
  description:
    "Akram's Genius Academy in Koradi, Nagpur. Expert guidance by Akram Sir. Quality offline coaching for Class 5th to 12th in Maths, Science, English & Social Studies. Call +91 91756 91457.",
  keywords: [
    "Akram's Genius Academy",
    "Genius Tuition Classes",
    "Tuition in Koradi",
    "Akram Sir Tuition Nagpur",
    "Coaching Classes Koradi Nagpur",
    "Offline Tuition Koradi",
    "Maths Science Tuition Nagpur",
    "Class 10 SSC CBSE Coaching Koradi",
  ],
  authors: [{ name: "Akram Sir - Akram's Genius Academy" }],
  openGraph: {
    title: "Akram's Genius Academy | Guidance by Akram Sir - Koradi, Nagpur",
    description:
      "Quality education. Personal attention. Real progress. Premier offline coaching in Koradi, Nagpur for Class 5 to 12.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#070c18] text-slate-100 antialiased selection:bg-blue-600 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
