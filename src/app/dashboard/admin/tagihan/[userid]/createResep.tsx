"use server";

import { cookies } from "next/dist/client/components/headers";

export const createResep = async (dataResep: any) => {
  const nextCookies = cookies();
  const token = nextCookies.get('token')

  const res = await fetch("http://localhost:3000/resep", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    },
    body: JSON.stringify(dataResep),
  });

  const data = await res.json();

  return data;
};
