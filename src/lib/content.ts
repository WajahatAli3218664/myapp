import { promises as fs } from "fs";
import path from "path";

export type Service = {
  title: string;
  description: string;
  price: number;
  icon: string;
};

export type GalleryItem = { src: string; alt?: string };
export type TeamMember = { name: string; role: string; image: string; bio?: string };
export type Testimonial = { name: string; feedback: string };
export type FAQItem = { q: string; a: string };
export type Contact = { address?: string; phone?: string; email?: string; bookingLink?: string; mapsLink?: string };
export type Feature = { title: string; text: string };
export type Interior = { title?: string; description?: string; image?: string };

export interface SiteContent {
  brand: { logo: string; name: string };
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaLink: string;
    backgroundImage: string;
  };
  features?: Feature[];
  interior?: Interior;
  services?: Service[];
  gallery?: GalleryItem[];
  team?: TeamMember[];
  testimonials?: Testimonial[];
  faq?: FAQItem[];
  contact?: Contact;
}

export const DATA_PATH = path.join(process.cwd(), "data", "site.json");

export const defaultContent: SiteContent = {
  brand: { logo: "/next.svg", name: "Slick Style Barbers" },
  hero: {
    headline: "Premium Grooming for Modern Gentlemen",
    subheadline: "Sharp cuts. Clean fades. Refined beard work.",
    ctaLabel: "Book Now",
    ctaLink: "https://bookings.gettimely.com/russellsbarbers/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F92767%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue",
    backgroundImage: "/window.svg",
  },
  contact: {
    bookingLink:
      "https://bookings.gettimely.com/russellsbarbers/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F92767%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue",
  },
  team: [
    {
      name: "Sergio Taralunga",
      role: "Barber",
      image: "/Sergio Taralunga.jpg",
      bio:
        "Meet Barber Sergio—a master of his craft with over 8 years of experience in the art of barbering. Known for his meticulous attention to detail, Sergio isn't just a barber; he's a perfectionist at heart. His priority is ensuring you not only look but also feel your absolute best after every visit. Trust Sergio to elevate your grooming experience to the next level.",
    },
    {
      name: "Kyri Mouis",
      role: "Barber",
      image: "/Kyri Mouis.jpg",
      bio:
        "Meet Kyri — With over 18 years of experience, Kyri is a passionate hairstylist at Russell's Barbers, dedicated to helping every client look and feel their best. Walk out of Russells Barbers with a transformed look and an undeniable boost in self-assurance, thanks to Kyri's creativity and expertise. Trust Kyri for a truly empowering haircut experience at Russell's Barbers.",
    },
  ],
};

export async function loadContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function saveContent(update: SiteContent): Promise<void> {
  const content = JSON.stringify(update, null, 2);
  await fs.writeFile(DATA_PATH, content, "utf8");
}

export async function saveUploadedImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, "-")}`;
  const localPath = path.join(uploadsDir, safeName);
  await fs.writeFile(localPath, buffer);
  return `/uploads/${safeName}`;
}