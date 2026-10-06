import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact",
  description: "Get in touch with A&M Productions on WhatsApp for orders, questions and support.",
};

const WHATSAPP = `https://wa.me/916299043460?text=${encodeURIComponent(
  "Hello A&M Productions, I have a question about your services."
)}`;

const TOPICS = [
  { t: "Before you order", d: "Questions about packages, timelines or what fits your channel." },
  { t: "After you pay", d: "Send your brief and order ID so we can start your project." },
  { t: "Revisions and support", d: "Changes to a delivered edit, or a problem with a download link." },
  { t: "Refunds and payments", d: "Failed or duplicate payments, cancellations and refund requests." },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative overflow-hidden px-6 pb-24 pt-32 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(229,9,20,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">CONTACT</p>
          <h1 className="mt-2 text-5xl md:text-7xl">Let&apos;s talk</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-300">
            The fastest way to reach us is WhatsApp. Message us for anything below and we will reply there.
          </p>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#e50914] px-8 py-4 text-lg font-bold shadow-[0_0_30px_rgba(229,9,20,0.5)] transition hover:bg-[#b20710]"
          >
            <FaWhatsapp size={26} /> Chat on WhatsApp
          </a>
          <p className="mt-3 text-sm text-gray-500">+91 62990 43460</p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {TOPICS.map((x) => (
              <div key={x.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-2xl">{x.t}</h2>
                <p className="mt-2 text-sm text-gray-400">{x.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Also see our{" "}
            <Link href="/refund-policy" className="text-[#e50914] underline">
              Refund &amp; Cancellation
            </Link>
            ,{" "}
            <Link href="/delivery-policy" className="text-[#e50914] underline">
              Delivery
            </Link>
            ,{" "}
            <Link href="/terms" className="text-[#e50914] underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#e50914] underline">
              Privacy
            </Link>{" "}
            pages.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
