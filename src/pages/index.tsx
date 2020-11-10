import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useMediaQuery } from "react-responsive"
import classnames from "classnames"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { formatPrice } from "../lib"

const IndexPage: React.FunctionComponent = () => {
  const isL = useMediaQuery({ query: "(min-width: 60em)" })
  const isM = useMediaQuery({
    query: "(max-width: 60em) and (min-width: 30em)",
  })
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
      <div className="mw8 ph2-l ph3-m ph4 center tc">
        <h3 className="pv4 fade-in">As Featured In</h3>
        {/* <div className="dt-ns center">
          <div className="dtc-l w-100-ns tc">
            <Img
              fixed={edges[0].node.images[0].localFile.childImageSharp.fixed}
            />
          </div>

          <div className="dtc-l w-100-ns tc">
            <Img
              fixed={edges[1].node.images[0].localFile.childImageSharp.fixed}
            />
          </div>
        </div>
        */}
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <div
          className="center"
          style={{
            display: "grid",
            gridTemplateColumns: `${classnames({
              "repeat(3, 1fr)": isL,
              "repeat(2, 1fr)": isM,
            })}`,
            gridColumnGap: classnames({
              "32px": isL,
              "16px": isM,
              "8px": !isL && !isM,
            }),
            gridRowGap: classnames({
              "64px": isL,
              "32px": isM,
              "16px": !isL && !isM,
            }),
            boxSizing: "inherit",
          }}
        >
          {edges.map(edge => {
            const { node } = edge
            return (
              <Link
                to={`/products/${node.wordpress_id}`}
                className="w-100 no-underline black"
                key={node.wordpress_id}
              >
                <div
                  className="w-100 relative flex"
                  style={{ boxSizing: "inherit" }}
                >
                  <Img
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      top: "0px",
                      left: "0px",
                      width: "300px",
                      height: "250px",
                    }}
                    fixed={node.images[0].localFile.childImageSharp.fixed}
                  />
                </div>

                {/* <h4 className="f5 fw4 mb0">DATE</h4> */}
                <a
                  href={`/products/${node.wordpress_id}`}
                  className="black no-underline"
                >
                  <h4 className="f4 fw8 mt2 mb0 ttu">{node.name}</h4>
                </a>
                <h4 className="f5 fw6 mt1 pt1 ">{formatPrice(node.price)}</h4>
              </Link>
            )
          })}{" "}
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </div>
    </Layout>
  )
}
export default IndexPage
