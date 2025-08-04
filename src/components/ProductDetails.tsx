'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { FileUpload } from '@/components/FileUpload'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customDesignFile, setCustomDesignFile] = useState<File | null>(null)
  const { addItem, toggleCart } = useCartStore()
  const { title, productFields } = product
  const price = productFields?.price || 0
  
  const colors = productFields?.availableColors 
    ? productFields.availableColors.split(',').map(c => c.trim())
    : ['Negro', 'Blanco', 'Azul']
  const sizes = productFields?.availableSizes
    ? productFields.availableSizes.split(',').map(s => s.trim())
    : ['S', 'M', 'L', 'XL']
  const allowsCustomDesign = productFields?.allowsCustomDesign
  const customDesignPrice = productFields?.customDesignPrice || 0
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-2xl font-medium mt-2">${price.toFixed(2)}</p>
      </div>
      {/* Selector de Color */}
      <div>
        <Label className="text-base font-medium">COLOR</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {colors.map((color) => (
            <Button
              key={color}
              variant={selectedColor === color ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Selector de Talla */}
      <div>
        <Label className="text-base font-medium">TALLA</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      {/* Selector de Cantidad */}
      <div>
        <Label className="text-base font-medium">CANTIDAD</Label>
        <div className="flex items-center gap-4 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Upload de Diseño Personalizado */}
      {allowsCustomDesign && (
        <div>
          <Label className="text-base font-medium">
            DISEÑO PERSONALIZADO (OPCIONAL)
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            {customDesignPrice > 0
              ? `Agrega tu diseño por $${customDesignPrice.toFixed(2)} adicionales`
              : 'Puedes agregar tu propio diseño sin costo adicional'
            }
          </p>
          <FileUpload
            onFileSelect={setCustomDesignFile}
            className="mb-4"
          />
        </div>
      )}

      {/* Descripción */}
      {productFields?.shortDescription && (
        <div>
          <p className="text-gray-600">{productFields.shortDescription}</p>
        </div>
      )}

      {/* Botón Agregar al Carrito */}
      <Button 
        size="lg" 
        className="w-full"
        onClick={() => {
          // Validar selección
          if (!selectedColor) {
            toast.error('Por favor selecciona un color')
            return
          }
          if (!selectedSize) {
            toast.error('Por favor selecciona una talla')
            return
          }
          
          // Agregar al carrito
          addItem({
            productId: product.id,
            name: title,
            price: price,
            quantity: quantity,
            image: productFields?.mainImage?.node?.sourceUrl,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            customDesignFile: customDesignFile || undefined,
            customDesignPrice: customDesignFile ? customDesignPrice : 0
          })
          
          // Feedback al usuario
          toast.success('Producto agregado al carrito')
          
          // Abrir el carrito
          setTimeout(() => toggleCart(), 300)
        }}
      >
        Agregar al Carrito
      </Button>
    </div>
  )
}