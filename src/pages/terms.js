import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function TermsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            This is a placeholder terms page for the QuestPoint demo. Update it
            before production use.
          </p>

          <div className="prose prose-invert mt-8 max-w-none prose-a:text-primary-red">
            <h2>Orders</h2>
            <p>
              Orders are subject to availability and confirmation. Prices and
              details may change.
            </p>
            <h2>Returns</h2>
            <p>
              Return policy terms should be defined before launch. For the demo,
              this section is informational only.
            </p>
            <h2>Liability</h2>
            <p>
              QuestPoint is provided “as-is” for demonstration purposes in this
              repository.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Terms of Service" />

