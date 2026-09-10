"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";

export default function CheckoutPage() {
  const { items, totalUSD } = useCart();
  const { currency, format } = useCurrency();
  const router = useRouter();

  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => setCustomer((c) => ({ ...c, [e.target.name]: e.target.value }));

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!customer.email || !customer.phone) {
      setError("Please provide your email and phone number.");
      return;
    }
    if (!sdkReady || !window.Cashfree) {
      setError("Payment SDK is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          currency,
          customer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start payment.");

      const cashfree = window.Cashfree({
        mode: (process.env.NEXT_PUBLIC_CASHFREE_ENV || "sandbox").toLowerCase(),
      });
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        onLoad={() => setSdkReady(true)}
      />
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold">Checkout</h1>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-1 text-sm text-gray-300">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{format(item.priceUSD * item.qty)}</span>
            </div>
          ))}
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
            <span>Total ({currency})</span>
            <span>{format(totalUSD)}</span>
          </div>
        </div>

        <form onSubmit={handlePay} className="mt-8 space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full rounded border border-white/20 bg-black px-4 py-3"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full rounded border border-white/20 bg-black px-4 py-3"
          />
          <input
            name="phone"
            type="tel"
            required
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="w-full rounded border border-white/20 bg-black px-4 py-3"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#e50914] px-6 py-3 text-lg font-semibold hover:bg-[#c40812] disabled:opacity-50"
          >
            {loading ? "Redirecting to Cashfree…" : `Pay ${format(totalUSD)} with Cashfree`}
          </button>
        </form>
      </div>
    </main>
  );
}
