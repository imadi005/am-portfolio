"use client";

import ProfileGate from "./ProfileGate";
import SearchOverlay from "./SearchOverlay";
import BottomNav from "./BottomNav";

export default function AppChrome() {
  return (
    <>
      <ProfileGate />
      <SearchOverlay />
      <BottomNav />
    </>
  );
}
