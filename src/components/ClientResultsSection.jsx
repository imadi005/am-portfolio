"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Helper Hook to Generate Poster ---
function useAutoPoster(videoSrc) {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (!videoSrc || typeof window === 'undefined') return;

    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = "anonymous"; // Important if video is hosted elsewhere, less critical for local files
    video.preload = 'metadata';
    video.muted = true; // Required for potential autoplay/seeking
    video.playsInline = true; // Important for iOS

    const captureFrame = () => {
      // Ensure video has dimensions before drawing
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("Video dimensions not ready for poster generation:", videoSrc);
        return; // Wait for dimensions
      }

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      // Check if context exists
      if (!ctx) {
         console.error("Could not get 2D context for canvas.");
         return;
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG for smaller size
        setPoster(dataUrl);
      } catch (error) {
        console.error("Error generating poster from canvas:", error, videoSrc);
        // Fallback or handle error (e.g., set a default poster)
      }

      // Clean up event listeners
      video.removeEventListener('seeked', captureFrame);
      video.removeEventListener('error', handleError);
    };

    const handleError = (e) => {
        console.error("Error loading video metadata for poster:", e, videoSrc);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('seeked', captureFrame);
        video.removeEventListener('error', handleError);
    }

    const onLoadedData = () => {
        // Seek slightly after the beginning to ensure a frame is available
        video.currentTime = 0.1;
    };


    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('seeked', captureFrame, { once: true }); // Use once option for seeked
    video.addEventListener('error', handleError);


    // Start loading metadata
    video.load();

    // Cleanup function
    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('seeked', captureFrame);
      video.removeEventListener('error', handleError);
      // Optional: Revoke object URL if created, clear src
      video.src = "";
      video.removeAttribute("src"); // Try removing attribute too
      video.load(); // Request browser stop loading
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
    {
      label: "Total Views",
      value: isClient ? views.toLocaleString("en-US") : "...",
      color: "text-white",
    },
    { label: "Average View Duration", value: "60-70%", color: "text-red-400" },
    { label: "CTR", value: "10%+", color: "text-white" },
    { label: "Revenue Generated", value: "$1,000,000+", color: "text-green-400" },
    { label: "Channels Managed", value: "170+", color: "text-red-300" },
  ];

  return (
    <section id="results" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#120000] to-black overflow-hidden text-white">
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
              {stat.label === "Total Views"
                ? stat.value
                : typeof parseInt(stat.value.replace(/\D/g,'')) === 'number' && isClient
                ? <CountUp
                    end={parseInt(stat.value.replace(/\D/g,''))}
                    duration={2.5}
                    separator=","
                    suffix={stat.value.includes('+') ? '+' : ''}
                    prefix={stat.value.includes('$') ? '$' : ''}
                  />
                : stat.value
              }
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


// --- SUB-COMPONENTS ---

function AnimatedSubtext({ text }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
      viewport={{ once: true }}
      className="relative z-10 max-w-3xl mx-auto text-center text-base md:text-xl text-gray-300 leading-relaxed mb-12 md:mb-16 px-4"
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

function ResultsShowreel() {
  const railRef = useRef(null);
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const dragState = useRef({ startX: 0, startLeft: 0 });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const tick = () => {
      if (!isHovering.current && !isDragging.current) {
        rail.scrollLeft += 0.7;
        if (rail.scrollLeft >= rail.scrollWidth / 2) {
          rail.scrollLeft = 0;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleManualScroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const scrollAmount = rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onStart = (e) => {
      isDragging.current = true;
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      dragState.current.startX = pageX;
      dragState.current.startLeft = rail.scrollLeft;
      rail.style.scrollBehavior = 'auto';
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      const dx = pageX - dragState.current.startX;
      rail.scrollLeft = dragState.current.startLeft - dx * 1.5;
    };
    const onEnd = () => {
      isDragging.current = false;
      rail.style.scrollBehavior = 'smooth';
    };

    rail.addEventListener("mousedown", onStart);
    rail.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    return () => {
      rail.removeEventListener("mousedown", onStart);
      rail.removeEventListener("touchstart", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  const items = Array.from({ length: 17 }).map((_, i) => ({ src: `/results/r${i + 1}.jpeg` }));

  return (
    <div
      className="relative w-full overflow-hidden mt-16"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        ref={railRef}
        className="flex gap-4 md:gap-5 px-4 md:px-6 py-6 w-max items-center cursor-grab active:cursor-grabbing no-scrollbar"
        style={{ overflowX: "scroll", scrollBehavior: 'smooth' }}
      >
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-xl w-[240px] h-[135px] sm:w-[300px] sm:h-[170px] md:w-[350px] md:h-[200px] bg-black flex-shrink-0 border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)]"
          >
            <img src={item.src} alt={`Result ${i + 1}`} className="w-full h-full object-contain rounded-xl p-2"/>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      {/* Buttons */}
      <div className="hidden md:flex justify-between absolute top-1/2 left-4 right-4 -translate-y-1/2">
        <button onClick={() => handleManualScroll('left')} className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition"><ChevronLeft /></button>
        <button onClick={() => handleManualScroll('right')} className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition"><ChevronRight /></button>
      </div>
    </div>
  );
}

// --- Component to render individual video with auto poster ---
function VideoItem({ videoData, uniqueKey }) {
  const poster = useAutoPoster(videoData.src); // Generate poster

  return (
    <motion.div
      key={uniqueKey} // Use unique key provided by parent
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl w-[160px] h-[284px] sm:w-[200px] sm:h-[355px] md:w-[260px] md:h-[462px] bg-black flex-shrink-0 border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)]"
    >
      <video
        src={videoData.src}
        poster={poster || ''} // Use generated poster, fallback to empty string
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-center rounded-xl"
        onMouseEnter={(e) => e.target.play()}
        onMouseLeave={(e) => e.target.pause()}
        preload="metadata"
      />
    </motion.div>
  );
}

function VideoShowreel() {
  const railRef = useRef(null);
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const dragState = useRef({ startX: 0, startLeft: 0 });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const tick = () => {
      if (!isHovering.current && !isDragging.current) {
        rail.scrollLeft += 0.7;
        if (rail.scrollLeft >= rail.scrollWidth / 2) {
          rail.scrollLeft = 0;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleManualScroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const scrollAmount = rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onStart = (e) => {
      isDragging.current = true;
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      dragState.current.startX = pageX;
      dragState.current.startLeft = rail.scrollLeft;
      rail.style.scrollBehavior = 'auto';
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      const dx = pageX - dragState.current.startX;
      rail.scrollLeft = dragState.current.startLeft - dx * 1.5;
    };
    const onEnd = () => {
      isDragging.current = false;
      rail.style.scrollBehavior = 'smooth';
    };
    rail.addEventListener("mousedown", onStart);
    rail.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
    return () => {
      rail.removeEventListener("mousedown", onStart);
      rail.removeEventListener("touchstart", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  const videos = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    src: `/results/videos/v${i + 1}.mp4`,
  }));

  return (
    <div
      className="relative w-full overflow-hidden mt-12 md:mt-20 pb-10"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div
        ref={railRef}
        className="flex gap-4 md:gap-8 px-4 md:px-10 py-6 w-max items-center cursor-grab active:cursor-grabbing no-scrollbar"
        style={{ overflowX: "scroll", scrollBehavior: 'smooth' }}
      >
        {/* Render duplicated list using VideoItem component */}
        {[...videos, ...videos].map((vid, i) => (
          <VideoItem key={`${vid.id}-${i}`} videoData={vid} uniqueKey={`${vid.id}-${i}`} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
      {/* Buttons */}
      <div className="hidden md:flex justify-between absolute top-1/2 left-4 right-4 -translate-y-1/2">
        <button onClick={() => handleManualScroll('left')} className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition"><ChevronLeft /></button>
        <button onClick={() => handleManualScroll('right')} className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition"><ChevronRight /></button>
      </div>
    </div>
  );
}


// --- Component to render individual testimonial video with auto poster ---
function TestimonialItem({ item, playing, handlePlayPause, uniqueKey }) {
    const poster = useAutoPoster(item.src); // Generate poster

    return (
        <motion.div
            key={uniqueKey} // Use unique key provided by parent
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden w-[200px] h-[355px] sm:w-[240px] sm:h-[426px] md:w-[280px] md:h-[497px] border border-red-500/40 shadow-[0_0_25px_rgba(255,0,0,0.5)] bg-black flex-shrink-0"
        >
            <video
                id={`testimonial-${item.id}`}
                src={item.src}
                poster={poster || ''} // Use generated poster
                className="testimonial-video w-full h-full object-cover"
                playsInline
                loop
                preload="metadata"
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
      document.querySelectorAll(".testimonial-video").forEach((v) => { v.pause(); v.muted = true; });
      video.muted = false;
      video.play();
      setPlaying(id);
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-black via-[#1a0000] to-black overflow-hidden text-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wide mb-8 md:mb-12 relative z-10 px-4"
        style={{ textShadow: "0 0 25px rgba(255,0,0,0.6)" }}
      >
        Voices That Define Our Impact
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto text-base md:text-lg text-gray-300 mb-12 md:mb-20 leading-relaxed px-4"
      >
        These are not just testimonials — they are stories of growth, transformation, and creative power.
      </motion.p>
      <div className="flex justify-center flex-wrap gap-6 md:gap-10 px-4 md:px-20 relative z-10">
        {/* Render using TestimonialItem component */}
        {testimonials.map((item) => (
            <TestimonialItem
                key={item.id}
                item={item}
                playing={playing}
                handlePlayPause={handlePlayPause}
                uniqueKey={item.id} // Pass unique key
            />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
    </section>
  );
}

