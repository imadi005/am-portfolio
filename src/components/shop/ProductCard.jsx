"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";

const POSTER_GRADIENTS = [
  "from-[#3a0000] via-[#1a0000] to-black",
  "from-[#5c0000] via-[#240000] to-black",
  "from-[#7a0008] via-[#2a0000] to-black",
  "from-[#a00010] via-[#330000] to-black",
];

export default function ProductCard({ product, index = 0, label }) {
  const { format } = useCurrency();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex h-[400px] w-[270px] flex-shrink-0 snap-start flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b ${
        POSTER_GRADIENTS[index % POSTER_GRADIENTS.length]
      } p-5 hover:border-[#e50914]/70 hover:shadow-[0_0_30px_rgba(229,9,20,0.45)]`}
    >
      <img
        src="/logo.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-6 h-56 w-56 object-contain opacity-10"
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-300">
        <span>A&amp;M ORIGINAL</span>
        {label && <span className="rounded bg-[#e50914] px-2 py-0.5 text-white">{label}</span>}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-black uppercase leading-tight text-white">{product.name}</h3>
        {product.duration && (
          <p className="mt-1 text-xs font-semibold text-green-400">{product.duration}</p>
        )}
        <ul className="mt-3 space-y-1 text-xs text-gray-300">
          {product.features.slice(0, 4).map((f) => (
            <li key={f} className="line-clamp-2">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xl font-extrabold text-white">{format(product.priceUSD)}</span>
        <button
          onClick={handleAdd}
          className="rounded-md bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-white/80"
        >
          {added ? "Added ✓" : "+ Add"}
        </button>
      </div>
    </motion.div>
  );
}
