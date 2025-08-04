'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { Button } from '@/components/ui/button'

export function Header() {
    const { toggleCart, getTotalItems } = useCartStore()
    const itemsCount = getTotalItems()

    return(
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/**Logo de la tienda */}
            <Link href="/" className="text-xl font-bold">
                MAYLIN CONCEPT
            </Link>

            {/**Menu Principal */}
            <nav className="hidden md:flex items-center">
                <Link href="/" className="hover:text-gray-600 m-2">
                Todos
                </Link>
                <Link href="/products?category=shirts" className="hover:text-gray-600 m-2">
                Camisetas
                </Link>
                <Link href="/products?category=stickers" className="hover:text-gray-600 m-2">
                Stickers
                </Link>
            </nav>

            {/* Botón del carrito */}
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleCart}
            >
                <ShoppingCart className="h-5 w-5" />
                {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemsCount}
                </span>
                )}
            </Button>
        </div>
    )
}