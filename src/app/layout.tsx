import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nunito } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import React from 'react'

import './globals.css'
import { Metadata } from 'next'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
})

export const metadata: Metadata = {
  title: 'Work Timer',
  description: 'A simple countdown to track how much time you have left at work',
  openGraph: {
    title: 'Work Timer',
    description: 'A simple countdown to track how much time you have left at work',
    type: 'website',
    url: 'https://quanto-falta.vercel.app/',
    siteName: 'Work Timer',
    images: [{ url: 'https://quanto-falta.vercel.app/logo.png' }]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning style={{ backgroundColor: '#0a0a0a' }}>
      <body className={`${nunito.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen pt-14 pb-12">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
