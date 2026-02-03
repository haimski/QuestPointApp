import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout"
import Seo from "../components/seo"
import products from "../data/products.json"
import { useCart } from "../context/CartContext"

export default function ProductTemplate({ pageContext }) {
  const productId = pageContext?.product?.id
  const product =
    pageContext?.product || products.find(p => p.id === productId) || null

  const { addItem, hasItem } = useCart()
  const inCart = hasItem(productId)

  if (!product) {
    return (
      <Layout>
        <div className="qp-glass rounded-3xl p-8">
          <h1 className="font-display text-2xl text-white">Product not found</h1>
          <p className="mt-2 text-white/60">
            This console doesn’t exist in the catalog yet.
          </p>
          <div className="mt-6">
            <Link to="/store" className="qp-btn-primary">
              Back to Store
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const related = products
    .filter(
      p =>
        p.id !== product.id &&
        (p.brand === product.brand || p.category === product.category)
    )
    .slice(0, 3)

  const formattedPrice =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : String(product.price)

  const handleAdd = async () => {
    addItem(product.id, 1)
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-sm text-white/60">
          <Link to="/" className="hover:text-white">
            Home
          </Link>{" "}
          <span className="text-white/30">/</span>{" "}
          <Link to="/store" className="hover:text-white">
            Store
          </Link>{" "}
          <span className="text-white/30">/</span>{" "}
          <span className="text-white">{product.name}</span>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="qp-glass overflow-hidden rounded-3xl p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <StaticImage
                src="../images/example.png"
                alt={product.name}
                className="h-full w-full"
                placeholder="blurred"
                formats={["auto", "webp", "avif"]}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-white/5" />
              <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-white/5" />
              <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-white/5" />
            </div>
          </div>

          <div className="qp-glass rounded-3xl p-6 sm:p-10">
            <div className="text-xs text-white/50">
              {product.brand} <span className="text-primary-red">•</span>{" "}
              {product.category} <span className="text-primary-red">•</span>{" "}
              {product.type}
            </div>
            <h1 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-lg font-semibold text-white">
                ${formattedPrice}
              </div>
              <div className="text-sm text-white/60">
                Secure checkout powered by Stripe
              </div>
            </div>

            <p className="mt-6 text-sm text-white/70">
              Premium condition console listing. This is a demo product page —
              we’ll attach real images/specs next.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {inCart ? (
                <Link to="/cart" className="qp-btn-primary">
                  In cart • Go to cart →
                </Link>
              ) : (
                <button
                  type="button"
                  className="qp-btn-primary"
                  onClick={handleAdd}
                >
                  Add to cart
                </button>
              )}
              <Link to="/store" className="qp-btn-ghost">
                Back to Store
              </Link>
            </div>

            <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 sm:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Era</div>
                <div className="mt-1 text-white">{product.category}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Form factor</div>
                <div className="mt-1 text-white">{product.type}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Brand</div>
                <div className="mt-1 text-white">{product.brand}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">SKU</div>
                <div className="mt-1 text-white">{product.id}</div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-xl tracking-tight text-white sm:text-2xl">
                  Related picks
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  More from {product.brand} and the {product.category} era
                </p>
              </div>
              <Link to="/store" className="text-sm text-white/70 hover:text-white">
                View all →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/store/${r.id}`}
                  className="group qp-glass block rounded-3xl p-6 transition hover:border-primary-red/30 hover:shadow-red-glow"
                >
                  <div className="text-xs text-white/50">
                    {r.brand} <span className="text-white/30">•</span> {r.category}
                  </div>
                  <div className="mt-2 font-display text-lg tracking-tight text-white">
                    {r.name}
                  </div>
                  <div className="mt-4 inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white">
                    ${typeof r.price === "number" ? r.price.toFixed(2) : r.price}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => (
  <Seo title={pageContext?.product?.name || "Product"} />
)

