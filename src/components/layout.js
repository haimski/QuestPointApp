import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-deep-dark text-zinc-100">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-radial" />

      <Header />
      <main className="qp-container py-10">{children}</main>
      <Footer />
    </div>
  )
}
