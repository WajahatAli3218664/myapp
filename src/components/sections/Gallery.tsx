"use client";
import { motion } from "framer-motion";
import Lightbox from "@/components/ui/Lightbox";

type GalleryItem = { src: string; alt?: string };

export default function Gallery({ content }: { content: { gallery?: GalleryItem[] } }) {
  // Use barber shop images from public folder as fallback if content.gallery is empty
  const images: GalleryItem[] = content.gallery && content.gallery.length > 0
    ? content.gallery
    : [
        { src: "/barbershop1.jpg", alt: "Barber shop interior" },
        { src: "/russells.jpg", alt: "Barber chair setup" },
        { src: "/Kyri Mouis.jpg", alt: "Professional barber at work" },
        { src: "/Sergio Taralunga.jpg", alt: "Barber cutting hair" },
      ];

  return (
    <section id="gallery" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-white">
              Signature <span className="text-stone-500">Cuts</span>
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-stone-400 text-lg"
          >
            A curated selection of our finest work. Each cut is a testament to precision, style, and craftsmanship.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] overflow-hidden border border-white/5"
        >
          <Lightbox images={images} />
        </motion.div>
      </div>
    </section>
  );
}