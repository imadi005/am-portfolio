"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

export default function HeroSection() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-end md:items-center overflow-hidden bg-black text-white"
    >
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Netflix-style scrims: left for text legibility, bottom to blend into rows */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-transparent h-40" />
      <div className="film-grain z-10" />

      <div className="relative z-20 w-full px-6 md:px-16 pb-24 md:pb-0 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span className="text-xs md:text-sm font-bold tracking-[0.35em] text-gray-300">
              A&M ORIGINAL
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] tracking-tight uppercase">
            A&M
            <br />
            <span className="text-[#e50914]">Productions</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm md:text-base font-semibold">
            <span className="text-green-400">Top Rated</span>
            <span className="text-gray-300">3+ Years</span>
            <span className="text-gray-300">5000+ Edits</span>
            <span className="border border-gray-500 px-1.5 text-xs text-gray-300">4K</span>
          </div>

          <p className="mt-4 max-w-xl text-base md:text-xl text-gray-200">
            Cinematic YouTube edits engineered to hold attention. 170+ channels, 110M+ views and
            counting.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#showreel"
              onClick={(e) => handleScroll(e, "#showreel")}
              className="flex items-center justify-center gap-3 rounded-md bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-white/80"
            >
              <FaPlay /> Watch Showreel
            </a>
            <Link
              href="/shop"
              className="flex items-center justify-center gap-3 rounded-md bg-gray-500/60 px-8 py-3 text-lg font-bold text-white backdrop-blur transition hover:bg-gray-500/40"
            >
              <FaInfoCircle /> Browse Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
