'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()

    React.useEffect(() => {
        const countdown = setTimeout(() => { router.push("/dashboard") }, 5000)

        return () => clearTimeout(countdown)
    }, [router])

    return (
        <div>Page is NotFound!</div>
    )
}

export default NotFound