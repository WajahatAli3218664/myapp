"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const href = "https://wa.me/4407476494734";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-soft hover:bg-green-600 transition"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
}