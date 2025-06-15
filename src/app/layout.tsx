import type { Metadata } from 'next'
import './globals.css'
import { ThemeWrapper } from '@/components/theme-wrapper'

export const metadata: Metadata = {
  title: 'Visualizador de Vendas',
  description: 'Aplicativo para visualização de dados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}