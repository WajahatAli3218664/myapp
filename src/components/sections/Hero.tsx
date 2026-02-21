"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import { FiCalendar, FiPhone } from "react-icons/fi";
import ModelViewer from "@/components/ui/ModelViewer";

export default function Hero({ content }: { content: SiteContent }) {
  const hero = content.hero ?? {};
  const bookingUrl = content.contact?.bookingLink || hero.ctaLink || "#contact";
  const phone = content.contact?.phone;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        {hero.backgroundImage ? (
          <Image
            src={hero.backgroundImage}
            alt="Premium Barber Shop"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-stone-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-transparent to-stone-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent rounded-full border border-accent/20">
            Est. 2018 • London&apos;s Finest
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight text-white text-balance">
            Your Reputation, <br />
            <span className="text-accent underline decoration-accent/30 underline-offset-8">Refined.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-stone-400 max-w-xl mx-auto lg:mx-0 text-balance leading-relaxed">
            {hero.subheadline || "Precision grooming for the modern gentleman. Experience the art of the perfect cut in an atmosphere built for focus."}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a
              href={bookingUrl}
              className="btn-primary w-full sm:w-auto text-lg group"
            >
              <FiCalendar className="w-5 h-5 group-hover:rotate-12 transition-transform icon-non-social" />
              Book Appointment
            </a>

            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="btn-secondary w-full sm:w-auto text-lg group"
              >
                <FiPhone className="w-5 h-5 icon-non-social" />
                Call Studio
              </a>
            )}
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">4.9/5</span>
              <span className="text-xs uppercase tracking-wider">Google Rating</span>
            </div>
            <div className="w-px h-8 bg-stone-700" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">15k+</span>
              <span className="text-xs uppercase tracking-wider">Cuts Delivered</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Visual Proof Element - Now visible on all screen sizes but in sidebar layout on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-stone-900/40 group"
        >
          <div className="absolute inset-0 z-0">
            <ModelViewer src="/electric+razor+3d+model.glb" />
          </div>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-10 left-10 right-10 p-6 bg-stone-950/50 backdrop-blur-md rounded-3xl border border-white/10 z-10 transition-transform group-hover:scale-105 duration-500">
            <p className="text-sm italic text-stone-200 leading-relaxed">&quot;The best fade I&apos;ve ever had. Meticulous and professional.&quot;</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">— James R.</span>
              <span className="text-[10px] text-white/30 uppercase tracking-widest hidden group-hover:block animate-pulse">Touch to rotate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}