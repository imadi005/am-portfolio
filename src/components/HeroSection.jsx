"use client";
import { motion } from "framer-motion";
import { FaPlay, FaChartBar, FaCompass } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 35 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 15}s`,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    // This effect is for desktop parallax and can be disabled on mobile if desired
    if (window.innerWidth < 768) return;

    const hero = document.querySelector("section#home");
    if (!hero) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // --- WHATSAPP LINK SETUP ---
  const whatsappNumber = "916299043460"; // Your number without '+'
  const defaultMessage =
    "Hello A&M Productions, I found your website and I'm interested in your viral edit services. I'd like to get more information on pricing and how to place an order.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;
  // --- END SETUP ---

  // --- SMOOTH SCROLL HANDLER ---
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  // --- END HANDLER ---

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center text-white bg-black px-4"
    >
      {/* 🎥 Background Video */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 🖤 Black Overlay (readability) */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* 🎬 Background Visual Effects */}
      <div className="absolute inset-0 overflow-hidden z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#190000_0%,#000_70%)] animate-backgroundPulse opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(229,9,20,0.08),transparent_70%)] animate-fogDrift mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(229,9,20,0.05),transparent_70%)] animate-fogDriftSlow mix-blend-overlay"></div>
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-neutral-400 rounded-full animate-particle"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,transparent_30%,rgba(255,255,255,0.03)_60%,transparent_100%)] animate-lightRay pointer-events-none mix-blend-screen" />
        <div className="film-grain"></div>
      </div>

      {/* 🟥 Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-30 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-[#e50914] glow-text"
      >
        A&M PRODUCTIONS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="z-30 mt-4 text-base md:text-xl max-w-2xl font-medium text-gray-300"
      >
        Producing viral edits that dominate the algorithm.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="z-30 mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-xs sm:max-w-none"
      >
        {/* --- WHATSAPP BUTTON --- */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-full bg-[#e50914] text-white font-semibold btn-glow hover:bg-[#b20710] transition-all"
        >
          <FaPlay />
          Order Now
        </a>
        
        {/* --- VIEW RESULTS BUTTON --- */}
        <a
          href="#results"
          onClick={(e) => handleScroll(e, "#results")}
          className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-full border border-[#e50914] text-[#e50914] font-semibold transition-all duration-300 hover:bg-[#e50914] hover:text-white"
        >
          <FaChartBar />
          View Results
        </a>
        
        {/* --- EXPLORE NICHES BUTTON --- */}
        <a
          href="#niches"
          onClick={(e) => handleScroll(e, "#niches")}
          className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-semibold transition-all duration-300 hover:bg-gray-800"
        >
          <FaCompass />
          Explore Our Work
        </a>
      </motion.div>
    </section>
  );
}
