"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import YouTube from "react-youtube";
import { useEffect, useRef } from "react";

export default function EditModal({ edit, open, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target))
      onClose();
  };

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1, controls: 1 },
  };

  return (
    <AnimatePresence>
      {open && edit && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-lg flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-[95vw] h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.5)] bg-gradient-to-b from-zinc-900 to-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 rounded-full p-2 z-50"
            >
              <X size={20} />
            </button>

            {/* Video */}
            <div className="relative w-full h-[70%] bg-black">
              <YouTube
                videoId={edit.youtubeId}
                opts={opts}
                className="w-full h-full"
              />
            </div>

            {/* Details */}
            <div className="p-6 space-y-3 overflow-y-auto h-[30%] scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-700">
              <h2 className="text-2xl font-bold text-white">
                #{edit.rank} — {edit.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {edit.description}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${edit.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 rounded-md bg-[#e50914] px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-all"
              >
                Watch on YouTube
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}