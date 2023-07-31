'use client'

import React, { ReactNode } from 'react'
import { Card } from '@material-tailwind/react'

const Content = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full p-3'>
            <Card className="h-full p-4 shadow-xl shadow-blue-gray-900/5 bg-opacity-80">
                {children}
            </Card>
        </div>
    )
}

export default Content