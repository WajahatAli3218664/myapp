import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import ChatBot from "@/components/ui/ChatBot";

const headingFont = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slick Style — Premium Barber",
  description: "Modern, premium barber template built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased bg-stone-950 text-stone-100`} suppressHydrationWarning>

        {/* Sticky Navbar */}
        <Navbar />
        <WhatsAppFloat />
        <div className="pt-20">{children}</div>
        {/* AI Chatbot */}
        <ChatBot />
      </body>
    </html>
  );
}
