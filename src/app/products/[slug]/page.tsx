import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/graphql/queries'
import { ProductDetails } from '@/components/ProductDetails'

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const { productBy } = await getProductBySlug(slug)
  
  if (!productBy) {
    notFound()
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: Imágenes */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={productBy.productFields?.mainImage?.node?.sourceUrl || '/placeholder.png'}
              alt={productBy.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        {/* Columna derecha: Detalles del producto */}
        <div>
          <ProductDetails product={productBy} />
        </div>
      </div>
    </main>
  )
}