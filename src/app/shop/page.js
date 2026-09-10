"use client";

import Link from "next/link";
import Navbar from "../../components/navbar";
import CurrencySwitcher from "../../components/shop/CurrencySwitcher";
import ProductCard from "../../components/shop/ProductCard";
import { products, CATEGORIES } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function ShopPage() {
  const { itemCount } = useCart();

  const cashcow = products.filter((p) => p.category === CATEGORIES.CASHCOW);
  const individual = products.filter((p) => p.category === CATEGORIES.INDIVIDUAL);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Shop Our Services</h1>
            <p className="mt-2 text-gray-400">
              YouTube video editing, scripting, thumbnails &amp; monetized channels.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <Link
              href="/cart"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold hover:border-[#e50914]"
            >
              Cart ({itemCount})
            </Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#e50914]">{CATEGORIES.CASHCOW}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cashcow.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#e50914]">{CATEGORIES.INDIVIDUAL}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {individual.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
