"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, Pause } from "lucide-react";

const STORIES = [
  {
    src: "/results/testimonials/t1.mp4",
    length: "1:32",
    headline: "Edits + channel automation",
    quote: "They get inside my head, understand my vision and then bang.",
  },
  {
    src: "/results/testimonials/t2.mp4",
    length: "0:39",
    headline: "300+ videos · 2 channels",
    quote: "Their swift delivery, attention to detail and relentless drive are remarkable.",
  },
  {
    src: "/results/testimonials/t3.mp4",
    length: "0:39",
    headline: "14 channels · 2 years",
    quote: "They're more than just a team, they're genuine partners.",
  },
  {
    src: "/results/testimonials/t4.mp4",
    length: "0:32",
    headline: "13 channels transformed",
    quote: "A&M Productions is pure YouTube magic.",
  },
  {
    src: "/results/testimonials/t5.mp4",
    length: "0:31",
    headline: "80+ videos · $20K+ earned",
    quote: "They take my ideas and turn them into captivating masterpieces.",
  },
];

export default function ClientStories() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);
  const phoneRef = useRef(null);
  const inView = useInView(phoneRef, { amount: 0.4 });

  const next = () => setActive((a) => (a + 1) % STORIES.length);
  const prev = () => setActive((a) => (a - 1 + STORIES.length) % STORIES.length);

  useEffect(() => {
    setProgress(0);
    setPaused(false);
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (inView && !paused) v.play().catch(() => {});
    else v.pause();
  }, [active, inView, paused, muted]);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#1a0000] to-black px-6 py-24 text-white md:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto] md:gap-14">
        <div className="order-2 md:order-1">
          <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">CLIENT STORIES</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-2 text-5xl uppercase md:text-7xl"
          >
            Voices That Define Our Impact
          </motion.h2>
          <p className="mt-4 max-w-lg text-lg text-gray-300">
            Hear what creators say about working with A&M. Tap through their stories.
          </p>

          <ol className="mt-10 max-w-md divide-y divide-white/10 border-y border-white/10">
            {STORIES.map((s, i) => (
              <li key={s.src}>
                <button
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center gap-5 py-4 text-left transition ${
                    i === active ? "text-white" : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  <span className="w-10 text-4xl font-[family-name:var(--font-bebas)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-semibold">{s.headline}</span>
                    <span className="block text-sm italic text-gray-400">&ldquo;{s.quote}&rdquo;</span>
                    <span className="mt-1 block text-xs tracking-widest">{s.length}</span>
                  </span>
                  <span
                    className={`h-8 w-1 rounded-full transition ${i === active ? "bg-[#e50914]" : "bg-transparent"}`}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div ref={phoneRef} className="order-1 mx-auto md:order-2">
          <div className="relative rounded-[2.75rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-[0_0_80px_rgba(229,9,20,0.4)] ring-1 ring-white/10">
            <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative aspect-[2/3] w-[270px] overflow-hidden rounded-[2rem] bg-black sm:w-[310px]">
              <video
                key={active}
                ref={videoRef}
                src={STORIES[active].src}
                muted={muted}
                playsInline
                preload="metadata"
                onTimeUpdate={(e) => setProgress(e.target.currentTime / (e.target.duration || 1))}
                onEnded={next}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-3 top-9 z-20 flex gap-1">
                {STORIES.map((_, i) => (
                  <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full bg-white"
                      style={{ width: i < active ? "100%" : i === active ? `${progress * 100}%` : "0%" }}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 z-10 flex">
                <button aria-label="Previous story" onClick={prev} className="h-full w-[30%]" />
                <button
                  aria-label={paused ? "Resume" : "Pause"}
                  onClick={() => setPaused((p) => !p)}
                  className="h-full flex-1"
                />
                <button aria-label="Next story" onClick={next} className="h-full w-[30%]" />
              </div>

              {paused && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  <span className="rounded-full bg-black/60 p-4 text-white">
                    <Pause size={28} />
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="absolute bottom-4 right-4 z-30 rounded-full bg-black/60 p-2.5 text-white hover:bg-[#e50914]"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <span className="absolute bottom-5 left-4 z-30 text-xs tracking-[0.25em] text-white">
                STORY {active + 1} / {STORIES.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
