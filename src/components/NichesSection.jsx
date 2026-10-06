"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, Plus } from "lucide-react";
import { NICHES } from "../data/niches";
import { useMyList } from "../context/ListContext";
import NicheModal from "./NicheModal";

const GENRES = [
  { id: "mystery", name: "Mystery & History", ids: ["history", "mythology", "mystery", "true-crime", "prisoners", "alien"] },
  { id: "science", name: "Science & Tech", ids: ["space", "science", "technology-ai", "sci-fi", "aviation", "lego"] },
  { id: "money", name: "Money & Mindset", ids: ["finance", "world-economy", "motivation", "luxury-lifestyle"] },
  { id: "people", name: "People & Pop Culture", ids: ["biography", "us-president", "elon-musk", "celebrity", "youtube-celebs", "bts", "oh-boy-style"] },
  { id: "speed", name: "Speed, Sports & Machines", ids: ["nba", "f1", "biker-clubs", "tractors", "handguns"] },
  { id: "nature", name: "Nature & Lifestyle", ids: ["wildlife", "travel", "health"] },
];

const GENRE_OF = Object.fromEntries(GENRES.flatMap((g) => g.ids.map((id) => [id, g.name])));
const INITIAL_COUNT = 8;
const ROTATE_MS = 9000;
const PREVIEW_DELAY = 1500;

const thumb = (id, q = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;

function Spotlight({ niche, onPlay }) {
  const { has, toggle } = useMyList();
  const [preview, setPreview] = useState(false);
  const videoId = niche.videos?.[0]?.id;
  const saved = has(niche.id);

  useEffect(() => {
    setPreview(false);
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 768px)").matches) return;
    const t = setTimeout(() => setPreview(true), PREVIEW_DELAY);
    return () => clearTimeout(t);
  }, [niche.id]);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_100px_rgba(229,9,20,0.2)] md:aspect-[21/9] md:min-h-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={niche.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={thumb(videoId, "maxresdefault")}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = thumb(videoId);
            }}
            alt=""
            className="h-full w-full object-cover"
          />
          {preview && (
            <iframe
              title={`${niche.title} preview`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&loop=1&playlist=${videoId}`}
              allow="autoplay; encrypted-media"
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 scale-[1.45]"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:max-w-xl md:justify-center md:p-12">
        <p className="text-xs font-bold tracking-[0.3em] text-[#e50914]">
          {GENRE_OF[niche.id]?.toUpperCase() || "FEATURED NICHE"}
        </p>
        <h3 className="mt-2 text-5xl leading-none md:text-7xl">{niche.title}</h3>
        {niche.tagline && <p className="mt-3 text-base text-gray-200 md:text-lg">{niche.tagline}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {niche.tags?.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs text-gray-200">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onPlay(niche)}
            className="flex items-center gap-2 rounded-md bg-white px-7 py-2.5 font-bold text-black transition hover:bg-white/80"
          >
            <Play size={18} fill="currentColor" /> Play
          </button>
          <button
            onClick={() => toggle(niche.id)}
            className="flex items-center gap-2 rounded-md bg-white/15 px-5 py-2.5 font-bold text-white backdrop-blur transition hover:bg-white/25"
          >
            {saved ? <Check size={18} /> : <Plus size={18} />} My List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NichesSection() {
  const [genre, setGenre] = useState("all");
  const [activeId, setActiveId] = useState(NICHES[0].id);
  const [showAll, setShowAll] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    if (genre === "all") return NICHES;
    const ids = GENRES.find((g) => g.id === genre)?.ids || [];
    return ids.map((id) => NICHES.find((n) => n.id === id)).filter(Boolean);
  }, [genre]);

  const visible = genre === "all" && !showAll ? list.slice(0, INITIAL_COUNT) : list;
  const active = NICHES.find((n) => n.id === activeId) || list[0];

  useEffect(() => {
    if (!list.some((n) => n.id === activeId)) setActiveId(list[0].id);
  }, [list, activeId]);

  useEffect(() => {
    if (hover || open) return;
    const t = setTimeout(() => {
      const i = list.findIndex((n) => n.id === activeId);
      setActiveId(list[(i + 1) % list.length].id);
    }, ROTATE_MS);
    return () => clearTimeout(t);
  }, [activeId, list, hover, open]);

  useEffect(() => {
    const show = (id) => {
      const niche = NICHES.find((n) => n.id === id);
      if (!niche) return;
      setActiveId(id);
      setSelected(niche);
      setOpen(true);
    };
    const pending = sessionStorage.getItem("pending-niche");
    if (pending) {
      sessionStorage.removeItem("pending-niche");
      show(pending);
    }
    const onEvent = (e) => show(e.detail);
    window.addEventListener("open-niche", onEvent);
    return () => window.removeEventListener("open-niche", onEvent);
  }, []);

  const play = (niche) => {
    setSelected(niche);
    setOpen(true);
  };

  return (
    <section id="niches" className="relative w-full bg-black px-6 py-16 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE LIBRARY</p>
        <h2 className="mt-1 text-5xl md:text-7xl">Browse by Niche</h2>
        <p className="mt-1 text-gray-400">
          {NICHES.length} niches. Real edits for real channels. Pick a genre and press play.
        </p>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {[{ id: "all", name: "All" }, ...GENRES].map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setGenre(g.id);
                setShowAll(false);
              }}
              className={`flex-shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                genre === g.id
                  ? "border-white bg-white text-black"
                  : "border-white/25 text-gray-300 hover:border-white/60 hover:text-white"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        <div className="mt-6" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Spotlight niche={active} onPlay={play} />

          <motion.div
            key={`${genre}-${showAll}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
          >
            {visible.map((n) => {
              const on = n.id === active.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  className={`group relative isolate aspect-video overflow-hidden rounded-xl bg-neutral-900 text-left transition duration-300 ${
                    on
                      ? "ring-2 ring-[#e50914] shadow-[0_0_30px_rgba(229,9,20,0.45)]"
                      : "ring-1 ring-white/10 hover:-translate-y-1 hover:ring-white/40"
                  }`}
                >
                  <img
                    src={thumb(n.videos[0].id)}
                    alt={n.title}
                    loading="lazy"
                    className={`h-full w-full object-cover saturate-[0.8] contrast-110 transition duration-500 group-hover:scale-105 group-hover:saturate-100 ${
                      on ? "saturate-100" : "brightness-[0.65] group-hover:brightness-90"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-[#e50914]/10 mix-blend-overlay" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <span className="block text-3xl leading-none text-white drop-shadow font-[family-name:var(--font-bebas)]">
                      {n.title}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold tracking-[0.25em] text-gray-300">
                      {n.videos.length} VIDEOS
                    </span>
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      play(n);
                    }}
                    role="button"
                    aria-label={`Play ${n.title}`}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition group-hover:opacity-100"
                  >
                    <Play size={16} fill="currentColor" className="ml-0.5" />
                  </span>
                </button>
              );
            })}
          </motion.div>

          {genre === "all" && list.length > INITIAL_COUNT && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="rounded-full border border-white/30 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                {showAll ? "Show less" : `Show all ${list.length} niches`}
              </button>
            </div>
          )}
        </div>
      </div>

      <NicheModal niche={selected} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
