import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"

export default function AboutPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            About
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            QuestPoint is a premium console boutique focused on clean listings,
            fast discovery, and a sleek checkout experience. We’re building the
            best place to shop modern systems and hunt retro classics.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/50">Curation</div>
              <div className="mt-2 font-display text-lg text-white">
                Collector-grade picks
              </div>
              <p className="mt-2 text-sm text-white/60">
                Condition-first listings, clear categories, and filters that
                match how console fans actually shop.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/50">Checkout</div>
              <div className="mt-2 font-display text-lg text-white">
                Secure and fast
              </div>
              <p className="mt-2 text-sm text-white/60">
                Stripe Checkout powered. The rest of the experience stays sleek,
                dark, and premium.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="About" />

