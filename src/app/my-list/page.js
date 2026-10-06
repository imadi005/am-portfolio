"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { NICHES } from "../../data/niches";
import { useMyList } from "../../context/ListContext";

export default function MyListPage() {
  const { ids, toggle } = useMyList();
  const router = useRouter();
  const saved = NICHES.filter((n) => ids.includes(n.id));

  const open = (id) => {
    sessionStorage.setItem("pending-niche", id);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black pb-24 text-white">
      <Navbar />
      <div className="px-6 pt-32 md:px-16">
        <h1 className="text-5xl md:text-7xl">My List</h1>
        {saved.length === 0 ? (
          <p className="mt-6 text-gray-400">
            Nothing here yet. Tap &ldquo;+ My List&rdquo; on any niche to save it.{" "}
            <Link href="/" className="text-[#e50914] underline">
              Browse niches
            </Link>
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {saved.map((n) => (
              <div key={n.id} className="group relative aspect-video overflow-hidden rounded-md">
                <button onClick={() => open(n.id)} className="h-full w-full">
                  <img src={`https://i.ytimg.com/vi/${n.videos[0].id}/hqdefault.jpg`} alt={n.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-2 text-left text-sm font-semibold">
                    {n.title}
                  </span>
                </button>
                <button
                  onClick={() => toggle(n.id)}
                  aria-label={`Remove ${n.title}`}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 hover:bg-[#e50914]"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
