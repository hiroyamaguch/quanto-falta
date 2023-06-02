import React from 'react'
import { Roboto_Slab as RobotoSlab } from 'next/font/google'

import './globals.css'

const robotoSlab = RobotoSlab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

export const metadata = {
  title: 'Cálculo de horas',
  description: 'Calcule quantas horas faltam para sair do serviço',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoSlab.className} bg-gray-600 font-sans text-white-600`}
      >
        {children}
      </body>
    </html>
  )
}
