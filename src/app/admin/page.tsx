import { loadContent } from "@/lib/content";
import { updateHero, addService, removeService, addGalleryImage, addTeamMember, addTestimonial, addFaq, updateContact, logoutAction } from "./actions";
import type { Service } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await loadContent();

  async function logout() {
    "use server";
    await logoutAction();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold gold-text">Content Dashboard</h1>
        <form action={logout}><button className="text-sm text-stone-400 underline">Logout</button></form>
      </div>
      <p className="mt-2 text-stone-400">Updates save instantly to the JSON and reflect on the site.</p>

      {/* Hero Editor */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Hero</h2>
        <form action={updateHero} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">Headline<input name="headline" defaultValue={content.hero?.headline} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">Subheadline<input name="subheadline" defaultValue={content.hero?.subheadline} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">CTA Label<input name="ctaLabel" defaultValue={content.hero?.ctaLabel} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">CTA Link<input name="ctaLink" defaultValue={content.hero?.ctaLink} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Background Image URL<input name="backgroundUrl" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" placeholder="https://..." /></label>
          <label className="block text-sm sm:col-span-2">Or Upload Background<input type="file" name="background" className="mt-1 w-full" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Save Hero</button>
        </form>
      </section>

      {/* Services Manager */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Services</h2>
        <div className="mt-4 grid gap-3">
          {(content.services || []).map((s: Service, i: number) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-stone-800 p-3">
              <div>
                <div className="font-semibold">{s.title} — ${s.price}</div>
                <div className="text-sm text-stone-400">{s.description}</div>
              </div>
              <form action={removeService}><input type="hidden" name="index" value={i} /><button className="text-sm text-red-400">Remove</button></form>
            </div>
          ))}
        </div>
        <form action={addService} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">Title<input name="title" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">Price<input name="price" type="number" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Description<input name="description" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Icon (e.g., GiScissors)<input name="icon" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" defaultValue="GiScissors" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Add Service</button>
        </form>
      </section>

      {/* Gallery Manager */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Gallery</h2>
        <form action={addGalleryImage} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">Image URL<input name="url" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" placeholder="https://..." /></label>
          <label className="block text-sm sm:col-span-2">Or Upload File<input type="file" name="image" className="mt-1 w-full" /></label>
          <label className="block text-sm sm:col-span-2">Alt text<input name="alt" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Add Image</button>
        </form>
      </section>

      {/* Team Manager */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Team</h2>
        <form action={addTeamMember} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">Name<input name="name" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">Role<input name="role" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Image URL<input name="imageUrl" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Or Upload Image<input type="file" name="image" className="mt-1 w-full" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Add Barber</button>
        </form>
      </section>

      {/* Testimonials */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Testimonials</h2>
        <form action={addTestimonial} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">Name<input name="name" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Feedback<input name="feedback" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Add Testimonial</button>
        </form>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">FAQ</h2>
        <form action={addFaq} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">Question<input name="q" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Answer<input name="a" className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Add FAQ</button>
        </form>
      </section>

      {/* Contact */}
      <section className="mt-8 rounded-xl border gold-border bg-charcoal-2 p-6 shadow-soft">
        <h2 className="font-heading text-xl font-semibold gold-text">Contact Details</h2>
        <form action={updateContact} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">Address<input name="address" defaultValue={content.contact?.address} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">Phone<input name="phone" defaultValue={content.contact?.phone} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm">Booking Link<input name="bookingLink" defaultValue={content.contact?.bookingLink} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <label className="block text-sm sm:col-span-2">Maps Link<input name="mapsLink" defaultValue={content.contact?.mapsLink} className="mt-1 w-full rounded-md border border-stone-700 bg-black/50 p-2" /></label>
          <button className="sm:col-span-2 accent-gradient text-black rounded-md px-4 py-2 font-semibold">Save Contact</button>
        </form>
      </section>
    </main>
  );
}