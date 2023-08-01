import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token?.value) return NextResponse.redirect(new URL("/", request.url));

  // return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
  matcher: ["/dashboard", "/dasboard/:path*"],
};
