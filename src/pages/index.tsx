import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const {
    allWcProducts: { edges },
  } = useStaticQuery(graphql`
    {
      allWcProducts {
        edges {
          node {
            id
            wordpress_id
            name
            price
            images {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                  fixed {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            categories {
              wordpress_id
            }
          }
        }
      }
    }
  `)
  console.log(edges)
  return (
    <Layout>
      <SEO title="Home" />
      <img
        className="w-100 db center"
        src="https://tryhighspeed.com/wp-content/uploads/2019/05/tabletophighspeed.jpg"
      />
      <div className="mw7 center tc">
        <h3 className="">As Featured In</h3>
        <div className="dt-ns">
          <div className="dtc-l w-100-ns tc">YURR</div>
          <div className="dtc-l w-100-ns tc">YAA</div>
        </div>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </div>
    </Layout>
  )
}
export default IndexPage
