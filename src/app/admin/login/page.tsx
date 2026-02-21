import { loginAction } from "../actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function action(formData: FormData) {
    "use server";
    const res = await loginAction(formData);
    if (res.ok) redirect("/admin");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-heading text-3xl font-bold gold-text">Admin Login</h1>
      <p className="mt-2 text-stone-400">Enter the admin password to manage content.</p>
      <form action={action} className="mt-6 space-y-4 rounded-lg border gold-border bg-charcoal-2 p-6 shadow-soft">
        <label className="block text-sm">
          Password
          <input name="password" type="password" className="mt-2 w-full rounded-md border border-stone-700 bg-black/50 p-2 outline-none" placeholder="barber123" />
        </label>
        <button className="accent-gradient text-black rounded-md px-4 py-2 font-semibold" type="submit">Login</button>
      </form>
    </main>
  );
}