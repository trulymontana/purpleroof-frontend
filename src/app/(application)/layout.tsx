import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sire Finance',
  description: 'This is a mortgage management application.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-auto min-h-screen flex-col">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
      <Toaster />
    </html>
  )
}
