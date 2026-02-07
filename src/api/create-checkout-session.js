import dotenv from "dotenv"
import Stripe from "stripe"
import fs from "node:fs/promises"
import path from "node:path"
import productsData from "../data/products.json"

// Load .env.* locally so demo checkout works without exporting env vars manually.
// On Vercel, env vars are injected by the platform (dotenv is effectively a no-op).
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` })

function toCents(price) {
  const n = typeof price === "number" ? price : Number(price || 0)
  return Math.round(n * 100)
}

async function loadProducts() {
  // Prefer bundled JSON (works reliably on serverless deployments)
  if (Array.isArray(productsData)) return productsData

  // Fallback: read from filesystem (works in local dev)
  const filePath = path.join(process.cwd(), "src", "data", "products.json")
  const raw = await fs.readFile(filePath, "utf8")
  const parsed = JSON.parse(raw)
  return Array.isArray(parsed) ? parsed : []
}

function getOrigin(req) {
  // Prefer explicit production URL when deployed (recommended on Vercel)
  const siteUrl = process.env.SITE_URL
  if (siteUrl) return siteUrl.replace(/\/$/, "")

  // Vercel provides VERCEL_URL without protocol
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl}`

  // Fallback to request headers (works locally and most proxies)
  const proto = req.headers["x-forwarded-proto"] || "http"
  const host = req.headers["x-forwarded-host"] || req.headers.host
  if (host) return `${proto}://${host}`

  return "http://localhost:8000"
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" })
      return
    }

    const origin = getOrigin(req)

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
    const items = body?.items
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Cart is empty" })
      return
    }

    const products = await loadProducts()
    const byId = new Map(products.map(p => [p.id, p]))

    // Server-side authoritative pricing
    const line_items = items.map(i => {
      const id = i?.id
      const qty = Math.max(1, Math.min(99, Number(i?.qty) || 1))
      const product = byId.get(id)
      if (!product) {
        throw new Error(`Unknown product id: ${id}`)
      }

      return {
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: toCents(product.price),
          product_data: {
            name: product.name,
            metadata: {
              id: product.id,
              brand: product.brand,
              category: product.category,
              type: product.type,
            },
          },
        },
      }
    })

    const stripe = new Stripe(secretKey)

    // Validate all items before calling Stripe (avoid partial checkouts)
    // (line_items construction throws on unknown products)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      allow_promotion_codes: true,
    })

    res.status(200).json({ url: session.url })
  } catch (e) {
    // Ensure we always return JSON (avoid HTML 500 pages breaking res.json() on client)
    console.error("[create-checkout-session] error", e)
    res.status(500).json({ error: e.message || "Stripe error" })
  }
}

