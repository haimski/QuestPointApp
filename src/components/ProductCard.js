import * as React from "react"
import { Link } from "gatsby"
import { useCart } from "../context/CartContext"

/**
 * ProductCard (Stripe-cart ready).
 * - `imageNode` lets us pass <StaticImage /> now, and upgrade to GatsbyImage later.
 */
export default function ProductCard({
  id,
  name,
  price,
  description,
  href = "#",
  imageNode,
  imageUrl,
  category,
  brand,
}) {
  const { addItem, hasItem } = useCart()
  const inCart = hasItem(id)

  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : String(price)

  const handleAdd = async () => {
    addItem(id, 1)
  }

  const resolvedAlt = name || "Product image"
  const resolvedImage =
    imageNode ||
    (typeof imageUrl === "string" && imageUrl.trim().length > 0 ? (
      <img
        src={imageUrl}
        alt={resolvedAlt}
        className="h-full w-full object-contain p-4"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
        No image
      </div>
    ))

  return (
    <div className="group qp-glass relative overflow-hidden rounded-2xl p-4 transition hover:border-primary-red/30 hover:shadow-red-glow">
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-primary-red/15 blur-3xl" />
      </div>

      <div className="relative">
        <Link to={href} className="block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="h-full w-full">{resolvedImage}</div>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-white/60">
                {brand}
                {brand && category ? (
                  <span className="text-white/30"> • </span>
                ) : null}
                {category}
              </div>
              <h3 className="mt-1 line-clamp-2 text-base font-semibold tracking-tight text-white">
                {name}
              </h3>
            </div>

            <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white">
              ${formattedPrice}
            </div>
          </div>
        </Link>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-white/50">
            Free shipping over <span className="text-white/70">$299</span>
          </div>

          {inCart ? (
            <Link to="/cart" className="qp-btn-ghost">
              In cart • View →
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
        </div>
      </div>
    </div>
  )
}

