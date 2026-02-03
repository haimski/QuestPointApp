import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            This is a placeholder privacy policy for the QuestPoint demo. Update
            it before production use.
          </p>

          <div className="prose prose-invert mt-8 max-w-none prose-a:text-primary-red">
            <h2>What we collect</h2>
            <p>
              Contact details (like email) and order information required to
              complete purchases.
            </p>
            <h2>How we use it</h2>
            <p>
              To process orders, provide support, and improve the storefront.
            </p>
            <h2>Payments</h2>
            <p>
              Payments are handled by Stripe. We do not store full payment card
              details.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Privacy Policy" />

