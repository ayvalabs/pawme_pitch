import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PawMe — Seed Funding Deck 2026",
  description: "PawMe is the smart AI robot companion for pets. Monitors health, reduces anxiety, cuts vet costs.",
  openGraph: {
    title: "PawMe — Seed Funding Deck 2026",
    description: "Your Pet's Smart AI Robot Companion. Seeking $750K Seed.",
    siteName: "PawMe Pitch",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full overflow-hidden bg-[#0a0a14]">{children}</body>
    </html>
  );
}
