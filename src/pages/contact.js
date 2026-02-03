import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"

export default function ContactPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <section className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">QuestPoint</div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Contact
          </h1>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Questions about a console, shipping, or your order? Send a message
            and we’ll get back to you.
          </p>

          <form className="mt-8 grid gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-white/50" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="qp-input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/50" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="qp-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/50" htmlFor="topic">
                Topic
              </label>
              <select id="topic" className="qp-input" defaultValue="order">
                <option value="order">Order / Checkout</option>
                <option value="shipping">Shipping</option>
                <option value="product">Product question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                className="mb-2 block text-xs text-white/50"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="qp-input min-h-32 resize-y"
                placeholder="Tell us what you’re looking for…"
              />
              <div className="mt-2 text-xs text-white/40">
                Demo form (no backend yet). We’ll wire it to a serverless handler
                next.
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="qp-btn-primary">
                Send message
              </button>
              <div className="text-xs text-white/50">
                Or email:{" "}
                <a className="text-primary-red hover:underline" href="mailto:support@questpoint.example">
                  support@questpoint.example
                </a>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Contact" />

