import * as React from "react"

const STORAGE_KEY = "qp_cart_v1"

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

function loadCart() {
  if (typeof window === "undefined") return { items: {} }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return { items: {} }
  const parsed = safeParse(raw, { items: {} })
  if (!parsed?.items || typeof parsed.items !== "object") return { items: {} }
  return parsed
}

function saveCart(cart) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

const CartContext = React.createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState(() => loadCart())

  React.useEffect(() => {
    saveCart(cart)
  }, [cart])

  const addItem = React.useCallback((id, qty = 1) => {
    setCart(prev => {
      const existing = prev.items[id]?.qty ?? 0
      // If already in cart, keep quantity as-is (user requested "marked already added")
      if (existing > 0) return prev
      return {
        ...prev,
        items: {
          ...prev.items,
          [id]: { qty: Math.max(1, Number(qty) || 1) },
        },
      }
    })
  }, [])

  const removeItem = React.useCallback(id => {
    setCart(prev => {
      if (!prev.items[id]) return prev
      const nextItems = { ...prev.items }
      delete nextItems[id]
      return { ...prev, items: nextItems }
    })
  }, [])

  const setQty = React.useCallback((id, qty) => {
    const q = Math.max(1, Math.min(99, Number(qty) || 1))
    setCart(prev => {
      if (!prev.items[id]) return prev
      return {
        ...prev,
        items: {
          ...prev.items,
          [id]: { qty: q },
        },
      }
    })
  }, [])

  const clear = React.useCallback(() => {
    setCart({ items: {} })
  }, [])

  const itemCount = React.useMemo(() => {
    return Object.values(cart.items).reduce((sum, v) => sum + (v?.qty || 0), 0)
  }, [cart.items])

  const hasItem = React.useCallback(
    id => Boolean(cart.items[id]?.qty),
    [cart.items]
  )

  const value = React.useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      setQty,
      clear,
      itemCount,
      hasItem,
    }),
    [cart, addItem, removeItem, setQty, clear, itemCount, hasItem]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}

