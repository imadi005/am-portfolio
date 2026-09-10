"use client";

import Link from "next/link";
import Navbar from "../../components/navbar";
import CurrencySwitcher from "../../components/shop/CurrencySwitcher";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

export default function CartPage() {
  const { items, updateQty, removeItem, totalUSD } = useCart();
  const { format } = useCurrency();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <CurrencySwitcher />
        </div>

        {items.length === 0 ? (
          <div className="mt-16 text-center text-gray-400">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-block text-[#e50914] underline">
              Browse Services
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{format(item.priceUSD)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, Number(e.target.value))}
                      className="w-16 rounded border border-white/20 bg-black px-2 py-1 text-center"
                    />
                    <span className="w-24 text-right font-semibold">
                      {format(item.priceUSD * item.qty)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-gray-400 hover:text-[#e50914]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold">{format(totalUSD)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-8 block rounded-full bg-[#e50914] px-6 py-3 text-center text-lg font-semibold hover:bg-[#c40812]"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
