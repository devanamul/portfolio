import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anamul Hasan – Full-Stack Software Engineer",
  description:
    "Full-stack software engineer with 2+ years building production ERP, POS, and management systems across Laravel, Vue, React, and Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} style={{ scrollBehavior: "smooth" }}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
