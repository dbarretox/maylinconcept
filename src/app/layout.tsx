import './globals.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/CartDrawer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {/* Header con logo y botón de carrito */}
        <header className="sticky top-0 z-40 bg-white border-b">
          <Header />
        </header>
        
        {children}
        
        <Toaster richColors position="top-center" expand={true} closeButton/>
        <CartDrawer />
      </body>
    </html>
  )
}