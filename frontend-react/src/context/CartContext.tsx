import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ProductDTO } from '../services/ProductService'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  comboItems?: ProductDTO[]
}

type CartContextType = {
  cartItems: CartItem[]
  cartCount: number
  total: number
  addToCart: (product: ProductDTO) => void
  addComboToCart: (combo: {
    id: string
    title: string
    discountedPrice: number
    items: ProductDTO[]
  }) => void
  clearCart: () => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = 'calmaplus-cart'

function getSavedCart() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return []
  try {
    return JSON.parse(saved) as CartItem[]
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    setCartItems(getSavedCart())
  }, [])

  useEffect(() => {
    saveCart(cartItems)
  }, [cartItems])

  const addToCart = (product: ProductDTO) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price ?? 0,
          quantity: 1,
          imageUrl: product.imageUrl,
        },
      ]
    })
  }

  const addComboToCart = (combo: { id: string; title: string; discountedPrice: number; items: ProductDTO[] }) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === combo.id)
      if (existing) {
        return current.map((item) =>
          item.id === combo.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...current,
        {
          id: combo.id,
          name: combo.title,
          price: combo.discountedPrice,
          quantity: 1,
          imageUrl: combo.items[0]?.imageUrl,
          comboItems: combo.items,
        },
      ]
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const removeFromCart = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  )

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const value = useMemo(
    () => ({ cartItems, cartCount, total, addToCart, addComboToCart, clearCart, removeFromCart }),
    [cartItems, cartCount, total]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
