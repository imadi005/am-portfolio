"use client";

import { useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { format } = useCurrency();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:border-[#e50914]/50">
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      {product.duration && (
        <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
          Duration: {product.duration}
        </p>
      )}
      <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-300">
        {product.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-[#e50914]">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-white">{format(product.priceUSD)}</span>
        <button
          onClick={handleAdd}
          className="rounded-full bg-[#e50914] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c40812]"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
