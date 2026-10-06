"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };
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
        ref={videoRef}
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

      <div className="absolute bottom-24 right-0 z-20 hidden items-center gap-3 md:flex">
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute trailer" : "Mute trailer"}
          className="rounded-full border border-white/60 p-3 text-white transition hover:bg-white/20"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <span className="border-l-4 border-[#e50914] bg-black/50 py-2 pl-3 pr-8 text-sm text-gray-200">
          Now playing: A&amp;M Reel
        </span>
      </div>

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
            <span className="text-gray-300">Since 2021</span>
            <span className="text-gray-300">5000+ Edits</span>
            <span className="border border-gray-500 px-1.5 text-xs text-gray-300">4K</span>
          </div>

          <p className="mt-4 max-w-xl text-base md:text-xl text-gray-200">
            Edits that make your channel grow. 170+ channels, 110M+ views and counting.
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
