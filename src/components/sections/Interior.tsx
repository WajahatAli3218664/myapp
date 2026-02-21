"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import ModelViewer from "@/components/ui/ModelViewer";

export default function Interior({ content }: { content: SiteContent }) {
  const interior = content.interior ?? {};

  return (
    <section id="interior" className="py-24 bg-stone-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 ring-1 ring-white/10 group bg-stone-900/40"
          >
            <div className="absolute inset-0 z-0">
              <ModelViewer src="/barber+scissors+3d+model.glb" />
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/40 to-transparent" />

            <div className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-white/40 uppercase tracking-widest animate-pulse">Interact in 3D</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">The Environment</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                {interior.title || "Atmosphere Designed For Focus"}
              </h3>
            </div>

            <p className="text-stone-400 text-lg leading-relaxed">
              {interior.description || "Step into a space where time slows down. Our studio is built for the modern gentleman who values precision, comfort, and a moment of sharp isolation from the noise."}
            </p>

            <ul className="space-y-4">
              {['Premium Whiskey & Coffee Bar', 'Vintage Takara Belmont Chairs', 'Curation of Soul & Jazz', 'Clinical Sanitization Standards'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-stone-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="font-medium tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}