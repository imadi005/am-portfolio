"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CurrencyContext = createContext(null);

// Fallback rate used only if the live FX API is unreachable.
const FALLBACK_USD_TO_INR = 88.5;
const REFRESH_MS = 10 * 60 * 1000; // refresh every 10 minutes

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(FALLBACK_USD_TO_INR); // 1 USD = rate INR
  const [rateUpdatedAt, setRateUpdatedAt] = useState(null);
  const [rateError, setRateError] = useState(false);

  const fetchRate = useCallback(async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");
      if (!res.ok) throw new Error("FX request failed");
      const data = await res.json();
      const liveRate = data?.rates?.INR;
      if (liveRate) {
        setRate(liveRate);
        setRateUpdatedAt(new Date());
        setRateError(false);
      } else {
        throw new Error("Missing INR rate in response");
      }
    } catch (err) {
      setRateError(true);
    }
  }, []);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("currency") : null;
    if (stored === "USD" || stored === "INR") setCurrency(stored);

    fetchRate();
    const interval = setInterval(fetchRate, REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchRate]);

  const changeCurrency = (next) => {
    setCurrency(next);
    if (typeof window !== "undefined") window.localStorage.setItem("currency", next);
  };

  const convert = (usdAmount) => {
    if (currency === "INR") return usdAmount * rate;
    return usdAmount;
  };

  const format = (usdAmount) => {
    const amount = convert(usdAmount);
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "INR" ? 0 : 2,
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, changeCurrency, rate, rateUpdatedAt, rateError, convert, format }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
