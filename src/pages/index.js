import * as React from "react"
import { Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import ProductCard from "../components/ProductCard"
import Seo from "../components/seo"
import products from "../data/products.json"

const FEATURED_IDS = ["ps5-disc", "nintendo-64", "gameboy-color"]

const IndexPage = () => {
  const featured = React.useMemo(() => {
    const byId = new Map(products.map(p => [p.id, p]))
    return FEATURED_IDS.map(id => byId.get(id)).filter(Boolean)
  }, [])

  const heroProduct = featured[0] || products[0] || null

  return (
    <Layout>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card-gray/50 p-6 shadow-red-glow sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-80" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-red shadow-red-glow" />
              Curated consoles • fast checkout • premium condition
            </div>

            <h1 className="mt-5 font-display text-3xl leading-tight tracking-tight text-white sm:text-5xl">
              The premium console shop for{" "}
              <span className="text-primary-red">modern power</span> and{" "}
              <span className="text-white">retro soul</span>.
            </h1>

            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              QuestPoint is built for collectors and players: clean listings,
              lightning discovery, and a sleek checkout flow.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/store" className="qp-btn-primary">
                Shop consoles
              </Link>
              <Link to="/gaming-vault" className="qp-btn-ghost">
                Explore the Gaming Vault
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/50">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Modern Systems
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Retro Classics
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Handhelds
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary-red/10 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <StaticImage
                src="../images/hero-main.png"
                alt="QuestPoint hero consoles"
                loading="eager"
                quality={95}
                formats={["auto", "webp", "avif"]}
                className="h-full w-full"
              />
            </div>
            <div className="mt-4 text-xs text-white/50">
              Featured drop: immaculate condition, verified authenticity.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl tracking-tight text-white sm:text-2xl">
              Featured consoles
            </h2>
            <p className="mt-1 text-sm text-white/60">
              A tiny sample set — pulled from the real catalog.
            </p>
          </div>
          <Link to="/store" className="text-sm text-white/70 hover:text-white">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              brand={p.brand}
              category={p.category}
              price={p.price}
              description={`${p.category} ${p.type} console by ${p.brand}.`}
              href={`/store/${p.id}`}
              imageUrl={p.imageUrl}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
