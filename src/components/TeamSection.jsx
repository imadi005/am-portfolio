"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Aditya",
    role: "Founder & CEO",
    photo: "/team/aditya.jpg",
    bio: [
      "I started A&M Productions in 2021 with one belief: YouTube content deserves the same craft as cinema. What began as a small creative team is now a studio trusted by 170+ channels.",
      "I am a perfectionist, and I make no apology for it. Every cut, every transition, every second of pacing is checked until it earns its place. If a frame does not make the viewer stay, it does not ship.",
      "My vision is simple: to build the most respected name in YouTube production, where creators come not just for edits, but for a legacy they are proud to put their name on.",
    ],
    stats: [
      { value: "2021", label: "Founded" },
      { value: "170+", label: "Channels" },
      { value: "5000+", label: "Videos" },
    ],
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full bg-black px-6 py-24 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE CAST &amp; CREW</p>
        <h2 className="mt-2 text-4xl uppercase md:text-6xl">Meet the Team</h2>

        {TEAM.map((m) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 grid items-center gap-10 md:grid-cols-[320px_1fr]"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-lg border border-white/10 shadow-[0_0_40px_rgba(229,9,20,0.25)]">
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="320px"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div>
              <h3 className="text-5xl md:text-6xl">{m.name}</h3>
              <p className="mt-1 text-lg font-semibold text-[#e50914]">{m.role}</p>
              <div className="mt-5 max-w-xl space-y-4 text-lg leading-relaxed text-gray-300">
                {m.bio.map((para) => (
                  <p key={para.slice(0, 20)}>{para}</p>
                ))}
              </div>
              <div className="mt-8 flex gap-8">
                {m.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-4xl text-white font-[family-name:var(--font-bebas)]">{s.value}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
