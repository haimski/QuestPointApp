import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useCart } from "../context/CartContext"
import products from "../data/products.json"

function formatMoney(value) {
  const n = typeof value === "number" ? value : Number(value || 0)
  return n.toFixed(2)
}

function byId(items) {
  const map = new Map()
  items.forEach(p => map.set(p.id, p))
  return map
}

export default function CartPage() {
  const { cart, itemCount, removeItem, setQty, clear } = useCart()
  const catalog = React.useMemo(() => byId(products), [])

  const lines = React.useMemo(() => {
    return Object.entries(cart.items)
      .map(([id, v]) => {
        const p = catalog.get(id)
        if (!p) return null
        const qty = v?.qty || 1
        const price = typeof p.price === "number" ? p.price : Number(p.price || 0)
        return {
          id,
          name: p.name,
          qty,
          unitPrice: price,
          subtotal: price * qty,
        }
      })
      .filter(Boolean)
  }, [cart.items, catalog])

  const total = React.useMemo(
    () => lines.reduce((sum, l) => sum + l.subtotal, 0),
    [lines]
  )

  const [checkoutLoading, setCheckoutLoading] = React.useState(false)
  const [checkoutError, setCheckoutError] = React.useState("")

  const startCheckout = async () => {
    setCheckoutError("")
    setCheckoutLoading(true)
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map(l => ({ id: l.id, qty: l.qty })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Checkout failed")
      if (!data?.url) throw new Error("Missing Stripe checkout URL")
      window.location.assign(data.url)
    } catch (e) {
      setCheckoutError(e.message || "Checkout failed")
      setCheckoutLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Cart
          </h1>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Review your items and proceed to checkout.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-3">
            <div>
              <div className="text-xs text-white/50">Items</div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {itemCount}
              </div>
            </div>
            <div>
              <div className="text-xs text-white/50">Total</div>
              <div className="mt-1 text-2xl font-semibold text-white">
                ${formatMoney(total)}
              </div>
            </div>
            <div className="flex items-end justify-start sm:justify-end">
              <button
                type="button"
                className="qp-btn-primary"
                onClick={startCheckout}
                disabled={lines.length === 0 || checkoutLoading}
              >
                {checkoutLoading ? "Redirecting…" : "Checkout"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            {lines.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
                Your cart is empty. Add a console from the{" "}
                <Link to="/store" className="text-primary-red hover:underline">
                  store
                </Link>
                .
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="bg-white/5 px-5 py-3 text-xs text-white/50">
                  Cart items
                </div>
                <ul className="divide-y divide-white/10">
                  {lines.map(line => (
                    <li key={line.id} className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="font-display text-lg text-white">
                            {line.name}
                          </div>
                          <div className="mt-1 text-xs text-white/50">
                            SKU: {line.id}
                          </div>
                          <div className="mt-2 text-sm text-white/60">
                            ${formatMoney(line.unitPrice)} each
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:items-end">
                          <div className="flex items-center gap-2">
                            <label
                              className="text-xs text-white/50"
                              htmlFor={`qty-${line.id}`}
                            >
                              Qty
                            </label>
                            <select
                              id={`qty-${line.id}`}
                              className="qp-input w-24"
                              value={line.qty}
                              onChange={e =>
                                setQty(line.id, Number(e.target.value))
                              }
                            >
                              {Array.from({ length: 10 }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="text-sm font-semibold text-white">
                            Subtotal: ${formatMoney(line.subtotal)}
                          </div>

                          <button
                            type="button"
                            className="qp-btn-ghost"
                            onClick={() => removeItem(line.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/store" className="qp-btn-ghost">
              ← Continue shopping
            </Link>
            <button
              type="button"
              className="qp-btn-ghost"
              onClick={clear}
              disabled={lines.length === 0}
            >
              Clear cart
            </button>
          </div>

          {checkoutError ? (
            <div className="mt-6 rounded-2xl border border-primary-red/30 bg-primary-red/10 p-4 text-sm text-white">
              {checkoutError}
            </div>
          ) : null}
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Cart" />

