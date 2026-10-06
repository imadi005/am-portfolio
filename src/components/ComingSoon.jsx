"use client";
import { motion } from "framer-motion";
import { ArrowDown, Clapperboard, Gem, Lightbulb } from "lucide-react";

const PILLARS = [
  {
    icon: Lightbulb,
    k: "THE IDEA",
    t: "An asset you own",
    d: "A channel built for your brand or expertise, growing an audience while you run your business.",
  },
  {
    icon: Clapperboard,
    k: "THE VIBE",
    t: "Cinematic, never generic",
    d: "Faceless and cinematic, with the craft behind 5,000+ videos. Every video is unique and tailored to your channel.",
  },
  {
    icon: Gem,
    k: "THE PROFITS",
    t: "Your producer's cut",
    d: "You choose how net channel profit is split with us: 50%, 30%, 10% or none at all.",
  },
];

export default function ComingSoon() {
  return (
    <section id="coming-soon" className="relative w-full overflow-hidden bg-black px-6 py-24 text-white md:px-16 scroll-mt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(229,9,20,0.32),transparent_70%)]" />
      <div className="film-grain" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_auto]">
        <div>
          <p className="text-xs font-bold tracking-[0.5em] text-gray-400">COMING SOON TO A CHANNEL NEAR YOU</p>
          <h2 className="mt-3 text-6xl uppercase leading-[0.9] md:text-9xl">
            Your own <span className="text-[#e50914]">channel</span>
          </h2>
          <p className="mt-2 text-2xl tracking-wide text-gray-300 md:text-3xl font-[family-name:var(--font-bebas)]">
            A film by you. Produced by A&amp;M.
          </p>
          <p className="mt-5 max-w-xl text-lg text-gray-300">
            We have spent years making other people&apos;s channels impossible to scroll past. Now we will build yours: research, scripts,
            editing, thumbnails, upload and growth, all handled.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l border-[#e50914]/60 pl-4"
              >
                <p.icon className="text-[#e50914]" size={20} />
                <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-gray-500">{p.k}</p>
                <h3 className="text-2xl leading-tight">{p.t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{p.d}</p>
              </motion.div>
            ))}
          </div>

          <a
            href="#channel-plans"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#channel-plans")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-white/80 transition hover:text-white"
          >
            SEE HOW THE DEAL WORKS <ArrowDown size={16} />
          </a>
        </div>

        <div className="mx-auto">
          <div className="relative rounded-[2.5rem] border-[9px] border-neutral-900 bg-neutral-900 shadow-[0_0_90px_rgba(229,9,20,0.5)] ring-1 ring-white/10">
            <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative aspect-[9/16] w-[210px] overflow-hidden rounded-[1.9rem] bg-black sm:w-[250px]">
              <video src="/results/videos/v3.mp4" autoPlay loop muted playsInline preload="metadata" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.25em] text-white">AN A&amp;M EDIT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
