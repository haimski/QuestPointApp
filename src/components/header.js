import * as React from "react"
import { Link } from "gatsby"
import { useCart } from "../context/CartContext"

export default function Header() {
  const { itemCount } = useCart()
  const count = itemCount ?? 0

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep-dark/70 backdrop-blur-xl">
      <div className="qp-container">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-baseline gap-2 rounded-xl px-2 py-1 transition hover:bg-white/5"
              aria-label="QuestPoint home"
            >
              <span className="font-display text-base tracking-wide text-white">
                Quest<span className="text-primary-red">Point</span>
              </span>
              <span className="hidden text-xs text-white/50 sm:inline">
                consoles
              </span>
            </Link>

            <nav className="hidden items-center gap-1 text-sm sm:flex">
              <Link
                to="/store"
                className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
              >
                Store
              </Link>
              <Link
                to="/gaming-vault"
                className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
              >
                Gaming Vault
              </Link>
              <Link
                to="/contact"
                className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <div className="hidden w-full max-w-sm sm:block">
              <label className="sr-only" htmlFor="qp-search">
                Search consoles
              </label>
              <div className="relative">
                <input
                  id="qp-search"
                  className="qp-input pr-10"
                  placeholder="Search consoles (Algolia)…"
                  autoComplete="off"
                />
                <span
                  className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/40"
                  aria-hidden="true"
                >
                  ⌘K
                </span>
              </div>
            </div>

            <Link
              to="/cart"
              className="qp-btn-ghost relative"
              aria-label="Go to cart"
            >
              Cart
              <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary-red px-1.5 py-0.5 text-[11px] leading-none text-white shadow-red-glow">
                {count}
              </span>
              <span className="ml-2 hidden text-xs text-white/50 md:inline">
                Click the counter to go to cart
              </span>
            </Link>
          </div>
        </div>

        <div className="pb-3 sm:hidden">
          <label className="sr-only" htmlFor="qp-search-mobile">
            Search consoles
          </label>
          <input
            id="qp-search-mobile"
            className="qp-input"
            placeholder="Search consoles (Algolia)…"
            autoComplete="off"
          />
        </div>
      </div>
    </header>
  )
}

