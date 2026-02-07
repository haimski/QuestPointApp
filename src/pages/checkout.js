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

export default function CheckoutPage() {
  const { cart, itemCount } = useCart()
  const catalog = React.useMemo(() => byId(products), [])
  const lines = React.useMemo(() => {
    return Object.entries(cart.items)
      .map(([id, v]) => {
        const p = catalog.get(id)
        if (!p) return null
        const qty = v?.qty || 1
        const price = typeof p.price === "number" ? p.price : Number(p.price || 0)
        return { id, name: p.name, qty, subtotal: price * qty }
      })
      .filter(Boolean)
  }, [cart.items, catalog])

  const total = React.useMemo(
    () => lines.reduce((sum, l) => sum + l.subtotal, 0),
    [lines]
  )

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const startCheckout = async () => {
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines.map(l => ({ id: l.id, qty: l.qty })) }),
      })
      const raw = await res.text()
      let data = null
      try {
        data = raw ? JSON.parse(raw) : null
      } catch {
        throw new Error(
          raw?.slice(0, 140) ||
            `Checkout failed (HTTP ${res.status})`
        )
      }

      if (!res.ok) throw new Error(data?.error || "Checkout failed")
      if (!data?.url) throw new Error("Missing Stripe checkout URL")
      window.location.assign(data.url)
    } catch (e) {
      setError(e.message || "Checkout failed")
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Secure checkout powered by Stripe Checkout.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
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
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/cart" className="qp-btn-ghost">
              ← Back to cart
            </Link>
            <button
              type="button"
              className="qp-btn-primary"
              onClick={startCheckout}
              disabled={lines.length === 0 || loading}
            >
              {loading ? "Redirecting…" : "Proceed to payment"}
            </button>
          </div>
        </section>

        {error ? (
          <div className="mt-6 rounded-2xl border border-primary-red/30 bg-primary-red/10 p-4 text-sm text-white">
            {error}
          </div>
        ) : (
          <div className="mt-6 text-xs text-white/40">
            You’ll be redirected to Stripe’s hosted checkout to complete the demo
            payment.
          </div>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Checkout" />

