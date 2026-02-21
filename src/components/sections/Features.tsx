"use client";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { GiScissors, GiBeard, GiHairStrands } from "react-icons/gi";
import type { SiteContent, Feature } from "@/lib/content";

const featuresPreset: Array<{ title: string; text: string; icon: IconType }> = [
  { title: "Master Craftsmanship", text: "Decades of combined experience in high-end precision barbering.", icon: GiScissors },
  { title: "Premium Toolkit", text: "We use only the finest shears and clinical-grade grooming products.", icon: GiBeard },
  { title: "The Ritual", text: "Every treatment starts with a consultation and ends with a styling ritual.", icon: GiHairStrands },
  { title: "Elite Privacy", text: "Our seating is spaced for focus and privacy during your transformation.", icon: GiScissors },
];

export default function Features({ content }: { content: SiteContent }) {
  const features: Feature[] = content.features?.length
    ? content.features
    : featuresPreset.map(({ title, text }) => ({ title, text }));

  return (
    <section className="py-24 bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f: Feature, i: number) => {
            const Icon = featuresPreset[i]?.icon || GiScissors;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-stone-900 transition-all duration-500 shadow-xl icon-non-social">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-3">{f.title}</h3>
                <p className="text-stone-400 leading-relaxed">
                  {f.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
