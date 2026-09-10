"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import { useCart } from "../../../context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();

  const [status, setStatus] = useState("checking");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("missing");
      return;
    }
    fetch(`/api/verify-order?order_id=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          return;
        }
        setDetails(data);
        if (data.orderStatus === "PAID") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus(data.orderStatus?.toLowerCase() || "pending");
        }
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-xl px-6 pt-32 pb-20 text-center">
        {status === "checking" && <p>Verifying your payment…</p>}
        {status === "paid" && (
          <>
            <h1 className="text-3xl font-bold text-green-500">Payment Successful!</h1>
            <p className="mt-4 text-gray-300">
              Order {details?.orderId} confirmed for {details?.orderAmount} {details?.orderCurrency}.
              We'll reach out shortly with next steps.
            </p>
          </>
        )}
        {(status === "active" || status === "pending" || status === "expired") && (
          <>
            <h1 className="text-3xl font-bold text-yellow-500">Payment {status}</h1>
            <p className="mt-4 text-gray-300">
              Order {orderId} is still {status}. If you completed payment, this should update shortly.
            </p>
          </>
        )}
        {(status === "error" || status === "missing") && (
          <>
            <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
            <p className="mt-4 text-gray-300">We couldn't verify your order. Please contact support.</p>
          </>
        )}
        <Link href="/shop" className="mt-8 inline-block text-[#e50914] underline">
          Back to Shop
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
