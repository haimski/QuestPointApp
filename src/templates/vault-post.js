import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function VaultPostTemplate({ data }) {
  const post = data.markdownRemark
  const { title, date } = post.frontmatter
  const previous = data.previous
  const next = data.next

  return (
    <Layout>
      <article className="mx-auto max-w-3xl">
        <div className="qp-glass rounded-3xl p-6 sm:p-10">
          <div className="text-xs text-white/50">
            Gaming Vault <span className="text-primary-red">•</span> {date}
          </div>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="mt-6 h-px w-full bg-white/10" />

          <div
            className="prose prose-invert mt-6 max-w-none prose-a:text-primary-red prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-headings:font-display prose-headings:tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <Link to="/gaming-vault" className="qp-btn-ghost">
              ← Back to Gaming Vault
            </Link>
            <Link to="/store" className="qp-btn-primary">
              Browse consoles
            </Link>
          </div>

          {(previous || next) && (
            <nav className="grid gap-3 sm:grid-cols-2" aria-label="Article navigation">
              {previous ? (
                <Link
                  to={previous.frontmatter.slug}
                  className="group qp-glass rounded-2xl p-5 transition hover:border-primary-red/30 hover:shadow-red-glow"
                  rel="prev"
                >
                  <div className="text-xs text-white/50">Previous article</div>
                  <div className="mt-1 font-display text-base text-white">
                    {previous.frontmatter.title}
                  </div>
                  <div className="mt-3 text-sm text-primary-red/90 group-hover:text-primary-red">
                    ← Read previous
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {next && (
                <Link
                  to={next.frontmatter.slug}
                  className="group qp-glass rounded-2xl p-5 transition hover:border-primary-red/30 hover:shadow-red-glow sm:text-right"
                  rel="next"
                >
                  <div className="text-xs text-white/50">Next article</div>
                  <div className="mt-1 font-display text-base text-white">
                    {next.frontmatter.title}
                  </div>
                  <div className="mt-3 text-sm text-primary-red/90 group-hover:text-primary-red">
                    Read next →
                  </div>
                </Link>
              )}
            </nav>
          )}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query VaultPostById($id: String!, $previousId: String, $nextId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
        excerpt
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousId }) {
      frontmatter {
        title
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      frontmatter {
        title
        slug
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.excerpt}
  />
)

