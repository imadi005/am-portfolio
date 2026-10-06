"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function CartPill() {
  const { itemCount, totalUSD } = useCart();
  const { format } = useCurrency();
  const pathname = usePathname();

  if (itemCount === 0 || pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-20 right-3 z-[95] flex items-center gap-2 rounded-full bg-[#e50914] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(229,9,20,0.6)] transition hover:scale-105 hover:bg-[#b20710] md:bottom-6 md:right-6"
    >
      <ShoppingCart size={17} />
      <span>
        Cart ({itemCount}) · {format(totalUSD)}
      </span>
    </Link>
  );
}
