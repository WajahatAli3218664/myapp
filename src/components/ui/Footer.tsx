"use client";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import type { SiteContent } from "@/lib/content";

export default function Footer({ content }: { content: SiteContent }) {
    const { contact, brand } = content;

    return (
        <footer className="bg-stone-950 border-t border-white/5 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold font-heading text-white tracking-widest uppercase">
                            {brand?.name || "Slick Style"}
                        </h2>
                        <p className="text-stone-400 leading-relaxed max-w-xs">
                            Exceptional grooming for the modern gentleman. We combine classic techniques with modern style.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-stone-500 hover:text-accent transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-stone-500 hover:text-accent transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-stone-500 hover:text-accent transition-colors"><FaTwitter size={20} /></a>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Visit Us</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <FaMapMarkerAlt className="text-accent mt-1 shrink-0" />
                                <address className="text-stone-300 not-italic leading-relaxed">
                                    {contact?.address || "123 Barber Street, London, UK"}
                                </address>
                            </div>
                            <div className="flex gap-4">
                                <FaPhone className="text-accent shrink-0" />
                                <a href={`tel:${contact?.phone}`} className="text-stone-300 hover:text-white transition-colors">
                                    {contact?.phone || "+44 123 456 789"}
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <FaEnvelope className="text-accent shrink-0" />
                                <a href={`mailto:${contact?.email}`} className="text-stone-300 hover:text-white transition-colors">
                                    {contact?.email || "hello@slickstyle.com"}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Hours</h3>
                        <ul className="space-y-4 text-stone-300">
                            <li className="flex justify-between">
                                <span>Mon — Thu</span>
                                <span className="text-stone-500">10am — 7pm</span>
                            </li>
                            <li className="flex justify-between font-bold text-white">
                                <span>Friday</span>
                                <span className="text-accent">9am — 8pm</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span className="text-stone-500">9am — 6pm</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-stone-400">Closed</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Navigation</h3>
                        <ul className="space-y-4">
                            <li><a href="#services" className="text-stone-400 hover:text-white transition-colors">Services</a></li>
                            <li><a href="#gallery" className="text-stone-400 hover:text-white transition-colors">Portfolio</a></li>
                            <li><a href="#team" className="text-stone-400 hover:text-white transition-colors">Our Team</a></li>
                            <li><a href="#faq" className="text-stone-400 hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-stone-500 text-sm">
                        © {new Date().getFullYear()} {brand?.name}. All Professional Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-stone-500">
                        <a href="#" className="hover:text-stone-300">Privacy Policy</a>
                        <a href="#" className="hover:text-stone-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
