import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function GamingVaultPage({ data }) {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <section className="qp-glass overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs text-white/50">
              QuestPoint <span className="text-primary-red">•</span> Blog
            </div>
            <h1 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
              Gaming Vault
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60 sm:text-base">
              Console history, buying guides, and quick reads—built for
              collectors and players.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/store" className="qp-btn-primary">
              Shop consoles
            </Link>
            <a
              href="#articles"
              className="qp-btn-ghost text-white/80 hover:text-white"
            >
              Read articles
            </a>
          </div>
        </div>
      </section>

      <section id="articles" className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl tracking-tight text-white sm:text-2xl">
              Latest articles
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {posts.length} article{posts.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <Link
              key={p.id}
              to={p.frontmatter.slug}
              className="group qp-glass block rounded-3xl p-6 transition hover:border-primary-red/30 hover:shadow-red-glow"
            >
              <div className="text-xs text-white/50">{p.frontmatter.date}</div>
              <div className="mt-2 font-display text-lg tracking-tight text-white">
                {p.frontmatter.title}
              </div>
              <p className="mt-2 text-sm text-white/60">{p.frontmatter.excerpt}</p>
              <div className="mt-4 text-sm text-primary-red/90 group-hover:text-primary-red">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query GamingVaultIndex {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/content/vault/" } }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          excerpt
          date(formatString: "MMM D, YYYY")
        }
      }
    }
  }
`

export const Head = () => <Seo title="Gaming Vault" />

