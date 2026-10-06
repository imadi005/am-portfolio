"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { planWhatsApp, planProductId } from "../../data/plans";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6 },
};

export function useBuyNow() {
  const { clearCart, addItem } = useCart();
  const router = useRouter();
  return (plan) => {
    clearCart();
    addItem(planProductId(plan), 1);
    router.push("/checkout");
  };
}

export default function PlanCard({ plan, index }) {
  const { format } = useCurrency();
  const buyNow = useBuyNow();
  const shades = [
    "from-[#4a0006] via-[#1d0003] to-black",
    "from-[#5e0008] via-[#220003] to-black",
    "from-[#780009] via-[#2a0004] to-black",
    "from-[#990010] via-[#330005] to-black",
  ];
  return (
    <motion.div
      {...fade}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${shades[index]} p-6 transition hover:-translate-y-1 hover:border-[#e50914]/70 hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]`}
    >
      <img src="/logo.png" alt="" aria-hidden className="pointer-events-none absolute -right-10 -top-8 h-48 w-48 object-contain opacity-10" />
      <p className="relative text-xs font-bold tracking-[0.3em] text-gray-300">PLAN {plan.code}</p>
      <h3 className="relative mt-1 text-4xl leading-none">{plan.name}</h3>
      <p className="relative mt-2 min-h-[40px] text-sm text-gray-300">{plan.tagline}</p>

      <div className="relative mt-5 rounded-lg bg-black/40 p-4">
        <p className="text-5xl leading-none text-[#e50914] font-[family-name:var(--font-bebas)]">
          {plan.share}%<span className="ml-2 text-base tracking-widest text-gray-300">PROFIT SHARE</span>
        </p>
        <p className="mt-3 text-sm text-gray-300">
          <span className="text-2xl font-bold text-white">{format(plan.setup)}</span> setup
        </p>
        <p className="text-sm text-gray-300">
          + <span className="text-2xl font-bold text-white">{format(plan.monthly)}</span> / month
        </p>
      </div>

      <ul className="relative mt-5 flex-1 space-y-2 text-sm text-gray-300">
        {[
          `${plan.longVideos} long videos / month`,
          `${plan.shorts} Shorts / month`,
          `${plan.revisions} revision${plan.revisions === "1" ? "" : "s"} per video`,
          `Calls: ${plan.calls}`,
          `Reporting: ${plan.reporting}`,
          `Minimum term: ${plan.minTerm}`,
        ].map((li) => (
          <li key={li} className="flex gap-2">
            <Check size={16} className="mt-0.5 flex-shrink-0 text-[#e50914]" />
            <span>{li}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 space-y-2">
        <button
          onClick={() => buyNow(plan)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#e50914] px-5 py-3 font-bold text-white shadow-[0_0_25px_rgba(229,9,20,0.45)] transition hover:bg-[#b20710]"
        >
          <CreditCard size={18} /> Buy now · {format(plan.cashStart)}
        </button>
        <a
          href={planWhatsApp(plan)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-black transition hover:bg-white/80"
        >
          <FaWhatsapp size={18} /> Book a call
        </a>
        <p className="text-center text-[11px] text-gray-500">Buy now = setup + first month, paid securely via Cashfree</p>
      </div>
    </motion.div>
  );
}

