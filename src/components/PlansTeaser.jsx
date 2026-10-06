"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PLANS } from "../data/plans";
import { useCurrency } from "../context/CurrencyContext";

export default function PlansTeaser() {
  const { format } = useCurrency();
  return (
    <section id="plans-teaser" className="relative w-full overflow-hidden bg-black px-6 py-20 text-white md:px-16 scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_30%,rgba(229,9,20,0.28),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="rounded bg-[#e50914] px-3 py-1 text-xs font-bold tracking-widest">NEW</span>
          <p className="mt-4 text-xs font-bold tracking-[0.35em] text-[#e50914]">THE COMPLETE DONE-FOR-YOU DEAL</p>
          <h2 className="mt-1 text-5xl uppercase md:text-7xl">Your complete YouTube channel, done for you</h2>
          <p className="mt-4 max-w-lg text-lg text-gray-300">
            For creators, brands, businesses, coaches, agencies and sellers. We handle strategy, scripts, editing, upload and
            growth; you own the channel. Choose how much profit share you give us, from 50% down to 0%.
          </p>
          <Link
            href="/plans"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3 text-lg font-bold text-black transition hover:bg-white/80"
          >
            See the four plans <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href="/plans#plans"
                className="block rounded-xl border border-white/10 bg-gradient-to-b from-[#3a0005] to-black p-4 transition hover:-translate-y-1 hover:border-[#e50914]/70"
              >
                <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400">PLAN {p.code}</p>
                <p className="mt-1 text-5xl leading-none text-[#e50914] font-[family-name:var(--font-bebas)]">{p.share}%</p>
                <p className="text-xs tracking-widest text-gray-400">PROFIT SHARE</p>
                <p className="mt-3 text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-gray-400">
                  {format(p.setup)} setup + {format(p.monthly)}/mo
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
