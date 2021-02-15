import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPrice } from "../lib"
import { graphql, useStaticQuery, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"

const ProductPage = () => {

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

  return (
    <Layout>
      <SEO title="FAQ" />
      <div className=" tc center">
        {/* <video
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            top: 0,
            left: 0,
          }}
          className="dib w-100  x y top left"
          loop
          autoPlay
        >
          <source
            data-src="https://player.vimeo.com/external/390337451.sd.mp4?s=57bbabbfdacf56f707d2e92b084477c7a187b1f7&amp;profile_id=165"
            src="https://player.vimeo.com/external/390337451.sd.mp4?s=57bbabbfdacf56f707d2e92b084477c7a187b1f7&amp;profile_id=165"
            type="video/mp4"
          />
        </video>
       */}
        <div
          className="grid grid-cols-4 gap-3 lg:grid-cols-5"
        
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
                  <h4 className="f4 fw8 mt2 mb0 ttu">{node.name} kjh</h4>
                </a>
                <h4 className="f5 fw6 mt1 pt1 ">{formatPrice(node.price)}</h4>
              </Link>
            )
          })}{" "}
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage
