/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

require("@fontsource/inter/400.css")
require("@fontsource/inter/600.css")
require("@fontsource/orbitron/400.css")
require("./src/styles/global.css")

const React = require("react")
const { CartProvider } = require("./src/context/CartContext")

exports.wrapRootElement = ({ element }) => {
  return React.createElement(CartProvider, null, element)
}
