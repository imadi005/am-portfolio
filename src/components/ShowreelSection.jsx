"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react"; // Added Volume icons

export default function ShowreelSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // New state for mute control

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    // The onPlay/onPause event handlers will update the isPlaying state
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMutedState = !videoRef.current.muted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // --- WHATSAPP LINK SETUP ---
  const whatsappNumber = "916299043460";
  const defaultMessage =
    "Hello A&M Productions, I found your website and I'm interested in your viral edit services. I'd like to get more information on pricing and how to place an order.";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;
  // --- END SETUP ---

  return (
    <section
      id="showreel"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* 🎥 Custom Video Player */}
      <div
        className="relative w-full aspect-video max-h-[85vh] overflow-hidden" // More consistent sizing
        style={{
          boxShadow: "0 -2px 20px rgba(0,0,0,0.9) inset",
          backgroundColor: "#000",
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover block"
          preload="metadata" // Changed to metadata for faster initial load
          playsInline
          loop
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>

        {/* 🖼️ Thumbnail Overlay (appears when paused) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/thumbnails/showreel.jpg"
                alt="Showreel Thumbnail"
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔘 Custom Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110 z-20"
        >
          <AnimatePresence>
            {!isPlaying && ( // Only show the play button when paused
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-black/50 rounded-full p-5 border border-white/30 backdrop-blur-sm"
              >
                <Play size={40} className="ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* 🔈 New Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-30 text-white bg-black/40 p-2 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* ✨ Subtle Red Sweep Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent pointer-events-none"
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* 🩸 Soft Top & Bottom Blends */}
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none"></div>
      </div>

      {/* 🎬 Text Section BELOW the video */}
      <div className="relative z-10 py-16 px-4 text-center text-white bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
        >
          Every Frame Tells a Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-base md:text-xl max-w-2xl mx-auto opacity-85"
        >
          Experience the precision, pace, and passion behind our most viral edits.
        </motion.p>

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 px-8 py-3 bg-red-600 hover:bg-red-700 transition rounded-full text-white font-semibold inline-block"
        >
          Order Now
        </motion.a>
      </div>
    </section>
  );
}

