"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Ticket } from "lucide-react";
import CurrencySwitcher from "./shop/CurrencySwitcher";
import { products, CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const SHOWS = ["MATINEE", "EVENING SHOW", "PRIME TIME", "PREMIERE NIGHT"];
const GRADS = [
  "from-[#2a0004] via-[#150002] to-[#0a0a0a]",
  "from-[#3a0006] via-[#1a0003] to-[#0a0a0a]",
  "from-[#4c0008] via-[#200004] to-[#0a0a0a]",
  "from-[#650009] via-[#2a0005] to-[#0a0a0a]",
];

function Ticket3({ product, index }) {
  const { addItem, clearCart } = useCart();
  const { format } = useCurrency();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  const buyNow = () => {
    clearCart();
    addItem(product.id, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12 }}
      className={`group relative grid overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${GRADS[index]} transition duration-300 hover:-translate-y-1 hover:border-[#e50914]/60 hover:shadow-[0_0_40px_rgba(229,9,20,0.3)] md:grid-cols-[1fr_190px]`}
    >
      <img src="/logo.png" alt="" aria-hidden className="pointer-events-none absolute -left-8 -top-8 h-44 w-44 object-contain opacity-[0.06]" />

      <div className="relative p-6">
        <p className="text-[10px] font-bold tracking-[0.35em] text-[#e50914]">
          {SHOWS[index]} · SCREEN 0{index + 1}
        </p>
        <h3 className="mt-2 text-4xl uppercase leading-none">{product.name}</h3>
        {product.duration && <p className="mt-2 text-xs font-semibold tracking-widest text-gray-400">RUNTIME {product.duration.toUpperCase()}</p>}
        <ul className="mt-4 space-y-1.5 text-sm text-gray-300">
          {product.features.map((f) => (
            <li key={f} className="flex gap-2">
              <Check size={15} className="mt-0.5 flex-shrink-0 text-[#e50914]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-2 border-t border-dashed border-white/25 p-5 text-center md:border-l md:border-t-0">
        <span className="absolute -top-3 left-[-12px] h-6 w-6 rounded-full bg-black md:left-[-12px] md:top-[-12px]" />
        <span className="absolute -top-3 right-[-12px] h-6 w-6 rounded-full bg-black md:bottom-[-12px] md:left-[-12px] md:right-auto md:top-auto" />
        <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500">ADMIT ONE</p>
        <p className="text-4xl font-bold text-white">{format(product.priceUSD)}</p>
        <button
          onClick={add}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#e50914] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.45)] transition hover:bg-[#b20710]"
        >
          {added ? <Check size={16} /> : <Ticket size={16} />} {added ? "In your cart" : "Get ticket"}
        </button>
        <button onClick={buyNow} className="text-xs text-gray-400 underline underline-offset-4 transition hover:text-white">
          or buy now
        </button>
      </div>
    </motion.div>
  );
}

export default function BoxOffice() {
  const tickets = products.filter((p) => p.category === CATEGORIES.CASHCOW);

  return (
    <section id="packages" className="relative w-full bg-black px-6 py-20 text-white md:px-16 scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(229,9,20,0.2),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE BOX OFFICE</p>
            <h2 className="mt-1 text-5xl md:text-7xl">Get your ticket to a better video</h2>
            <p className="mt-2 max-w-xl text-gray-400">
              Pick your show. Every video is made to order: unique to your channel, tailored to your niche. Pay in USD or INR, send your brief on WhatsApp and we roll camera.
            </p>
          </div>
          <CurrencySwitcher />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {tickets.map((p, i) => (
            <Ticket3 key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
