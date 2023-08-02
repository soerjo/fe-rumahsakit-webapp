import React from 'react'
import { cookies } from 'next/dist/client/components/headers';
import FormInput from './formInput'

const Page = async () => {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('token') // Find cookie

    const fetchPraktek = async () => {
        const res = await fetch("http://localhost:3000/praktek", {
            headers: { 'Authorization': `Bearer ${token?.value}` }
        })
        const data = await res.json()

        return data
    }




    const listPraktek = await fetchPraktek()

    return (
        <div className="flex w-full flex-col items-end gap-6 p-6">
            <FormInput listPraktek={listPraktek} />

        </div>
    )
}

export default Page