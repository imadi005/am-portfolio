"use client";

import SearchOverlay from "./SearchOverlay";
import BottomNav from "./BottomNav";
import CartPill from "./CartPill";

export default function AppChrome() {
  return (
    <>
      <SearchOverlay />
      <BottomNav />
      <CartPill />
    </>
  );
}
