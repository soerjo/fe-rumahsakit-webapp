"use server";
import { cookies } from "next/dist/client/components/headers";

export const postObat = async (dataObat: any) => {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get('token') // Find cookie

  // console.log({ dataObat })

  const res = await fetch("http://localhost:3000/obat", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    },
    body: JSON.stringify(dataObat),
  });
  const data = await res.json();

  console.log({ data })

  return data;
};
