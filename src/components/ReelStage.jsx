"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";

const COUNT = 10;
const REELS = Array.from({ length: COUNT }).map((_, i) => `/results/videos/v${i + 1}.mp4`);
const MAX_MS = 12000;

function useCardSize() {
  const [w, setW] = useState(280);
  useEffect(() => {
    const update = () => setW(window.innerWidth < 640 ? 210 : 280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

function shortest(i, center) {
  let d = i - center;
  if (d > COUNT / 2) d -= COUNT;
  if (d < -COUNT / 2) d += COUNT;
  return d;
}

export default function ReelStage() {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const centerRef = useRef(null);
  const cardW = useCardSize();
  const cardH = Math.round((cardW * 16) / 9);

  const go = useCallback((dir) => setIndex((i) => (i + dir + COUNT) % COUNT), []);

  useEffect(() => {
    if (paused || hover) return;
    const t = setTimeout(() => go(1), MAX_MS);
    return () => clearTimeout(t);
  }, [index, paused, hover, go]);

  useEffect(() => {
    setPaused(false);
  }, [index]);

  useEffect(() => {
    const v = centerRef.current;
    if (!v) return;
    v.muted = muted;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [index, muted, paused]);

  const spread = cardW * 0.62;

  return (
    <div className="relative mx-auto mt-24 w-full max-w-6xl px-2">
      <div className="mb-2 text-center">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">NOW SCREENING</p>
        <h3 className="mt-2 text-4xl uppercase text-white md:text-6xl">Results in Motion</h3>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Real edits from real channels. Tap any reel to bring it to the stage.
        </p>
      </div>

      <div
        className="relative mx-auto select-none overflow-hidden"
        style={{ height: cardH + 90, perspective: 1400 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-24 w-[70%] rounded-[100%] bg-[#e50914]/25 blur-3xl" />

        <motion.div
          className="absolute inset-0"
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) go(1);
            else if (info.offset.x > 50) go(-1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          {REELS.map((src, i) => {
            const d = shortest(i, index);
            const abs = Math.abs(d);
            if (abs > 3) return null;
            const isCenter = d === 0;
            return (
              <motion.div
                key={src}
                initial={false}
                animate={{
                  x: d * spread,
                  scale: 1 - abs * 0.13,
                  rotateY: -d * 26,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.22,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                style={{
                  width: cardW,
                  height: cardH,
                  left: "50%",
                  top: 20,
                  marginLeft: -cardW / 2,
                  zIndex: 10 - abs,
                  transformStyle: "preserve-3d",
                }}
                className={`absolute overflow-hidden rounded-2xl border bg-black ${
                  isCenter
                    ? "border-[#e50914] shadow-[0_0_60px_rgba(229,9,20,0.55)]"
                    : "cursor-pointer border-white/10"
                }`}
                onClick={() => (isCenter ? setPaused((p) => !p) : setIndex(i))}
              >
                {abs <= 2 && (
                  <video
                    ref={isCenter ? centerRef : null}
                    src={isCenter ? src : `${src}#t=0.5`}
                    muted={isCenter ? muted : true}
                    loop={false}
                    playsInline
                    preload={isCenter ? "auto" : "metadata"}
                    onEnded={isCenter ? () => go(1) : undefined}
                    className="h-full w-full object-cover"
                  />
                )}
                {!isCenter && <div className="absolute inset-0 bg-black/45" />}
                {isCenter && (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-sm tracking-widest text-white">
                        REEL {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex gap-2">
                        <span className="rounded-full bg-black/60 p-2 text-white">
                          {paused ? <Play size={16} /> : <Pause size={16} />}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMuted((m) => !m);
                          }}
                          aria-label={muted ? "Unmute" : "Mute"}
                          className="rounded-full bg-black/60 p-2 text-white hover:bg-[#e50914]"
                        >
                          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous reel"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-[#e50914]"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next reel"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-[#e50914]"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {REELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to reel ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-[#e50914]" : "w-3 bg-white/25 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
