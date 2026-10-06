"use client";
import { motion } from "framer-motion";
import { CreditCard, MessageCircle, PackageCheck, ShoppingBag } from "lucide-react";

const STEPS = [
  {
    icon: ShoppingBag,
    title: "Pick your plan",
    text: "Choose a package or a single service from the shop. Prices in USD or INR.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    text: "Checkout with Cashfree. You get an instant confirmation on screen.",
  },
  {
    icon: MessageCircle,
    title: "Send your brief",
    text: "Share your channel, topic and references on WhatsApp. One message is enough to start.",
  },
  {
    icon: PackageCheck,
    title: "Get your edit",
    text: "We deliver your unique, tailored video and thumbnail, plus the revisions included in your plan.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative w-full bg-black px-6 py-20 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE PROCESS</p>
        <h2 className="mt-1 text-5xl md:text-7xl">How It Works</h2>
        <p className="mt-1 text-gray-400">From idea to finished video in four steps.</p>

        <div className="relative mt-12 grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[#e50914]/50 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#e50914]/60 hover:bg-white/[0.06]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e50914] shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                <s.icon size={24} />
              </span>
              <p className="mt-5 text-5xl leading-none text-white/15 font-[family-name:var(--font-bebas)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
