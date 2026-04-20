import { NextRequest, NextResponse } from "next/server";

const MOVIES_API_URL = process.env.MOVIES_API_URL;

async function proxyRequest(request: NextRequest) {
  if (!MOVIES_API_URL) {
    return NextResponse.json(
      { error: "MOVIES_API_URL not configured" },
      { status: 503 }
    );
  }

  const path = request.nextUrl.pathname.replace(/^\/api\/movies/, "");
  const search = request.nextUrl.search;
  const targetUrl = `${MOVIES_API_URL}${path}${search}`;

  try {
    const init: RequestInit = {
      headers: { "Content-Type": "application/json" },
    };

    if (request.method === "POST") {
      init.method = "POST";
      init.body = await request.text();
    }

    const res = await fetch(targetUrl, init);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Movies API" },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}
