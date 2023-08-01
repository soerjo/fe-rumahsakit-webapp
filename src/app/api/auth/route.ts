import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const res = await fetch("http://localhost:3000/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  const response = NextResponse.json(data);
  response.cookies.set("token", data.access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  response.cookies.set("user", JSON.stringify(data.payload), {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  // request.cookies.set("token", data.access_token, { httpOnly: true });

  return response;
}
