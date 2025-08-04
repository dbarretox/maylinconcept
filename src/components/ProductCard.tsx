import Link from 'next/link'
import { Product } from '@/types/product'
import { Card } from '@/components/ui/card'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, slug, productFields } = product
  const price = productFields?.price || 0
  const image = productFields?.mainImage?.node?.sourceUrl
  
  return (
    <div className="aspect-square transition-opacity animate-fadeIn">
      <Link href={`/products/${slug}`} className="relative inline-block h-full w-full">
        <Card className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
          {/* Imagen del producto */}
          <img
            src={image || '/placeholder.png'}
            alt={title}
            className="absolute h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          />
          {/* Info del producto */}
          <div className="absolute bottom-0 right-0 flex w-full px-4 pb-4">
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        
        
                <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{title}</h3>
                <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                ${price.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}