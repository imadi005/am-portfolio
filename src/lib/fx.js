const FALLBACK = 96;

async function fromFrankfurter() {
  const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR", { next: { revalidate: 600 } });
  const data = await res.json();
  return data?.rates?.INR;
}

async function fromErApi() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 600 } });
  const data = await res.json();
  return data?.rates?.INR;
}

export async function getUsdToInr() {
  for (const source of [fromFrankfurter, fromErApi]) {
    try {
      const rate = await source();
      if (typeof rate === "number" && rate > 0) return { rate, live: true };
    } catch {}
  }
  return { rate: FALLBACK, live: false };
}
