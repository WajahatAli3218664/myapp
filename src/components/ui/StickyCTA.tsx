"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

export default function StickyCTA({ bookingLink }: { bookingLink: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 400px
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-50 md:hidden"
                >
                    <a
                        href={bookingLink}
                        className="btn-primary w-full shadow-2xl shadow-accent/20 py-5 text-lg"
                    >
                        <FiCalendar className="w-6 h-6" />
                        Book Now
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
