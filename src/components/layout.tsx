/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./styles.css"
// import "./glider.min.css"
// import "./glider.js"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="bg-gray-300 font-sans gt">
      <script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>

      <div className="pt0">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      </div>
      <div
        style={
          {
            // margin: `0 auto`,
            // maxWidth: 960,
            // padding: `0 1.0875rem 1.45rem`,
          }
        }
      >
        <main>{children}</main>
        <footer
          className="mt-20 pb-4" 
        >
          <div className="flex mb-4">
            <ul className="list-none gt text-xl ml-5">
              <li>About</li>
              <li>Cities</li>
            </ul>
            <ul className="list-none gt text-xl ml-5">
              <li>FAQ</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className="text-center gt text-sm"> © {new Date().getFullYear()}, High Speed Inc. All Rights Reserved
          </div>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
