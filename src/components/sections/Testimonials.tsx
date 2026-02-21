"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function Testimonials({ content }: { content: SiteContent }) {
  useEffect(() => {
    // Load Shapo embed script
    const script = document.createElement("script");
    script.id = "shapo-embed-js";
    script.src = "https://cdn.shapo.io/js/embed.js";
    script.defer = true;
    document.body.appendChild(script);

    // Wait for widget to load and then apply styles
    const interval = setInterval(() => {
      const widgetElement = document.getElementById("shapo-widget-f9aa605719165ec0fd9e");
      if (widgetElement) {
        // Apply styles directly to the widget container
        widgetElement.style.color = 'white';
        widgetElement.style.backgroundColor = 'transparent';

        // Try to access shadow DOM or iframe if present
        const applyStylesToWidget = () => {
          // Target the specific class pattern mentioned
          const elementsWithTextClass = widgetElement.querySelectorAll('.text-gray-700');
          elementsWithTextClass.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.setProperty('color', 'white', 'important');
            }
          });

          // Also apply general styling to all elements
          const allElements = widgetElement.querySelectorAll('*');
          allElements.forEach(el => {
            if (el instanceof HTMLElement) {
              if (window.getComputedStyle(el).color !== 'rgb(255, 255, 255)') {
                el.style.setProperty('color', 'white', 'important');
              }
              if (window.getComputedStyle(el).backgroundColor !== 'transparent') {
                el.style.setProperty('background', 'transparent', 'important');
              }
            }
          });
        };

        // Apply styles immediately and then periodically
        applyStylesToWidget();
        const widgetInterval = setInterval(applyStylesToWidget, 500); // Reapply every 500ms

        // Clear interval after 10 seconds to prevent memory leak
        setTimeout(() => clearInterval(widgetInterval), 10000);
      }
    }, 1000); // Check every second for widget

    // Clear main interval after 15 seconds to prevent memory leak
    setTimeout(() => clearInterval(interval), 15000);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById("shapo-embed-js");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      // Clear intervals if component unmounts early
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading text-stone-900 mb-4"
          >
            The Reputation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-stone-600 text-lg"
          >
            Live testimonials from our verified Google Business Profile.
          </motion.p>
        </div>

        {/* Shapo Widget Container - Enhanced styling for dark text visibility */}
        <div className="min-h-[400px] text-stone-900">
          <div
            id="shapo-widget-f9aa605719165ec0fd9e"
            className="text-stone-900"
            style={{ color: '#1c1917 !important', backgroundColor: 'transparent !important' }}
          ></div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-stone-900">Google Verified</span>
          <div className="w-1 h-1 bg-stone-400 rounded-full" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-stone-900">Top Rated 2024</span>
          <div className="w-1 h-1 bg-stone-400 rounded-full" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-stone-900">shapo.io</span>
        </div>
      </div>
    </section>
  );
}