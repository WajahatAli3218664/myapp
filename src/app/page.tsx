import { loadContent } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Features from "@/components/sections/Features";
import Interior from "@/components/sections/Interior";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/ui/Footer";
import StickyCTA from "@/components/ui/StickyCTA";


export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await loadContent();
  return (
    <main className="font-body relative">
      <Hero content={content} />
      <Services content={content} />
      <Team content={content} />
      <Features content={content} />
      <Interior content={content} />
      <Testimonials content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />

      {/* Conversion Layer */}
      <StickyCTA bookingLink={content.contact?.bookingLink || content.hero?.ctaLink || "#"} />
    </main>

  );
}
