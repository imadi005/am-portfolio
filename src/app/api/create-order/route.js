import { NextResponse } from "next/server";
import { getProductById } from "../../../data/products";

const CASHFREE_API_VERSION = "2023-08-01";

function getCashfreeBaseUrl() {
  const env = (process.env.CASHFREE_ENV || "TEST").toUpperCase();
  return env === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

async function getUsdToInrRate() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR", {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.rates?.INR || 88.5;
  } catch {
    return 88.5;
  }
}

export async function POST(request) {
  try {
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: "Cashfree credentials are not configured yet. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { items, currency, customer } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }
    if (!customer?.email || !customer?.phone) {
      return NextResponse.json({ error: "Customer email and phone are required." }, { status: 400 });
    }

    // Recompute the total server-side from the product catalog — never trust client-submitted prices.
    let totalUSD = 0;
    for (const { id, qty } of items) {
      const product = getProductById(id);
      if (!product || !Number.isFinite(qty) || qty <= 0) {
        return NextResponse.json({ error: `Invalid item: ${id}` }, { status: 400 });
      }
      totalUSD += product.priceUSD * qty;
    }

    const orderCurrency = currency === "INR" ? "INR" : "USD";
    let orderAmount = totalUSD;
    if (orderCurrency === "INR") {
      const rate = await getUsdToInrRate();
      orderAmount = Math.round(totalUSD * rate * 100) / 100;
    } else {
      orderAmount = Math.round(totalUSD * 100) / 100;
    }

    const orderId = `am_order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;

    const cfRes = await fetch(`${getCashfreeBaseUrl()}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": CASHFREE_API_VERSION,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: orderCurrency,
        customer_details: {
          customer_id: customer.email.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50),
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_name: customer.name || undefined,
        },
        order_meta: {
          return_url: `${baseUrl}/checkout/success?order_id={order_id}`,
        },
      }),
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok) {
      return NextResponse.json(
        { error: cfData?.message || "Cashfree order creation failed.", details: cfData },
        { status: cfRes.status }
      );
    }

    return NextResponse.json({
      orderId: cfData.order_id,
      paymentSessionId: cfData.payment_session_id,
      orderAmount,
      orderCurrency,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Unexpected server error." }, { status: 500 });
  }
}
