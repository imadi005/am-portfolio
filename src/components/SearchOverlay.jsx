"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { NICHES } from "../data/niches";
import { products } from "../data/products";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  const term = q.trim().toLowerCase();
  const niches = useMemo(
    () =>
      NICHES.filter(
        (n) =>
          !term ||
          n.title.toLowerCase().includes(term) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(term))
      ),
    [term]
  );
  const items = useMemo(
    () => (term ? products.filter((p) => !p.hidden && p.name.toLowerCase().includes(term)) : []),
    [term]
  );

  const openNiche = (id) => {
    setOpen(false);
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-niche", { detail: id }));
    } else {
      sessionStorage.setItem("pending-niche", id);
      router.push("/");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[180] overflow-y-auto bg-black/95 px-6 py-20 md:px-16">
      <button onClick={() => setOpen(false)} aria-label="Close search" className="fixed right-6 top-6 text-white">
        <X className="h-8 w-8" />
      </button>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 border-b border-white/30 pb-3">
          <Search className="h-6 w-6 text-gray-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search niches, edits, services"
            className="w-full bg-transparent text-2xl text-white outline-none placeholder:text-gray-500 md:text-4xl"
          />
        </div>

        {items.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-white">Services</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm text-gray-200 hover:border-[#e50914]"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2 className="mt-8 text-2xl text-white">{term ? "Niches" : "Browse by niche"}</h2>
        {niches.length === 0 && <p className="mt-3 text-gray-400">No titles match &ldquo;{q}&rdquo;.</p>}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {niches.map((n) => (
            <button key={n.id} onClick={() => openNiche(n.id)} className="group relative aspect-video overflow-hidden rounded-md">
              <img src={`https://i.ytimg.com/vi/${n.videos[0].id}/hqdefault.jpg`} alt={n.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-2 text-left text-sm font-semibold text-white">
                {n.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
