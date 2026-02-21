"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { SiteContent, FAQItem } from "@/lib/content";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQ({ content }: { content: SiteContent }) {
  const faq = content.faq || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-stone-950 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">Intel</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
                Common <span className="text-stone-500 italic">Queries</span>
              </h3>
            </div>
            <p className="text-stone-400 text-lg leading-relaxed">
              Everything you need to know about our process, booking, and studio standards.
            </p>
            <div className="pt-8">
              <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors flex items-center gap-2">
                Still have questions? <span className="text-xl">→</span>
              </a>
            </div>
          </motion.div>

          <div className="space-y-4">
            {faq.map((item: FAQItem, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group border-b border-white/10 transition-all duration-500 ${openIndex === idx ? 'pb-8' : 'pb-4'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className={`text-xl font-bold transition-all duration-300 ${openIndex === idx ? 'text-accent' : 'text-stone-300 group-hover:text-white'}`}>
                    {item.q}
                  </span>
                  <div className={`shrink-0 ml-4 transition-transform duration-500 ${openIndex === idx ? 'rotate-180 text-accent' : 'text-stone-600'}`}>
                    {openIndex === idx ? <FaMinus size={14} /> : <FaPlus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="text-stone-400 leading-relaxed pt-2 pr-12">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}