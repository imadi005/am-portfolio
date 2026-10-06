"use client";

import { useEffect, useMemo, useState } from "react";
import VideoTheatre from "./VideoTheatre";

export default function NicheModal({ niche, open, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (open) setActiveIndex(0);
  }, [open, niche]);

  const items = useMemo(
    () =>
      (niche?.videos || []).map((v, i) => ({
        id: v.id,
        title: v.title || `${niche.title} · Part ${i + 1}`,
      })),
    [niche]
  );

  if (!niche || items.length === 0) return null;
  const current = items[Math.min(activeIndex, items.length - 1)];

  return (
    <VideoTheatre
      open={open}
      onClose={onClose}
      eyebrow={niche.tagline ? niche.tagline.toUpperCase() : "NICHE"}
      title={niche.title}
      description={niche.description}
      tags={niche.tags}
      videoId={current.id}
      items={items}
      activeIndex={activeIndex}
      onSelect={setActiveIndex}
      listTitle="More in this niche"
    />
  );
}
