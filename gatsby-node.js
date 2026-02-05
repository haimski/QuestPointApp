/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fileAbsolutePath: { regex: "/content/vault/" } }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query for vault posts.", result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Sorted newest -> oldest.
  posts.forEach((post, index) => {
    const previous = index === 0 ? null : posts[index - 1]
    const next = index === posts.length - 1 ? null : posts[index + 1]

    createPage({
      path: post.frontmatter.slug,
      component: require.resolve("./src/templates/vault-post.js"),
      context: {
        id: post.id,
        previousId: previous?.id ?? null,
        nextId: next?.id ?? null,
      },
    })
  })

  // Product pages (from JSON catalog)
  const products = require("./src/data/products.json")
  products.forEach(product => {
    createPage({
      path: `/store/${product.id}`,
      component: require.resolve("./src/templates/product.js"),
      context: {
        product,
      },
    })
  })
}
