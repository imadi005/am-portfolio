"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ListContext = createContext(null);

export function ListProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setIds(JSON.parse(window.localStorage.getItem("my-list") || "[]"));
    } catch {
      setIds([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("my-list", JSON.stringify(ids));
  }, [ids, hydrated]);

  const has = (id) => ids.includes(id);
  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return <ListContext.Provider value={{ ids, has, toggle }}>{children}</ListContext.Provider>;
}

export function useMyList() {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("useMyList must be used within ListProvider");
  return ctx;
}
