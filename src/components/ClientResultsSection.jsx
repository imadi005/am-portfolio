"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function ClientResultsSection() {
  const [views, setViews] = useState(112168912);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState([]);

  // Client-side render check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Floating red particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const count = 25;
    const arr = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.8,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 4,
    }));
    setParticles(arr);
  }, []);

  // Persistent view counter using localStorage
  useEffect(() => {
    if (!isClient) return;
    const saved = localStorage.getItem("totalViews");
    if (saved) setViews(parseInt(saved, 10));

    const interval = setInterval(() => {
      setViews((v) => {
        const newVal = v + Math.floor(Math.random() * 3 + 2);
        localStorage.setItem("totalViews", String(newVal));
        return newVal;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isClient]);

  const stats = [
    { label: "Videos Produced", value: "5000+", color: "text-red-500" },
    {
      label: "Total Views",
      value: isClient ? views.toLocaleString("en-US") : "112,168,912",
      color: "text-white",
    },
    { label: "Average View Duration", value: "60-70%", color: "text-red-400" },
    { label: "CTR", value: "10%+", color: "text-white" },
    { label: "Revenue Generated", value: "$1,000,000+", color: "text-green-400" },
    { label: "Channels Managed", value: "170+", color: "text-red-300" },
  ];

  return (
    <section id="results" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#120000] to-black overflow-hidden text-white">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.08),_transparent_80%)]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {isClient && particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-red-500/70"
          style={{ left: p.x, top: p.y, opacity: p.opacity }}
          animate={{ y: [p.y, p.y - 200], opacity: [p.opacity, 0.3, p.opacity] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-wide px-4"
      >
        Results That Speak Louder Than Words
      </motion.h2>

      {/* Animated Subtext */}
      <AnimatedSubtext text="Our edits don’t just go viral — they build empires, audiences, and revenue streams." />

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-10 md:px-24 text-center mt-10">
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
            <h3
              className={`text-xl sm:text-3xl md:text-5xl font-bold mb-2 whitespace-nowrap ${stat.color}`}
              style={{ textShadow: "0 0 20px rgba(255,0,0,0.3)" }}
            >
              {stat.label === "Total Views" ? (
                  stat.value
              ) : typeof stat.value === "number" && isClient ? (
                <CountUp end={stat.value} duration={2.5} separator="," />
              ) : (
                stat.value
              )}
            </h3>
            <p className="text-gray-400 font-medium text-xs md:text-base uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-700/60 to-transparent blur-[2px]" />
      <ResultsShowreel />
      <VideoShowreel />
      <TestimonialsSection />
    </section>
  );
}

function AnimatedSubtext({ text }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
      }}
      viewport={{ once: true }}
      className="relative z-10 max-w-3xl mx-auto text-center text-base md:text-xl text-gray-300 leading-relaxed mb-12 md:mb-16 px-4"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

function ResultsShowreel() {
  const [isPaused, setIsPaused] = useState(false);
  const items = Array.from({ length: 17 }).map((_, i) => ({
    type: "image",
    src: `/results/r${i + 1}.jpeg`,
  }));

  return (
    <div className="relative w-full overflow-hidden mt-16">
      <motion.div
        className="flex gap-4 md:gap-5 px-4 md:px-6 py-6 w-max items-center"
        animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-xl w-[240px] h-[135px] sm:w-[300px] sm:h-[170px] md:w-[350px] md:h-[200px] bg-black flex-shrink-0 cursor-pointer border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-all duration-300"
          >
            <img
              src={item.src}
              alt={`Result ${i + 1}`}
              className="w-full h-full object-contain rounded-xl p-2"
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
    </div>
  );
}

function VideoShowreel() {
  const [isPaused, setIsPaused] = useState(false);
  const videos = Array.from({ length: 10 }).map((_, i) => ({
    src: `/results/videos/v${i + 1}.mp4`,
  }));

  return (
    <div className="relative w-full overflow-hidden mt-12 md:mt-20 pb-10">
      <motion.div
        className="flex gap-4 md:gap-8 px-4 md:px-10 py-6 w-max items-center"
        animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...videos, ...videos].map((vid, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-xl w-[160px] h-[284px] sm:w-[200px] sm:h-[355px] md:w-[260px] md:h-[462px] bg-black flex-shrink-0 cursor-pointer border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-all duration-300"
          >
            <video
              src={vid.src}
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center rounded-xl"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
    </div>
  );
}

function TestimonialsSection() {
  const [playing, setPlaying] = useState(null);

  const testimonials = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    src: `/results/testimonials/t${i + 1}.mp4`,
  }));

  const handlePlayPause = (id) => {
    const video = document.getElementById(`testimonial-${id}`);
    if (!video) return;

    if (playing === id) {
      video.pause();
      setPlaying(null);
    } else {
      // Mute and pause all other videos
      document.querySelectorAll(".testimonial-video").forEach((v) => {
        v.pause();
        v.muted = true;
      });

      // Unmute and play the selected video
      video.muted = false;
      video.play();
      setPlaying(id);
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#1a0000] to-black overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.08),_transparent_85%)]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wide mb-8 md:mb-12 relative z-10 px-4"
        style={{ textShadow: "0 0 25px rgba(255,0,0,0.6)" }}
      >
        Voices That Define Our Impact
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto text-base md:text-lg text-gray-300 mb-12 md:mb-20 leading-relaxed px-4"
      >
        These are not just testimonials — they are stories of growth, transformation, and creative power.
      </motion.p>
      <div className="flex justify-center flex-wrap gap-6 md:gap-10 px-4 md:px-20 relative z-10">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden w-[200px] h-[355px] sm:w-[240px] sm:h-[426px] md:w-[280px] md:h-[497px] border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)] bg-black flex-shrink-0"
          >
            <video
              id={`testimonial-${item.id}`}
              src={item.src}
              className="testimonial-video w-full h-full object-cover" // FIX: Removed rounded-xl
              playsInline
              loop
            />
            <button
              onClick={() => handlePlayPause(item.id)}
              className="absolute bottom-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full border border-red-400 hover:border-white transition"
            >
              {playing === item.id ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
    </section>
  );
}

