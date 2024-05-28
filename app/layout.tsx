import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import CartProvider from '@/provider/CartProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mercatura.com',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            style:{
              background: 'rgb(51 65 85)',
              color: '#fff'
            }
          }}
          position='top-right'
          reverseOrder={false}
        />
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <main className='flex-grow bg-zinc-200'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
