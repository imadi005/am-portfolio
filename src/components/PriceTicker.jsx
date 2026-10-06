"use client";
import Link from "next/link";
import { useCurrency } from "../context/CurrencyContext";

export default function PriceTicker() {
  const { format } = useCurrency();
  const items = [
    { t: "Now showing: your next video", href: "#packages" },
    { t: `Tickets from ${format(29.99)}`, href: "#packages" },
    { t: `Concessions from ${format(5)}`, href: "#packages" },
    { t: "Coming soon: your own channel", href: "#coming-soon" },
    { t: `The studio deal from ${format(1200)} setup`, href: "#channel-plans" },
    { t: "Pay in USD or INR", href: "#packages" },
  ];
  const row = [...items, ...items];

  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-[#0b0b0b] py-3">
      <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap text-sm font-semibold tracking-wide text-gray-200">
        {row.map((it, i) => (
          <Link key={i} href={it.href} className="flex items-center gap-10 transition hover:text-white">
            <span className="uppercase">{it.t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
