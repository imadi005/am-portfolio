"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NicheModal({ niche, open, onClose }) {
  const [player, setPlayer] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const currentVideo = useMemo(
    () => niche?.videos?.[activeIndex] || null,
    [niche, activeIndex]
  );

  // Reset state when modal opens/changes
  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [open, niche]);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // YouTube player options
  const ytOpts = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1, // Autoplay when a new video is selected
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        fs: 1,
      },
    }),
    []
  );

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      onClose?.();
    }
  };
  
  return (
    <AnimatePresence>
      {open && niche ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-5xl h-full max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_0_40px_rgba(229,9,20,.25)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-[97] rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto no-scrollbar"
            >
              {/* Video Player */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {currentVideo && (
                  <YouTube
                    videoId={currentVideo.id}
                    opts={ytOpts}
                    className="h-full w-full"
                    iframeClassName="h-full w-full"
                  />
                )}
              </div>

              {/* Details Section */}
              <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[1.5fr_1fr]">
                {/* Left: Info */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{niche.title}</h2>
                  {niche.tagline && (
                    <p className="mt-2 text-base md:text-lg text-gray-300">{niche.tagline}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {niche.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-red-500/40 px-3 py-1 text-xs text-red-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="my-5 h-px w-full bg-gradient-to-r from-red-500/50 via-red-500/20 to-transparent" />
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base break-words">
                    {niche.description}
                  </p>
                </div>

                {/* Right: More Videos */}
                <div className="max-lg:order-first">
                  <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-400">
                    More in this niche
                  </h3>
                  {/* --- MODIFIED: Changed to a vertical flex column --- */}
                  <div className="flex flex-col gap-3">
                    {(niche.videos || []).map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setActiveIndex(idx)}
                        /* --- MODIFIED: Changed to full-width and aspect-video --- */
                        className={`relative w-full aspect-video overflow-hidden rounded-lg border-2 transition-transform duration-300 ${
                          idx === activeIndex
                            ? "border-red-600 scale-105"
                            : "border-transparent hover:scale-105"
                        }`}
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                          alt={`Thumbnail for video ${idx + 1}`}
                          className="block w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

