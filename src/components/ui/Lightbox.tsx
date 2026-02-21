"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Lightbox({ images }: { images: { src: string; alt?: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {images.map((img, i) => (
          <button key={i} className="relative h-40 overflow-hidden rounded-md bg-charcoal-2" onClick={() => setActive(i)}>
            <Image src={img.src} alt={img.alt || "style"} fill className="object-cover hover:scale-105 transition" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setActive(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-[90vw] max-w-2xl h-[70vh]">
              <Image src={images[active!].src} alt={images[active!].alt || "preview"} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}