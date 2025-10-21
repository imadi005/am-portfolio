"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicBridge() {
  const [particles, setParticles] = useState([]);

  // ✅ Generate particles only after client-side render
  useEffect(() => {
    const count = 25;
    const arr = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.8,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
    }));
    setParticles(arr);
  }, []);

  return (
    <section className="relative w-full h-[15vh] overflow-hidden bg-black flex items-center justify-center mt-[-1px]">
      {/* ✨ Background Gradient (deep black to soft dark red glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#120000] to-black opacity-95" />

      {/* 🔴 Subtle Red Energy Wave (not a border) */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.15),_transparent_60%)]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌌 Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-red-600/70"
          style={{ left: p.x, top: p.y, opacity: p.opacity }}
          animate={{ y: [p.y, p.y - 200], opacity: [p.opacity, 0.2, p.opacity] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* 🩸 Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-2xl md:text-4xl font-semibold text-white tracking-wide text-center"
      >
        The Pulse of Creation ⚡
      </motion.h2>

      {/* 🌑 Bottom Black Blend (removes red line and merges with next section) */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none" />
    </section>
  );
}
