"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteContent, TeamMember } from "@/lib/content";

export default function Team({ content }: { content: SiteContent }) {
  const team = content.team || [];

  return (
    <section id="team" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">The Artisans</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-white">
              Masters of <br /><span className="text-stone-500">The Craft</span>
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-stone-400 text-lg leading-relaxed text-center md:text-left"
          >
            Our team is comprised of elite barbers who view grooming as an art form. Each cut is a signature.
          </motion.p>
        </div>

        <div className="grid gap-12">
          {team.map((member: TeamMember, idx: number) => {
            const src = member.image || "/next.svg";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col items-center md:flex-row gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Portrait Container */}
                <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/5 ring-1 ring-white/10">
                  <Image
                    src={src}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Container */}
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                  <div className="text-center md:text-left">
                    <span className="text-accent font-bold tracking-widest uppercase text-xs mb-2 block">{member.role}</span>
                    <h4 className="text-4xl md:text-5xl font-bold text-white font-heading">{member.name}</h4>
                  </div>

                  <div className="h-px w-20 bg-accent mx-auto md:mx-0" />

                  <p className="text-stone-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                    {member.bio || "Bringing years of dedicated craft and precision to every client. Specialist in modern fades and classical grooming."}
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-6 grayscale opacity-50">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Fade Specialist</span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Beard Architect</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}