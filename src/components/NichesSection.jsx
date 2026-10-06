"use client";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { useMyList } from "../context/ListContext";
import { NICHES } from "../data/niches";
import NicheModal from "./NicheModal";


function NicheCard({ niche, onOpen }) {
  const { has, toggle } = useMyList();
  const [preview, setPreview] = useState(false);
  const timer = useRef(null);
  const videoId = niche.videos?.[0]?.id;
  const saved = has(niche.id);

  const enter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    timer.current = setTimeout(() => setPreview(true), 700);
  };
  const leave = () => {
    clearTimeout(timer.current);
    setPreview(false);
  };

  return (
    <motion.div
      className="group relative flex-shrink-0 w-[220px] h-[293px] sm:w-[250px] sm:h-[333px] md:w-[280px] md:h-[373px] rounded-lg overflow-hidden"
      initial={{ scale: 0.97, opacity: 0.9 }}
      whileHover={{ scale: 1.08, opacity: 1, zIndex: 20, boxShadow: "0 0 30px 6px rgba(229, 9, 20, 0.6)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => onOpen(niche)}
    >
      <Image
        src={niche.cover}
        alt={niche.title}
        fill
        sizes="(max-width: 640px) 220px, 280px"
        className="object-cover"
        draggable={false}
      />
      {preview && videoId && (
        <iframe
          title={`${niche.title} preview`}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${videoId}`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute inset-0 h-full w-[300%] max-w-none -translate-x-[33%] scale-110"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-lg font-bold leading-tight text-white">{niche.title}</p>
        <div className="mt-1 hidden items-center justify-between group-hover:flex">
          <span className="truncate text-xs text-gray-300">{(niche.tags || []).slice(0, 3).join(" · ")}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle(niche.id);
            }}
            aria-label={saved ? "Remove from My List" : "Add to My List"}
            className="ml-2 flex-shrink-0 rounded-full border border-white/70 p-1 text-white hover:border-white hover:bg-white/20"
          >
            {saved ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function NichesSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const railRef = useRef(null);
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const dragState = useRef({ startX: 0, startLeft: 0 });

  const openModal = (niche) => {
    // Prevent modal from opening after a drag
    if (Math.abs(dragState.current.startX - (dragState.current.endX || dragState.current.startX)) > 5) return;
    setSelected(niche);
    setOpen(true);
  };

  useEffect(() => {
    const show = (id) => {
      const niche = NICHES.find((n) => n.id === id);
      if (!niche) return;
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

  /* --------------------- SCROLL LOGIC --------------------- */

  // Autoscroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const tick = () => {
      if (!isHovering.current && !isDragging.current) {
        rail.scrollLeft += 0.7;
        if (rail.scrollLeft >= rail.scrollWidth / 2) {
          rail.scrollLeft = 0;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Manual Scroll Buttons
  const handleManualScroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const scrollAmount = rail.clientWidth * 0.8; // Scroll by 80% of the visible width
    rail.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Drag/Swipe to scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onStart = (e) => {
      isDragging.current = true;
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      dragState.current.startX = pageX;
      dragState.current.endX = pageX; // Reset endX on new drag
      dragState.current.startLeft = rail.scrollLeft;
    };

    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      dragState.current.endX = pageX; // Track last position
      const dx = pageX - dragState.current.startX;
      rail.scrollLeft = dragState.current.startLeft - dx * 1.5; // Multiplier for faster drag
    };

    const onEnd = () => {
      isDragging.current = false;
    };

    rail.addEventListener("mousedown", onStart);
    rail.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    return () => {
      rail.removeEventListener("mousedown", onStart);
      rail.removeEventListener("touchstart", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  /* --------------------- RENDER --------------------- */
  return (
    <section id="niches" className="relative w-full bg-black py-10 text-white overflow-hidden scroll-mt-16">
      {/* Title */}
      <div className="mb-6 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl"
        >
          Browse by Niche
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 mt-1 text-base md:text-lg max-w-2xl"
        >
          30+ niches. Pick one and press play.
        </motion.p>
      </div>

      {/* Slider Container with Buttons */}
      <div
        className="relative"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
      >
        {/* Infinite Slider */}
        <div
          ref={railRef}
          className="flex gap-5 py-8 no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            scrollBehavior: "auto", // Use auto for drag, smooth for buttons
          }}
        >
          {[...NICHES, ...NICHES].map((niche, i) => (
            <NicheCard key={`${niche.id}-${i}`} niche={niche} onOpen={openModal} />
          ))}
        </div>

        {/* Manual Scroll Buttons (Desktop Only) */}
        <div className="hidden md:block">
          <button
            onClick={() => handleManualScroll("left")}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full border border-red-500/50 hover:bg-red-500 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full border border-red-500/50 hover:bg-red-500 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <NicheModal niche={selected} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
