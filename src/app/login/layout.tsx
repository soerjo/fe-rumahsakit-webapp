export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex flex-col h-screen bg-gray-500 p-3'>
        {children}
      </body >
    </html >
  )
}
