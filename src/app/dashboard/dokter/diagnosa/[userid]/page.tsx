import React from 'react'
import { cookies } from 'next/dist/client/components/headers';
import FormInput from './formInput'

const Page = async ({ params }: { params: { userid: string } }) => {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('token') // Find cookie

    const fetchPraktek = async () => {
        const res = await fetch("http://localhost:3000/pasien/" + params?.userid, {
            headers: { 'Authorization': `Bearer ${token?.value}` }
        })
        const data = await res.json()

        return data
    }

    const listPraktek = await fetchPraktek()

    // console.log({ params })

    return (
        <div className="flex w-full flex-col items-end gap-6 p-6">
            <FormInput pasien={listPraktek} />

        </div>
    )
}

export default Page