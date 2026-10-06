"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import CurrencySwitcher from "../../components/shop/CurrencySwitcher";
import ProductCard from "../../components/shop/ProductCard";
import { products, CATEGORIES } from "../../data/products";
import { useCart } from "../../context/CartContext";

function Row({ title, items, labelFor }) {
  const rail = useRef(null);
  const scroll = (dir) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="mt-12">
      <h2 className="px-6 text-xl font-bold text-white md:px-16 md:text-2xl">{title}</h2>
      <div className="group relative mt-4">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-0 z-30 hidden h-full w-12 items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100 md:flex"
        >
          <ChevronLeft size={32} />
        </button>
        <div
          ref={rail}
          className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-6 py-4 md:px-16"
        >
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} label={labelFor?.(p)} />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-0 z-30 hidden h-full w-12 items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100 md:flex"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}

export default function ShopPage() {
  const { itemCount } = useCart();

  const cashcow = products.filter((p) => p.category === CATEGORIES.CASHCOW);
  const individual = products.filter((p) => p.category === CATEGORIES.INDIVIDUAL);
  const edits = individual.filter((p) => p.id.startsWith("video-edit"));
  const others = individual.filter((p) => !p.id.startsWith("video-edit"));

  return (
    <main className="min-h-screen bg-black pb-24 text-white">
      <Navbar />

      <header className="relative overflow-hidden px-6 pb-8 pt-32 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.25),transparent_60%)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">A&amp;M ORIGINALS</p>
            <h1 className="mt-2 text-4xl font-black uppercase md:text-6xl">Now Streaming: Our Services</h1>
            <p className="mt-3 max-w-xl text-gray-300">
              Pick your plan. Every package ships with editing, thumbnails and revisions.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <Link
              href="/cart"
              className="rounded-md bg-white px-5 py-2 text-sm font-bold text-black hover:bg-white/80"
            >
              Cart ({itemCount})
            </Link>
          </div>
        </div>
      </header>

      <Row title="Cashcow Packages" items={cashcow} labelFor={(p) => (p.id === "premier-production" ? "FLAGSHIP" : null)} />
      <Row title="Video Editing" items={edits} />
      <Row title="More Services" items={others} />
      <div className="mt-20"><Footer /></div>
    </main>
  );
}
