"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bookmark, ShoppingBag } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const item = "flex flex-1 flex-col items-center gap-1 py-2 text-[11px]";
  const cls = (p) => `${item} ${pathname === p ? "text-white" : "text-gray-400"}`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[90] flex border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
      <Link href="/" className={cls("/")}>
        <Home size={20} /> Home
      </Link>
      <button onClick={() => window.dispatchEvent(new Event("open-search"))} className={`${item} text-gray-400`}>
        <Search size={20} /> Search
      </button>
      <Link href="/my-list" className={cls("/my-list")}>
        <Bookmark size={20} /> My List
      </Link>
      <Link href="/shop" className={cls("/shop")}>
        <ShoppingBag size={20} /> Shop
      </Link>
    </nav>
  );
}
