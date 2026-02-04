import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useCart } from "../../context/CartContext"

export default function CheckoutSuccessPage() {
  const { clear } = useCart()

  React.useEffect(() => {
    // In a real app you'd verify the session via webhook/server before clearing.
    clear()
  }, [clear])

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Payment successful
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Thanks for your order. This is a demo flow powered by Stripe Checkout.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/store" className="qp-btn-primary">
              Keep shopping
            </Link>
            <Link to="/gaming-vault" className="qp-btn-ghost">
              Read Gaming Vault
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Checkout Success" />

