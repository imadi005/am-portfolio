"use client";

import { useCurrency } from "../../context/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, changeCurrency, rate, rateError } = useCurrency();

  return (
    <div className="flex items-center gap-3">
      <div className="flex rounded-full border border-white/20 bg-black/40 p-1">
        {["USD", "INR"].map((c) => (
          <button
            key={c}
            onClick={() => changeCurrency(c)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
              currency === c
                ? "bg-[#e50914] text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {c === "USD" ? "$ USD" : "₹ INR"}
          </button>
        ))}
      </div>
      <span className="text-xs text-gray-400 hidden sm:inline">
        {rateError ? "using fallback rate" : `1 USD ≈ ₹${rate.toFixed(2)}`}
      </span>
    </div>
  );
}
