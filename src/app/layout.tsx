import type { Metadata } from 'next'
import './globals.css'
import { ThemeWrapper } from '@/components/theme/theme-wrapper'
import { ToastProvider } from '@/components/ui/use-toast'

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
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeWrapper>
      </body>
    </html>
  )
}