"use server";

import { cookies } from "next/dist/client/components/headers";

export const updatePasien = async (updatePasien: any, userid: string) => {
    const nextCookies = cookies();
    const token = nextCookies.get('token')

    const res = await fetch("http://localhost:3000/pasien/" + userid, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        },
        body: JSON.stringify(updatePasien),
    });

    const data = await res.json();

    return data;
};
