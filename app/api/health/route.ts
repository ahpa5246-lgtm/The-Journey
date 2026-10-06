import { NextResponse } from "next/server";

const VERSION = "0.1.0";

export function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: VERSION,
  });
}
