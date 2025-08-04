import Link from 'next/link'
import { getProducts } from '@/lib/graphql/queries'
import { ProductCard } from '@/components/ProductCard'

export default async function HomePage() {
  const { products } = await getProducts(12)
  
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          MaylinConcept Store
        </h1>
        <p className="text-gray-600">
          Diseños únicos y personalizados
        </p>
      </section>
      
      {/* Grid de productos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}