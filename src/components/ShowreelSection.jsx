"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";

const WHATSAPP = `https://wa.me/916299043460?text=${encodeURIComponent(
  "Hello A&M Productions, I watched your showreel and I'm interested in your services. I'd like more information on pricing and how to place an order."
)}`;

const fmt = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function ShowreelSection() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(118);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * (v.duration || duration);
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" && started && wrapRef.current?.matches(":hover")) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started]);

  return (
    <section id="showreel" className="relative w-full bg-black px-4 pb-8 pt-4 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">OFFICIAL TRAILER</p>
            <h2 className="mt-1 text-5xl md:text-7xl">The A&amp;M Showreel</h2>
          </div>
          <p className="max-w-sm text-sm text-gray-400">
            Two minutes on how we turn raw footage into videos people finish watching.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_120px_rgba(229,9,20,0.3)]"
        >
          <video
            ref={videoRef}
            src="/videos/showreel.mp4"
            preload="none"
            playsInline
            muted={muted}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setStarted(false);
              setPlaying(false);
              setTime(0);
            }}
            onTimeUpdate={(e) => setTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onClick={toggle}
            className="h-full w-full cursor-pointer bg-black object-contain"
          />

          <AnimatePresence>
            {!started && (
              <motion.button
                key="poster"
                onClick={start}
                aria-label="Play showreel"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 overflow-hidden bg-black"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(229,9,20,0.45),transparent_70%)]" />
                <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_50%_-10%,transparent_0deg,rgba(255,255,255,0.12)_12deg,transparent_28deg,transparent_332deg,rgba(255,255,255,0.12)_348deg,transparent_360deg)]" />
                <div className="film-grain" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

                <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-4 text-center sm:gap-3 sm:px-6">
                  <img src="/logo.png" alt="" className="h-9 w-9 object-contain sm:h-20 sm:w-20 md:h-36 md:w-36" />
                  <p className="text-[9px] font-bold tracking-[0.35em] text-gray-300 sm:text-xs sm:tracking-[0.5em] md:text-sm">A&amp;M PRODUCTIONS PRESENTS</p>
                  <p className="text-4xl leading-none sm:text-6xl md:text-8xl font-[family-name:var(--font-bebas)]">
                    THE <span className="text-[#e50914]">SHOWREEL</span>
                  </p>
                  <span className="relative mt-1 flex h-12 w-12 items-center justify-center sm:mt-4 sm:h-20 sm:w-20 md:h-24 md:w-24">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#e50914]/40" />
                    <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#e50914] shadow-[0_0_50px_rgba(229,9,20,0.8)] transition group-hover:scale-110">
                      <Play fill="white" className="ml-1 h-5 w-5 sm:h-9 sm:w-9" />
                    </span>
                  </span>
                  <p className="text-[9px] tracking-[0.25em] text-gray-400 sm:mt-2 sm:text-xs sm:tracking-[0.3em]">OFFICIAL TRAILER · {fmt(duration)}</p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {started && (
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-12 transition-opacity duration-300 ${
                playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div
                onClick={seek}
                className="mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/25 transition-all hover:h-2.5"
              >
                <div className="h-full rounded-full bg-[#e50914]" style={{ width: `${(time / duration) * 100}%` }} />
              </div>
              <div className="flex items-center gap-4 text-white">
                <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="hover:text-[#e50914]">
                  {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                </button>
                <button
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="hover:text-[#e50914]"
                >
                  {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <span className="text-sm tabular-nums text-gray-200">
                  {fmt(time)} / {fmt(duration)}
                </span>
                <button onClick={fullscreen} aria-label="Fullscreen" className="ml-auto hover:text-[#e50914]">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-300">Want a reel like this for your channel?</p>
          <div className="flex gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#e50914] px-6 py-2.5 font-bold text-white transition hover:bg-[#b20710]"
            >
              Order Now
            </a>
            <Link
              href="/shop"
              className="rounded-md bg-white/10 px-6 py-2.5 font-bold text-white transition hover:bg-white/20"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
