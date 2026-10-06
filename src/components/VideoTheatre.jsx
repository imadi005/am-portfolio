"use client";
import { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

const OPTS = {
  width: "100%",
  height: "100%",
  playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1, iv_load_policy: 3 },
};

export default function VideoTheatre({
  open,
  onClose,
  eyebrow,
  title,
  description,
  tags,
  videoId,
  items = [],
  activeIndex = 0,
  onSelect,
  listTitle = "Up next",
}) {
  const [ready, setReady] = useState(false);
  const hasList = items.length > 1;

  const go = useCallback(
    (dir) => {
      if (!hasList || !onSelect) return;
      onSelect((activeIndex + dir + items.length) % items.length);
    },
    [hasList, onSelect, activeIndex, items.length]
  );

  useEffect(() => {
    if (!open) setReady(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "auto";
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && videoId && (
        <motion.div
          className="fixed inset-0 z-[300] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="fixed inset-0 bg-black">
            <img
              key={videoId}
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full scale-125 object-cover opacity-30 blur-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          </div>

          <div className="relative flex min-h-full items-center justify-center px-3 py-16 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute -top-12 right-0 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-[#e50914]"
              >
                Close <X size={16} />
              </button>

              <div className={`grid gap-6 ${hasList ? "lg:grid-cols-[1fr_340px]" : ""}`}>
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-[0_30px_100px_rgba(229,9,20,0.35)] ring-1 ring-white/10">
                    {!ready && (
                      <div className="skeleton absolute inset-0 flex items-center justify-center">
                        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#e50914]" />
                      </div>
                    )}
                    <YouTube
                      videoId={videoId}
                      opts={OPTS}
                      onReady={() => setReady(true)}
                      onEnd={() => hasList && go(1)}
                      className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
                      iframeClassName="h-full w-full"
                    />
                  </div>

                  <div className="mt-6">
                    {eyebrow && (
                      <p className="text-xs font-bold tracking-[0.3em] text-[#e50914]">{eyebrow}</p>
                    )}
                    <h2 className="mt-1 text-3xl leading-tight text-white md:text-5xl">{title}</h2>
                    {tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {description && (
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
                        {description}
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md bg-[#e50914] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b20710]"
                      >
                        Watch on YouTube <ExternalLink size={16} />
                      </a>
                      {hasList && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => go(-1)}
                            aria-label="Previous"
                            className="rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => go(1)}
                            aria-label="Next"
                            className="rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {hasList && (
                  <aside className="lg:max-h-[640px] lg:overflow-y-auto lg:pr-1 no-scrollbar">
                    <h3 className="mb-3 text-2xl text-white">{listTitle}</h3>
                    <ul className="space-y-2">
                      {items.map((it, i) => {
                        const on = i === activeIndex;
                        return (
                          <li key={it.id}>
                            <button
                              onClick={() => onSelect?.(i)}
                              className={`group flex w-full items-center gap-3 rounded-lg p-2 text-left transition ${
                                on ? "bg-white/10 ring-1 ring-[#e50914]/70" : "hover:bg-white/5"
                              }`}
                            >
                              <span className="relative aspect-video w-28 flex-shrink-0 overflow-hidden rounded-md bg-black">
                                <img
                                  src={`https://i.ytimg.com/vi/${it.id}/mqdefault.jpg`}
                                  alt=""
                                  loading="lazy"
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                {on && (
                                  <span className="absolute inset-0 flex items-end justify-start bg-black/40 p-1.5 text-[10px] font-bold tracking-widest text-white">
                                    NOW PLAYING
                                  </span>
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[11px] tracking-widest text-gray-500">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className={`line-clamp-2 text-sm font-semibold ${on ? "text-white" : "text-gray-300"}`}>
                                  {it.title}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
