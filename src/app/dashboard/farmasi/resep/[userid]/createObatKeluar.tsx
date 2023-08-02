"use server";

import { cookies } from "next/dist/client/components/headers";

export const createObatKeluar = async (dataObatKeluar: any) => {
  const nextCookies = cookies();
  const token = nextCookies.get('token')

  console.log({ dataObatKeluar })
  const res = await fetch("http://localhost:3000/obatkeluar", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    },
    body: JSON.stringify(dataObatKeluar),
  });

  const data = await res.json();

  return data;
};
