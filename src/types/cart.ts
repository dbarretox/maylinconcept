export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    // AGREGAR campos de variantes seleccionadas:
    selectedSize?: string
    selectedColor?: string
    customDesignFile?: File | string  // File para local, string para URL
    customDesignPrice?: number
    subtotal?: number     // AGREGAR: precio * cantidad + customDesignPrice
}

export interface CartState {
    items: CartItem[]
    total: number
    // AGREGAR métodos de cálculo:
    itemsCount: number    // Total de productos (suma de quantities)
    subtotal: number      // Suma sin envío/descuentos
    shipping?: number     // Costo de envío
}