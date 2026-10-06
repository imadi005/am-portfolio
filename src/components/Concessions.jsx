"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const IDS = ["thumbnails", "script-writing", "video-edit-4-5-standard", "video-edit-8-10-standard"];

function Item({ product }) {
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [added, setAdded] = useState(false);
  return (
    <button
      onClick={() => {
        addItem(product.id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="group flex items-center justify-between gap-4 border-b border-dashed border-white/15 py-3 text-left transition hover:border-[#e50914]/60"
    >
      <span>
        <span className="block text-lg font-semibold text-white">{product.name.replace(" - ", ": ")}</span>
        {product.duration && <span className="text-[11px] tracking-widest text-gray-500">{product.duration.toUpperCase()}</span>}
      </span>
      <span className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">{format(product.priceUSD)}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e50914] text-white transition group-hover:scale-110">
          {added ? <Check size={15} /> : <Plus size={15} />}
        </span>
      </span>
    </button>
  );
}

export default function Concessions() {
  const items = IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return (
    <section className="relative w-full bg-black px-6 py-14 text-white md:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 md:grid-cols-[1fr_1.3fr] md:p-12">
        <div>
          <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE CONCESSION STAND</p>
          <h2 className="mt-1 text-4xl md:text-6xl">Just need a snack?</h2>
          <p className="mt-2 text-gray-400">
            Not every night calls for a full feature. Grab a thumbnail, a script or a single edit on its way out.
          </p>
          <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-[#e50914] underline underline-offset-4">
            See the full menu
          </Link>
        </div>
        <div>
          {items.map((p) => (
            <Item key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
