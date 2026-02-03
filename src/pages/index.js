import * as React from "react"
import { Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import Seo from "../components/seo"

const IndexPage = () => (
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
              src="../images/example.png"
              alt="QuestPoint featured console"
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
            A tiny sample set — we’ll wire this to the full catalog next.
          </p>
        </div>
        <Link to="/store" className="text-sm text-white/70 hover:text-white">
          View all →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          id="ps5-disc"
          name="PlayStation 5 (Disc Edition)"
          brand="Sony"
          category="Modern"
          price={499.99}
          description="PlayStation 5 console (disc edition)."
          href="/store/ps5-disc"
          imageNode={
            <StaticImage
              src="../images/example.png"
              alt="PlayStation 5"
              className="h-full w-full"
              placeholder="blurred"
              formats={["auto", "webp", "avif"]}
            />
          }
        />

        <ProductCard
          id="nintendo-64"
          name="Nintendo 64"
          brand="Nintendo"
          category="Retro"
          price={169.0}
          description="Nintendo 64 retro home console."
          href="/store/nintendo-64"
          imageNode={
            <StaticImage
              src="../images/example.png"
              alt="Nintendo 64"
              className="h-full w-full"
              placeholder="blurred"
              formats={["auto", "webp", "avif"]}
            />
          }
        />

        <ProductCard
          id="gameboy-color"
          name="GameBoy Color"
          brand="Nintendo"
          category="Retro"
          price={129.0}
          description="GameBoy Color handheld console."
          href="/store/gameboy-color"
          imageNode={
            <StaticImage
              src="../images/example.png"
              alt="GameBoy Color"
              className="h-full w-full"
              placeholder="blurred"
              formats={["auto", "webp", "avif"]}
            />
          }
        />
      </div>
    </section>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
