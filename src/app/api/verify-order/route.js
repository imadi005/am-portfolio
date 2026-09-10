import { NextResponse } from "next/server";

const CASHFREE_API_VERSION = "2023-08-01";

function getCashfreeBaseUrl() {
  const env = (process.env.CASHFREE_ENV || "TEST").toUpperCase();
  return env === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;

  if (!appId || !secretKey) {
    return NextResponse.json(
      { error: "Cashfree credentials are not configured yet." },
      { status: 500 }
    );
  }

  const cfRes = await fetch(`${getCashfreeBaseUrl()}/orders/${orderId}`, {
    headers: {
      "x-client-id": appId,
      "x-client-secret": secretKey,
      "x-api-version": CASHFREE_API_VERSION,
    },
    cache: "no-store",
  });

  const cfData = await cfRes.json();

  if (!cfRes.ok) {
    return NextResponse.json(
      { error: cfData?.message || "Could not verify order.", details: cfData },
      { status: cfRes.status }
    );
  }

  return NextResponse.json({
    orderId: cfData.order_id,
    orderStatus: cfData.order_status,
    orderAmount: cfData.order_amount,
    orderCurrency: cfData.order_currency,
  });
}
