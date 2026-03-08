import { NextRequest, NextResponse } from "next/server";

const FPL_API_URL = process.env.FPL_API_URL;

async function proxyRequest(request: NextRequest) {
  if (!FPL_API_URL) {
    return NextResponse.json(
      { error: "FPL_API_URL not configured" },
      { status: 503 }
    );
  }

  const path = request.nextUrl.pathname.replace(/^\/api\/fpl/, "");
  const search = request.nextUrl.search;
  const targetUrl = `${FPL_API_URL}${path}${search}`;

  try {
    const res = await fetch(targetUrl, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach FPL API" },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}
