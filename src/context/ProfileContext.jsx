"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const PROFILES = {
  creator: {
    id: "creator",
    name: "Creator",
    color: "bg-[#e50914]",
    tagline: "Edits that make your channel grow.",
    cta: { label: "Browse Services", href: "/shop" },
  },
  agency: {
    id: "agency",
    name: "Agency",
    color: "bg-blue-600",
    tagline: "White-label editing for your clients, delivered on time.",
    cta: { label: "Talk to Us", href: "https://wa.me/916299043460" },
  },
  brand: {
    id: "brand",
    name: "Brand",
    color: "bg-amber-500",
    tagline: "Cinematic video that makes your brand impossible to ignore.",
    cta: { label: "Talk to Us", href: "https://wa.me/916299043460" },
  },
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("am-profile");
    if (saved && PROFILES[saved]) setProfileState(PROFILES[saved]);
    setReady(true);
  }, []);

  const setProfile = (id) => {
    if (id) window.localStorage.setItem("am-profile", id);
    else window.localStorage.removeItem("am-profile");
    setProfileState(id ? PROFILES[id] : null);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, ready }}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
