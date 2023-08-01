import { cookies } from "next/dist/client/components/headers";

import NavbarSimple from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'

interface ILayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: ILayout) {
  const nextCookies = cookies(); // Get cookies object
  const user = nextCookies.get('user') // Find cookie
  const dataUser = JSON.parse(user?.value || "{}")

  return (
    <div className='flex flex-col w-full h-screen bg-gray-500 p-2'>
      <NavbarSimple user={dataUser} />
      <div className='flex h-full'>
        <Sidebar user={dataUser} />
        <Content>
          {children}
        </Content>
      </div>
    </div >
  )
}
