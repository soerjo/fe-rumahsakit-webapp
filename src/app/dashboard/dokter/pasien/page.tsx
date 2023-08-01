import React from 'react'
import { cookies } from 'next/dist/client/components/headers';
import TablePasien from './tablePasien';
// import TablePasien from '@/components/TablePasien';

const pagePasien = async () => {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('token') // Find cookie

    const fetchData = async () => {
        const res = await fetch("http://localhost:3000/pasien", {
            headers: { 'Authorization': `Bearer ${token?.value}` }
        })
        const data = await res.json()

        return data
    }

    let dataPasien = await fetchData()

    return (
        <>
            <TablePasien pasien={dataPasien} />
        </>
    )
}

export default pagePasien