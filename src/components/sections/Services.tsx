"use client";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { GiBeard, GiScissors, GiHairStrands } from "react-icons/gi";
import type { Service } from "@/lib/content";

const iconMap: Record<string, IconType> = {
  GiBeard,
  GiScissors,
  GiHairStrands,
};

export default function Services({ content }: { content: { services?: Service[] } }) {
  const services: Service[] = content.services || [];

  return (
    <section id="services" className="py-24 bg-stone-950 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">The Menu</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-white">
              Precision Services <br /><span className="text-stone-500">Tailored to You</span>
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-stone-400 text-lg leading-relaxed text-center md:text-left"
          >
            We don&apos;t just cut hair. We refine your image with a clinical attention to detail and a commitment to consistency.
          </motion.p>

        </div>

        <div className="grid gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {services.map((s: Service, i: number) => {
            const Icon = iconMap[s.icon as string] || GiScissors;
            return (
              <motion.div
                key={`${s.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-stone-900/50 p-10 hover:bg-stone-800/80 transition-all duration-500"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-stone-900 transition-all duration-500 text-accent icon-non-social">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 text-center">{s.title}</h4>
                  <p className="text-stone-400 leading-relaxed mb-8 min-h-[4.5rem] text-center">
                    {s.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mt-auto">
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-500">Investment</span>
                    <span className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                      From £{s.price}
                    </span>
                  </div>
                </div>
                {/* Hover line effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-stone-500 text-sm mb-6 italic">All services include a complimentary consultation and premium styling products.</p>
          <a href="#contact" className="text-white font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
            View Full Treatment Menu
          </a>
        </div>
      </div>
    </section>
  );
}