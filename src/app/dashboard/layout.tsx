import NavbarSimple from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col w-full h-screen bg-gray-500 p-3'>
      <NavbarSimple />
      <div className='flex h-full'>
        <Sidebar />
        <Content>
          {children}
        </Content>
      </div>
    </div >
  )
}
