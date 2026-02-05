import * as React from "react"
import { Link } from "gatsby"

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="qp-container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="font-display text-lg text-white">
              Quest<span className="text-primary-red">Point</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Premium consoles, modern and retro. Built for collectors, players,
              and nostalgia hunters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-white/80">Shop</div>
              <div className="space-y-1">
                <Link to="/" className="block text-white/60 hover:text-white">
                  Home
                </Link>
                <Link to="/store" className="block text-white/60 hover:text-white">
                  Store
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white/80">Company</div>
              <div className="space-y-1">
                <Link
                  to="/gaming-vault"
                  className="block text-white/60 hover:text-white"
                >
                  Gaming Vault
                </Link>
                <Link
                  to="/about"
                  className="block text-white/60 hover:text-white"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-white/60 hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white/80">Legal</div>
              <div className="space-y-1">
                <Link
                  to="/privacy"
                  className="block text-white/60 hover:text-white"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="block text-white/60 hover:text-white"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} QuestPoint. All rights reserved.</div>
          <div className="text-white/40">
            Deep Dark <span className="text-primary-red">•</span> Crimson Accent
          </div>
        </div>
      </div>
    </footer>
  )
}

