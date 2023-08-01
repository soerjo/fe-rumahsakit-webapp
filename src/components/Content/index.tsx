
import React, { ReactNode } from 'react'

const Content = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full p-3'>
            <div className="h-full w-full p-4 shadow-xl bg-white rounded-xl shadow-blue-gray-900/5 bg-opacity-80">
                {children}
            </div>
        </div>
    )
}

export default Content