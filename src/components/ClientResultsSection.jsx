"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Helper Hook to Generate Poster ---
function useAutoPoster(videoSrc) {
  const [poster, setPoster] = useState(null);
  useEffect(() => {
    if (!videoSrc || typeof window === "undefined") return;
    let isMounted = true;
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const captureFrame = () => {
      if (!isMounted || video.videoWidth === 0 || video.videoHeight === 0) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        cleanupListeners();
        return;
      }
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        if (isMounted) setPoster(dataUrl);
      } catch (error) {
        console.error("Error generating poster:", error, videoSrc);
      }
      cleanupListeners();
    };

    const handleError = (e) => {
      console.error("Error loading video metadata for poster:", e, videoSrc);
      cleanupListeners();
    };

    const onLoadedData = () => {
      if (isMounted && video.readyState >= 1) {
        try {
          video.currentTime = 0.1;
        } catch (e) {
          console.error("Error seeking video for poster:", e, videoSrc);
          cleanupListeners();
        }
      }
    };

    const cleanupListeners = () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", captureFrame);
      video.removeEventListener("error", handleError);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", captureFrame, { once: true });
    video.addEventListener("error", handleError);
    video.load();

    return () => {
      isMounted = false;
      cleanupListeners();
      video.src = "";
      video.load();
    };
  }, [videoSrc]);
  return poster;
}

// --- MAIN COMPONENT ---
export default function ClientResultsSection() {
  const [views, setViews] = useState(112168912);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
  }, []);

  const stats = [
    { label: "Videos Produced", value: "5000+", color: "text-red-500" },
    { label: "Total Views", value: isClient ? views.toLocaleString("en-US") : "...", color: "text-white" },
    { label: "Average View Duration", value: "60-70%", color: "text-red-400" },
    { label: "CTR", value: "10%+", color: "text-white" },
    { label: "Revenue Generated", value: "$1,000,000+", color: "text-green-400" },
    { label: "Channels Managed", value: "170+", color: "text-red-300" },
  ];

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#120000] to-black overflow-hidden text-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-wide px-4"
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
              {stat.label === "Total Views" ? (
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

      <ResultsShowreel />
      <VideoShowreel />
      <TestimonialsSection />
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

// --- UNIVERSAL SCROLL/DRAG HOOK ---
function useAutoscrollAndDrag(railRef) {
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame;

    const loop = () => {
      if (!isHovering.current && !isDragging.current && document.visibilityState === "visible") {
        rail.scrollLeft += 1;
        if (rail.scrollLeft >= rail.scrollWidth / 2) rail.scrollLeft = 0;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onStart = (e) => {
      isDragging.current = true;
      dragState.current.startX = e.touches ? e.touches[0].pageX : e.pageX;
      dragState.current.scrollLeft = rail.scrollLeft;
      rail.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.touches ? e.touches[0].pageX : e.pageX;
      const walk = (x - dragState.current.startX) * 1.5;
      rail.scrollLeft = dragState.current.scrollLeft - walk;
    };

    const onEnd = () => {
      isDragging.current = false;
      rail.style.cursor = "grab";
    };

    rail.addEventListener("mousedown", onStart);
    rail.addEventListener("mousemove", onMove);
    rail.addEventListener("mouseup", onEnd);
    rail.addEventListener("mouseleave", onEnd);

    rail.addEventListener("touchstart", onStart, { passive: true });
    rail.addEventListener("touchmove", onMove, { passive: false });
    rail.addEventListener("touchend", onEnd);

    return () => {
      rail.removeEventListener("mousedown", onStart);
      rail.removeEventListener("mousemove", onMove);
      rail.removeEventListener("mouseup", onEnd);
      rail.removeEventListener("mouseleave", onEnd);
      rail.removeEventListener("touchstart", onStart);
      rail.removeEventListener("touchmove", onMove);
      rail.removeEventListener("touchend", onEnd);
    };
  }, []);

  return { isHovering };
}

// --- FIXED IMAGE SLIDER ---
function ResultsShowreel() {
  const railRef = useRef(null);
  const { isHovering } = useAutoscrollAndDrag(railRef);

  const scroll = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const items = Array.from({ length: 17 }).map((_, i) => `/results/r${i + 1}.jpeg`);

  return (
    <div
      className="relative w-full mt-16 overflow-hidden"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        ref={railRef}
        className="flex gap-4 px-6 py-6 overflow-x-scroll no-scrollbar cursor-grab"
        style={{ scrollBehavior: "smooth" }}
      >
        {[...items, ...items].map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-red-500/40 shadow-[0_0_20px_rgba(255,0,0,0.5)] w-[300px] h-[170px] object-contain bg-black flex-shrink-0"
          />
        ))}
      </div>

      <div className="hidden md:flex absolute inset-y-0 justify-between items-center w-full px-4 pointer-events-none">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-black/60 rounded-full pointer-events-auto hover:bg-red-600 transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-black/60 rounded-full pointer-events-auto hover:bg-red-600 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

// --- FIXED VIDEO SLIDER ---
function VideoShowreel() {
  const railRef = useRef(null);
  const { isHovering } = useAutoscrollAndDrag(railRef);

  const scroll = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const videos = Array.from({ length: 10 }).map((_, i) => `/results/videos/v${i + 1}.mp4`);

  return (
    <div
      className="relative w-full mt-16 overflow-hidden"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        ref={railRef}
        className="flex gap-6 px-6 py-6 overflow-x-scroll no-scrollbar cursor-grab"
        style={{ scrollBehavior: "smooth" }}
      >
        {[...videos, ...videos].map((src, i) => (
          <motion.video
            key={i}
            src={src}
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
            className="rounded-xl w-[240px] h-[430px] object-cover border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.4)]"
          />
        ))}
      </div>

      <div className="hidden md:flex absolute inset-y-0 justify-between items-center w-full px-4 pointer-events-none">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-black/60 rounded-full pointer-events-auto hover:bg-red-600 transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-black/60 rounded-full pointer-events-auto hover:bg-red-600 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

// --- TESTIMONIALS ---
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
      document.querySelectorAll(".testimonial-video").forEach((v) => {
        v.pause();
        v.muted = true;
      });
      video.muted = false;
      video.play();
      setPlaying(id);
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#1a0000] to-black overflow-hidden text-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wide mb-8 md:mb-12"
      >
        Voices That Define Our Impact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto text-base md:text-lg text-gray-300 mb-12 md:mb-20"
      >
        These are not just testimonials — they are stories of growth, transformation, and creative power.
      </motion.p>

      <div className="flex justify-center flex-wrap gap-8 px-6 md:px-20">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden w-[240px] h-[420px] border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)] bg-black"
          >
            <video
              id={`testimonial-${item.id}`}
              src={item.src}
              className="testimonial-video w-full h-full object-cover"
              playsInline
              loop
              preload="metadata"
            />
            <button
              onClick={() => handlePlayPause(item.id)}
              className="absolute bottom-4 right-4 p-3 bg-black/60 rounded-full border border-red-400 hover:border-white"
            >
              {playing === item.id ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
