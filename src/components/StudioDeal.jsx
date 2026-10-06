"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PlanCard from "./plans/PlanCard";
import { PLANS } from "../data/plans";
import { useCurrency } from "../context/CurrencyContext";

function ProfitSplit() {
  const { format } = useCurrency();
  const [profit, setProfit] = useState(1000);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c0004] to-black p-6 md:p-8">
      <p className="text-xs font-bold tracking-[0.3em] text-gray-400">THE PRODUCER&apos;S CUT</p>
      <h3 className="mt-1 text-3xl md:text-5xl">If your channel nets {format(profit)} in a month</h3>

      <input
        type="range"
        min={0}
        max={5000}
        step={100}
        value={profit}
        onChange={(e) => setProfit(Number(e.target.value))}
        aria-label="Monthly net channel profit"
        className="mt-5 w-full cursor-pointer accent-[#e50914]"
      />
      <div className="flex justify-between text-[11px] text-gray-500">
        <span>{format(0)}</span>
        <span>{format(5000)}</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {PLANS.map((p) => {
          const keep = Math.round((profit * (100 - p.share)) / 100);
          const share = profit - keep;
          return (
            <div key={p.id}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-semibold">
                  PLAN {p.code} <span className="font-normal text-gray-400">· {p.name}</span>
                </span>
                <span className="text-gray-400">
                  You keep <span className="font-bold text-white">{format(keep)}</span>
                  {p.share > 0 && <span> · A&amp;M {format(share)}</span>}
                </span>
              </div>
              <div className="mt-1.5 flex h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${100 - p.share}%` }} />
                {p.share > 0 && <div className="h-full bg-[#e50914] transition-all duration-500" style={{ width: `${p.share}%` }} />}
              </div>
              <p className="mt-1 text-[11px] text-gray-500">
                {format(p.setup)} setup + {format(p.monthly)}/month
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-gray-500">
        Illustrative split of net channel profit, not a forecast. Our setup and monthly fees are separate and are not deducted from the profit. Channel
        profit usually starts after month 4-6 and we never guarantee income.
      </p>
    </div>
  );
}

export default function StudioDeal() {
  return (
    <section id="channel-plans" className="relative w-full overflow-hidden bg-black px-6 py-24 text-white md:px-16 scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(229,9,20,0.28),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE STUDIO DEAL</p>
        <h2 className="mt-1 max-w-4xl text-5xl uppercase md:text-8xl">
          You own the channel. <span className="text-[#e50914]">We produce every episode.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          For creators, brands, businesses, coaches, agencies and sellers. Choose how profit is split and we take it from there.
        </p>

        <div className="mt-12">
          <ProfitSplit />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} plan={p} index={i} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Buy now pays the setup fee plus the first month. Prefer to talk first? Book a call on any plan.</p>
          <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-[#e50914] underline underline-offset-4">
            Compare every detail <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
