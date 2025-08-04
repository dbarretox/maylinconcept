'use client'

import Link from 'next/link'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
    const { toggleCart, getTotalItems } = useCartStore()
    const itemsCount = getTotalItems()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="w-full">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">MAYLIN CONCEPT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-black transition">
                            Todos
                        </Link>
                        <Link href="/camisetas" className="text-gray-700 hover:text-black transition">
                            Camisetas
                        </Link>
                        <Link href="/stickers" className="text-gray-700 hover:text-black transition">
                            Stickers
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={toggleCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                                {itemsCount}
                                </span>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t mt-2">
                        <nav className="flex flex-col space-y-4 py-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-black transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Todos
                            </Link>
                            <Link
                                href="/camisetas"
                                className="text-gray-700 hover:text-black transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Camisetas
                            </Link>
                            <Link
                                href="/stickers"
                                className="text-gray-700 hover:text-black transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Stickers
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}