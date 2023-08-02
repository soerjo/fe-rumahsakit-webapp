"use server";
import { cookies } from "next/dist/client/components/headers";
import { ICreatePasien } from "./formInput";

export const postPasien = async (dataPasien: ICreatePasien) => {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get('token') // Find cookie

  // console.log({ dataPasien })

  const res = await fetch("http://localhost:3000/pasien", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    },
    body: JSON.stringify(dataPasien),
  });
  const data = await res.json();

  console.log({ data })

  return data;
};
