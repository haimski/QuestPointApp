import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/Layout"
import Seo from "../../components/seo"

export default function CheckoutCancelPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Checkout canceled
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            No worries—your cart is still here.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/cart" className="qp-btn-primary">
              Back to cart
            </Link>
            <Link to="/store" className="qp-btn-ghost">
              Continue shopping
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Checkout Canceled" />

