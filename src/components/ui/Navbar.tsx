"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/80 backdrop-blur-md border-b border-white/5 py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative w-40 h-10 group-hover:scale-105 transition-transform">
            <Image src="/logo 1.png" alt="Russell's Barbers" fill className="object-contain" />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#team" className="hover:text-accent transition-colors">Artisans</a>
          <a href="#testimonials" className="hover:text-accent transition-colors">Reputation</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <a href="#contact" className="btn-primary py-2 px-6 text-xs scale-90 md:scale-100">
          Book
        </a>

      </div>
    </nav>
  );
}