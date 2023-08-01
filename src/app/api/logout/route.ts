import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ status: 200 });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  response.cookies.set("user", "", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}
