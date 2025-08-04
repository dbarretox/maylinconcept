import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string              
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  selectedColor: string
  selectedSize: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => {
        const id = `${item.productId}-${item.selectedColor}-${item.selectedSize}`
        set((state) => {
          const existingItem = state.items.find(i => i.id === id)
          
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === id 
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            }
          }
          
          return { items: [...state.items, { ...item, id }] }
        })
      },
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      
      getTotalPrice: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    }),
    {
      name: 'cart-storage',
    }
  )
)