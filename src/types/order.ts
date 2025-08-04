export interface OrderInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  orderItems: string      // Mantener como string (Text Area en ACF)
  orderTotal: number      // CAMBIAR de string a number
  paymentReceipt?: string // ID del archivo en WordPress Media
  orderStatus?: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  // AGREGAR campos faltantes:
  shippingAddress?: string
  orderNotes?: string     // Notas del cliente
  customDesignFiles?: string[] // IDs de archivos de diseño
}

// AGREGAR interface para items estructurados (antes de convertir a string):
export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number          // Precio unitario
  selectedSize?: string
  selectedColor?: string
  customDesignUrl?: string
  subtotal: number       // quantity * price + customDesignPrice
}

// AGREGAR interface para respuesta de GraphQL:
export interface OrderResponse {
  id: string
  databaseId: number
  title: string
  date: string
  orderFields: {
    customerName: string
    customerEmail: string
    customerPhone: string
    orderItems: string
    orderTotal: number
    paymentReceipt?: {
      node: {
        mediaItemUrl: string
        title: string
      }
    }
  orderStatus: OrderStatus
    shippingAddress?: string
    orderNotes?: string
    adminNotes?: string
    customDesignFiles?: {
      nodes: Array<{
        mediaItemUrl: string
        title: string
      }>
    }
  }
}

// AGREGAR type para estados de orden:
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered'