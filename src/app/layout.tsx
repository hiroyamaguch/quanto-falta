import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nunito } from 'next/font/google'
import React from 'react'

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
})

export const metadata = {
  title: 'Quanto falta?',
  description: 'Calcule quantas horas faltam para sair do serviço'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} bg-gray-600 font-sans text-white-600`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
