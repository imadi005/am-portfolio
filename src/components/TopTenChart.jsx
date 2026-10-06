"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { TOP_EDITS } from "../data/topEdits";
import EditModal from "./EditModal";

const AUTO_MS = 6000;

export default function TopTenChart() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const edit = TOP_EDITS[active];

  useEffect(() => {
    if (hover || open) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TOP_EDITS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, hover, open]);

  return (
    <section id="top10" className="relative w-full overflow-hidden bg-black px-6 pb-16 pt-24 text-white md:px-16 scroll-mt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={edit.cover}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <Image src={edit.cover} alt="" fill sizes="100vw" className="scale-125 object-cover blur-3xl" />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE CHART</p>
        <h2 className="mt-1 text-5xl md:text-7xl">Top 10 Edits</h2>
        <p className="mt-1 text-gray-400">Our ten most-watched edits right now. Pick one to preview.</p>

        <div
          className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_380px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ol className="order-2 md:order-1">
            {TOP_EDITS.map((e, i) => {
              const on = i === active;
              return (
                <li key={e.rank}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group relative flex w-full items-center gap-4 border-b border-white/10 py-3 pl-4 text-left transition-all duration-300 md:gap-6 ${
                      on ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-300 ${
                        on ? "scale-y-100 bg-[#e50914]" : "scale-y-0 bg-[#e50914]"
                      }`}
                    />
                    <span
                      className={`w-14 flex-shrink-0 text-5xl leading-none transition-colors font-[family-name:var(--font-bebas)] md:w-20 md:text-6xl ${
                        on ? "text-[#e50914]" : "text-white/25 group-hover:text-white/50"
                      }`}
                    >
                      {String(e.rank).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 pr-4 text-base font-semibold leading-snug transition-colors md:text-lg ${
                        on ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      {e.title}
                    </span>
                    {on && !hover && (
                      <motion.span
                        key={active}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#e50914]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="order-1 mx-auto w-full max-w-[320px] md:order-2 md:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={edit.rank}
                initial={{ opacity: 0, y: 24, rotateY: -8 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <button
                  onClick={() => setOpen(true)}
                  aria-label={`Play ${edit.title}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/15 shadow-[0_20px_80px_rgba(229,9,20,0.35)]"
                >
                  <Image src={edit.cover} alt={edit.title} fill sizes="380px" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-[#e50914] px-3 py-1 text-sm font-bold tracking-widest">
                    #{edit.rank}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition group-hover:opacity-100">
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </span>
                  </span>
                </button>
                <p className="mt-4 line-clamp-3 text-sm text-gray-300">{edit.description}</p>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-4 flex items-center gap-2 rounded-md bg-white px-6 py-2.5 font-bold text-black hover:bg-white/80"
                >
                  <Play size={18} fill="currentColor" /> Watch this edit
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <EditModal edit={edit} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
