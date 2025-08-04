export interface Product {
    id: string
    title: string
    slug: string
    productFields: {
        price: number  // CAMBIAR de string a number
        mainImage: {
            node: {
                sourceUrl: string
            }
        } | null
        // AGREGAR estos campos nuevos:
        secondaryImage?: {
            node: {
                sourceUrl: string
            }
        }
        shortDescription?: string
        fullDescription?: string
        inStock: boolean
        // AGREGAR campos para variantes:
        availableSizes?: string  // ["S", "M", "L", "XL"]
        availableColors?: string // ["Rojo", "Azul", "Negro"]
        allowsCustomDesign?: boolean
        customDesignPrice?: number // Precio adicional por diseño
    }
}