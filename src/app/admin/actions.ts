"use server";
import { cookies } from "next/headers";
import { loadContent, saveContent } from "@/lib/content";
import type { Service, SiteContent } from "@/lib/content";

// Helper to access mutable cookie store in server actions (typing workaround)
function cookieStore() {
  return cookies() as unknown as {
    set: (name: string, value: string, options?: {
      httpOnly?: boolean;
      secure?: boolean;
      path?: string;
      maxAge?: number;
    }) => void;
  };
}

export async function loginAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const password = formData.get("password")?.toString() || "";
  const expected = process.env.ADMIN_PASSWORD || "barber123"; // placeholder
  if (password === expected) {
    cookieStore().set("admin", "1", { httpOnly: true, secure: false, path: "/", maxAge: 60 * 60 * 8 });
    return { ok: true };
  }
  return { ok: false, error: "Invalid password" };
}

export async function logoutAction(): Promise<void> {
  cookieStore().set("admin", "", { path: "/", maxAge: 0 });
}

export async function updateHero(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  content.hero = {
    headline: formData.get("headline")?.toString() || content.hero?.headline || "",
    subheadline: formData.get("subheadline")?.toString() || content.hero?.subheadline || "",
    ctaLabel: formData.get("ctaLabel")?.toString() || content.hero?.ctaLabel || "",
    ctaLink: formData.get("ctaLink")?.toString() || content.hero?.ctaLink || "",
    backgroundImage: content.hero?.backgroundImage || "",
  };
  const file = formData.get("background") as File | null;
  const url = formData.get("backgroundUrl")?.toString();
  if (file && file.size > 0) {
    const { saveUploadedImage } = await import("@/lib/content");
    content.hero.backgroundImage = await saveUploadedImage(file);
  } else if (url) {
    content.hero.backgroundImage = url;
  }
  await saveContent(content);
}

export async function addService(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  const service: Service = {
    title: formData.get("title")?.toString() || "Service",
    description: formData.get("description")?.toString() || "",
    price: Number(formData.get("price")) || 0,
    icon: formData.get("icon")?.toString() || "GiScissors",
  };
  content.services = [...(content.services || []), service];
  await saveContent(content);
}

export async function removeService(formData: FormData): Promise<void> {
  const index = Number(formData.get("index"));
  const content: SiteContent = await loadContent();
  content.services = (content.services || []).filter((_, i) => i !== index);
  await saveContent(content);
}

export async function addGalleryImage(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  const file = formData.get("image") as File | null;
  const url = formData.get("url")?.toString();
  let src = url || "";
  if (file && file.size > 0) {
    const { saveUploadedImage } = await import("@/lib/content");
    src = await saveUploadedImage(file);
  }
  if (src) {
    content.gallery = [...(content.gallery || []), { src, alt: formData.get("alt")?.toString() || "" }];
    await saveContent(content);
  }
}

export async function addTeamMember(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  const file = formData.get("image") as File | null;
  const url = formData.get("imageUrl")?.toString();
  let image = url || "";
  if (file && file.size > 0) {
    const { saveUploadedImage } = await import("@/lib/content");
    image = await saveUploadedImage(file);
  }
  const member = {
    name: formData.get("name")?.toString() || "",
    role: formData.get("role")?.toString() || "",
    image,
  };
  content.team = [...(content.team || []), member];
  await saveContent(content);
}

export async function addTestimonial(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  const item = { name: formData.get("name")?.toString() || "", feedback: formData.get("feedback")?.toString() || "" };
  content.testimonials = [...(content.testimonials || []), item];
  await saveContent(content);
}

export async function addFaq(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  const item = { q: formData.get("q")?.toString() || "", a: formData.get("a")?.toString() || "" };
  content.faq = [...(content.faq || []), item];
  await saveContent(content);
}

export async function updateContact(formData: FormData): Promise<void> {
  const content: SiteContent = await loadContent();
  content.contact = {
    address: formData.get("address")?.toString() || content.contact?.address || "",
    phone: formData.get("phone")?.toString() || content.contact?.phone || "",
    bookingLink: formData.get("bookingLink")?.toString() || content.contact?.bookingLink || "",
    mapsLink: formData.get("mapsLink")?.toString() || content.contact?.mapsLink || "",
  };
  await saveContent(content);
}