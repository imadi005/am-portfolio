"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ResultsGallery from "./ResultsGallery";
import ReelStage from "./ReelStage";
import ClientStories from "./ClientStories";

// --- MAIN COMPONENT ---
export default function ClientResultsSection() {
  const stats = [
    { label: "Videos Produced", value: "5000+", color: "text-red-500" },
    { label: "Total Views", value: "110000000+", color: "text-white" },
    { label: "Average View Duration", value: "60-70%", color: "text-red-400" },
    { label: "CTR", value: "10%+", color: "text-white" },
    { label: "Revenue Generated", value: "$1,000,000+", color: "text-green-400" },
    { label: "Channels Managed", value: "170+", color: "text-red-300" },
  ];

  return (
    <section id="results" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#120000] to-black overflow-hidden text-white scroll-mt-16">
      <p className="px-4 text-center text-xs font-bold tracking-[0.35em] text-[#e50914]">THE PROOF</p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-6 mt-1 px-4 text-center text-5xl uppercase md:text-7xl"
      >
        Results That Speak Louder Than Words
      </motion.h2>

      <AnimatedSubtext text="Our edits don’t just go viral — they build empires, audiences, and revenue streams." />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-10 md:px-24 text-center mt-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="p-4 md:p-6 rounded-xl bg-black/40 border border-red-900/30 backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,0,0.15)] hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition"
          >
            <h3 className={`text-xl sm:text-3xl md:text-5xl font-bold mb-2 whitespace-nowrap ${stat.color}`}>
              {!/^\$?[\d,]+\+?$/.test(stat.value) ? (
                stat.value
              ) : (
                <CountUp
                  end={parseInt(stat.value.replace(/\D/g, ""))}
                  duration={2.5}
                  separator=","
                  suffix={stat.value.includes("+") ? "+" : ""}
                  prefix={stat.value.includes("$") ? "$" : ""}
                />
              )}
            </h3>
            <p className="text-gray-400 font-medium text-xs md:text-base uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-700/60 to-transparent blur-[2px]" />

      <ResultsGallery />
      <ReelStage />
      <ClientStories />

      <div className="relative mt-4 px-6 text-center">
        <h3 className="text-4xl md:text-6xl">Want your name on the next poster?</h3>
        <p className="mx-auto mt-2 max-w-xl text-gray-400">Start with a single feature, or let us produce the whole channel for you.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#packages"
            className="rounded-md bg-[#e50914] px-8 py-3 font-bold text-white shadow-[0_0_25px_rgba(229,9,20,0.5)] transition hover:bg-[#b20710]"
          >
            Get a ticket
          </a>
          <a href="#channel-plans" className="rounded-md bg-white px-8 py-3 font-bold text-black transition hover:bg-white/80">
            Make the studio deal
          </a>
        </div>
      </div>
    </section>
  );
}

// --- SUBTEXT ---
function AnimatedSubtext({ text }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center text-base md:text-xl text-gray-300 leading-relaxed mb-12 md:mb-16 px-4"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
