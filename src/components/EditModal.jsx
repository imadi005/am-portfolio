"use client";

import { useMemo } from "react";
import VideoTheatre from "./VideoTheatre";
import { TOP_EDITS } from "../data/topEdits";

export default function EditModal({ edit, open, onClose, onSelect }) {
  const items = useMemo(
    () => TOP_EDITS.map((e) => ({ id: e.youtubeId, title: e.title })),
    []
  );
  if (!edit) return null;

  return (
    <VideoTheatre
      open={open}
      onClose={onClose}
      eyebrow={`TOP 10 · #${edit.rank}`}
      title={edit.title}
      description={edit.description}
      videoId={edit.youtubeId}
      items={items}
      activeIndex={edit.rank - 1}
      onSelect={onSelect}
      listTitle="The Top 10"
    />
  );
}
