import * as React from "react"

import Layout from "../components/layout"
import ProductCard from "../components/ProductCard"
import Seo from "../components/seo"
import products from "../data/products.json"

function getBrands(items) {
  return Array.from(new Set(items.map(p => p.brand))).sort((a, b) =>
    a.localeCompare(b)
  )
}

function getTypes(items) {
  return Array.from(new Set(items.map(p => p.type))).sort((a, b) =>
    a.localeCompare(b)
  )
}

const ERA_OPTIONS = ["All", "Modern", "Retro"]

export default function StorePage() {
  const [era, setEra] = React.useState("All")
  const [size, setSize] = React.useState("All")
  const [brand, setBrand] = React.useState("All")

  const brands = React.useMemo(() => ["All", ...getBrands(products)], [])
  const sizes = React.useMemo(() => ["All", ...getTypes(products)], [])

  const filtered = React.useMemo(() => {
    return products.filter(p => {
      const eraOk = era === "All" ? true : p.category === era
      const sizeOk = size === "All" ? true : p.type === size
      const brandOk = brand === "All" ? true : p.brand === brand
      return eraOk && sizeOk && brandOk
    })
  }, [era, size, brand])

  return (
    <Layout>
      <section className="qp-glass overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Store
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60 sm:text-base">
              Modern powerhouses and retro legends — filtered fast, styled
              premium.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <a
                href="#modern"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 hover:text-white"
              >
                Modern Systems
              </a>
              <a
                href="#retro"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 hover:text-white"
              >
                Retro Classics
              </a>
              <a
                href="#handhelds"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 hover:text-white"
              >
                Handhelds
              </a>
            </div>
          </div>

          <div className="w-full lg:max-w-2xl">
            <div className="qp-glass rounded-3xl p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs text-white/50">Filter</div>
                    <div className="mt-1 text-sm text-white/70">
                      Choose any combination of era, size, and brand.
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    <div>
                      <span className="text-white/50">Results:</span>{" "}
                      <span className="font-semibold text-white">
                        {filtered.length}
                      </span>
                      <span className="text-white/40">
                        {" "}
                        / {products.length}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="qp-btn-ghost"
                      onClick={() => {
                        setEra("All")
                        setSize("All")
                        setBrand("All")
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <div className="mb-2 block text-xs text-white/50">Era</div>
                    <div className="flex flex-wrap gap-2">
                      {ERA_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setEra(opt)}
                          className={
                            opt === era
                              ? "qp-btn-primary"
                              : "qp-btn-ghost text-white/80"
                          }
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs text-white/50"
                      htmlFor="store-size"
                    >
                      Size
                    </label>
                    <select
                      id="store-size"
                      className="qp-input"
                      value={size}
                      onChange={e => setSize(e.target.value)}
                    >
                      {sizes.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 text-xs text-white/40">
                      Handheld, Home, or Hybrid
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs text-white/50"
                      htmlFor="store-brand"
                    >
                      Brand
                    </label>
                    <select
                      id="store-brand"
                      className="qp-input"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                    >
                      {brands.map(b => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
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

      <section className="mt-14 grid gap-4 lg:grid-cols-3">
        <div id="modern" className="qp-glass rounded-2xl p-6">
          <div className="text-xs text-white/50">Category</div>
          <h2 className="mt-1 font-display text-lg text-white">Modern Systems</h2>
          <p className="mt-2 text-sm text-white/60">
            PS5, Xbox Series X, Switch OLED — performance-first, pristine
            condition.
          </p>
        </div>
        <div id="retro" className="qp-glass rounded-2xl p-6">
          <div className="text-xs text-white/50">Category</div>
          <h2 className="mt-1 font-display text-lg text-white">Retro Classics</h2>
          <p className="mt-2 text-sm text-white/60">
            NES, Genesis, PS1 — verified, cleaned, and collector-friendly.
          </p>
        </div>
        <div id="handhelds" className="qp-glass rounded-2xl p-6">
          <div className="text-xs text-white/50">Category</div>
          <h2 className="mt-1 font-display text-lg text-white">Handhelds</h2>
          <p className="mt-2 text-sm text-white/60">
            GameBoy Color to Steam Deck — portable legends for on-the-go play.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Store" />

