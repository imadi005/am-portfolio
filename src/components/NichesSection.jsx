"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NICHES } from "../data/niches";
import NicheModal from "./NicheModal";

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
    <section id="niches" className="relative w-full bg-black py-20 text-white overflow-hidden">
      {/* Title */}
      <div className="mx-auto mb-12 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Explore Our Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto"
        >
          30+ creative dimensions. Flowing infinitely — seamless, immersive, futuristic.
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
          className="flex gap-5 no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            scrollBehavior: "auto", // Use auto for drag, smooth for buttons
          }}
        >
          {[...NICHES, ...NICHES].map((niche, i) => (
            <motion.div
              key={`${niche.id}-${i}`}
              className="relative flex-shrink-0 w-[220px] h-[293px] sm:w-[250px] sm:h-[333px] md:w-[280px] md:h-[373px] rounded-lg overflow-hidden"
              initial={{ scale: 0.95, opacity: 0.85 }}
              whileHover={{
                scale: 0.85,
                opacity: 1,
                zIndex: 20,
                boxShadow: "0 0 30px 6px rgba(255, 0, 0, 0.7)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => openModal(niche)}
            >
              <img
                src={niche.cover}
                alt={niche.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute bottom-4 inset-x-0 flex justify-center">
                <span className="bg-black/60 px-4 py-1.5 text-sm font-semibold text-white rounded-md">
                  {niche.title}
                </span>
              </div>
            </motion.div>
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
