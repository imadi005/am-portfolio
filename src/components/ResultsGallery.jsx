"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";

const COUNT = 17;
const IMAGES = Array.from({ length: COUNT }).map((_, i) => `/results/r${i + 1}.jpeg`);
const AUTO_MS = 5000;

export default function ResultsGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const stripRef = useRef(null);
  const touchX = useRef(null);

  const go = useCallback((dir) => setIndex((i) => (i + dir + COUNT) % COUNT), []);

  useEffect(() => {
    if (paused || lightbox) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, lightbox, go]);

  useEffect(() => {
    const el = stripRef.current?.children[index];
    if (el && stripRef.current) {
      const strip = stripRef.current;
      strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [index]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [lightbox, go]);

  useEffect(() => setZoom(false), [index, lightbox]);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-5xl px-4 md:px-0">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-3xl text-white md:text-4xl">Real Channel Results</h3>
        <span className="text-sm tracking-widest text-gray-400">
          {String(index + 1).padStart(2, "0")} / {COUNT}
        </span>
      </div>

      <div
        className="group relative overflow-hidden rounded-xl border border-red-500/40 bg-[#0b0b0b] shadow-[0_0_40px_rgba(229,9,20,0.25)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={() => setLightbox(true)}
          aria-label="Open full screen"
          className="relative block aspect-[16/9] w-full cursor-zoom-in"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={IMAGES[index]}
              alt={`Channel analytics result ${index + 1}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            <Maximize2 size={14} /> View full
          </span>
        </button>

        <button
          onClick={() => go(-1)}
          aria-label="Previous result"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-[#e50914]"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next result"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-[#e50914]"
        >
          <ChevronRight />
        </button>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div
            key={`${index}-${paused}`}
            className="h-full bg-[#e50914]"
            initial={{ width: 0 }}
            animate={{ width: paused ? 0 : "100%" }}
            transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: "linear" }}
          />
        </div>
      </div>

      <div ref={stripRef} className="no-scrollbar mt-4 flex gap-3 overflow-x-auto py-2">
        {IMAGES.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Show result ${i + 1}`}
            className={`relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md border-2 bg-black transition md:h-20 md:w-36 ${
              i === index ? "border-[#e50914] opacity-100" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95"
            onClick={() => setLightbox(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-[#e50914]"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => !z);
              }}
              aria-label="Toggle zoom"
              className="absolute right-20 top-5 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-[#e50914]"
            >
              <ZoomIn size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 z-10 rounded-full bg-black/60 p-3 text-white hover:bg-[#e50914] md:left-8"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-3 z-10 rounded-full bg-black/60 p-3 text-white hover:bg-[#e50914] md:right-8"
            >
              <ChevronRight size={28} />
            </button>

            <div className={`max-h-full max-w-full ${zoom ? "overflow-auto" : "overflow-hidden"}`} onClick={(e) => e.stopPropagation()}>
              <img
                src={IMAGES[index]}
                alt={`Channel analytics result ${index + 1}`}
                onClick={() => setZoom((z) => !z)}
                className={`select-none transition-all duration-300 ${
                  zoom ? "max-w-none w-[220vw] cursor-zoom-out md:w-[160vw]" : "max-h-[90vh] max-w-[94vw] cursor-zoom-in object-contain"
                }`}
              />
            </div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-widest text-gray-400">
              {index + 1} / {COUNT}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
