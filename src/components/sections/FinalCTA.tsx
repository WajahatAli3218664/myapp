"use client";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

export default function FinalCTA({ content }: { content: SiteContent }) {
  const contact = content.contact;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-stone-900 border border-white/5 p-12 md:p-20 text-center"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-accent/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
              Don&apos;t Leave Your Style <br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">To Chance.</span>
            </h2>

            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Our slots fill up fast, especially for weekends. Secure your transformation now and walk with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={contact?.bookingLink || "#"}
                className="btn-primary w-full sm:w-auto text-xl px-12 py-5 group"
              >
                Secure Your Slot
                <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>

              {contact?.mapsLink && (
                <a
                  href={contact?.mapsLink}
                  className="btn-secondary w-full sm:w-auto text-lg px-10 py-5"
                >
                  <FiMapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </a>
              )}
            </div>

            <div className="mt-16 pt-16 border-t border-white/5 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">Location</p>
                <p className="text-white text-lg font-medium">{contact?.address || "Visit our studio"}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">Inquiries</p>
                <p className="text-white text-xl font-bold">{contact?.phone || "Contact us"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}