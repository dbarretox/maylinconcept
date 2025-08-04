'use client'

import { Minus, Plus, X } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

export function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const total = getTotalPrice()
  
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full max-h-screen sm:max-w-lg flex flex-col px-4">
        <SheetHeader>
          <SheetTitle>Mi Carrito</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="space-y-4 px-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-4 border-b last:border-0">
                  {/* Imagen del producto */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Detalles del producto */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.selectedColor} / {item.selectedSize}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Precio y cantidad */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Footer con total y botón de checkout */}
        {items.length > 0 && (
          <div className="border-t pt-6 pb-2 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            
            {/* Texto informativo */}
            <p className="text-sm text-gray-500">
              El envío se calculará en el checkout.
            </p>
            
            {/* Botones de acción */}
            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  toggleCart()
                  // Aquí navegaremos a checkout
                }}
              >
                Proceder al Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={toggleCart}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}