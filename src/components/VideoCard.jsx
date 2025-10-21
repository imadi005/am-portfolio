"use client";
import { motion } from "framer-motion";

export default function VideoCard({ video }) {
  if (!video || !video.url) return null;

  // Extract YouTube video ID from both youtu.be and youtube.com links
  const videoIdMatch =
    video.url.match(/v=([^&]+)/) ||
    video.url.match(/youtu\.be\/([^?]+)/);

  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  // Generate YouTube thumbnail URL safely
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/fallback.jpg"; // optional fallback

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        whileHover={{ scale: 1.12, zIndex: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-[260px] h-[150px] rounded-lg overflow-hidden cursor-pointer group"
      >
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-sm font-semibold line-clamp-2">
            {video.title || "Untitled Video"}
          </h3>
        </div>
      </motion.div>
    </a>
  );
}
 