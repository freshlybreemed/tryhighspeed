import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPrice } from "../lib"

import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const ProductPage = ({ pageContext }) => {
  const { allWcProducts } = useStaticQuery(graphql`
    {
      allWcProducts {
        edges {
          node {
            id
            name
            price
            wordpress_id
            description
            images {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const { node } = allWcProducts.edges.filter(
    product => product.node.wordpress_id === pageContext.wordId
  )[0]
  const { images } = node
  console.log(pageContext, allWcProducts, node)
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <div className="mw6 tc center">
        <div className="mt4 pt4 mb2 tc">
          <img
            className="w-60 db center"
            src={images[0].localFile.childImageSharp.fluid.src}
          />
          <h1 style={{ borderBottomWidth: "5px" }} className=" pb3 bb">
            {" "}
            {pageContext.title}
          </h1>
          <p>{formatPrice(pageContext.price)}</p>
          <div
            className="pt2-ns mt2 pt1 lh-title "
            dangerouslySetInnerHTML={{ __html: node.description }}
          />
        </div>

        <p className="tc">Plants with Love™</p>
        <form className="mw5 center">
          <div className="dib relative noselect w-100 ">
            <div
              style={{ minHeight: "46px" }}
              className="ba pa3 bw15 tc overflow-hidden relative "
            >
              <div
                style={{ letterSpacing: "2px" }}
                className="truncate v-mid ttu fw6 f6 w-100"
              >
                Love
              </div>
            </div>
            <div
              style={{ minHeight: "46px" }}
              className="bl br  pa1  bw15 tc justify-between items-center flex relative "
            >
              <button className="pointer bn w-10 ma2 fw3 bg-transparent">
                -
              </button>
              <input
                style={{ letterSpacing: "2px" }}
                className="truncate v-mid fw6 f6 bn tc w-100"
                defaultValue={1}
              />
              <button className="pointer bn w-10 ma2 fw1 bg-transparent mr2">
                +
              </button>
            </div>
            <div
              style={{ minHeight: "46px" }}
              className="ba pa3 bw15 tc overflow-hidden relative "
            >
              <div
                style={{ letterSpacing: "2px" }}
                className="truncate v-mid ttu fw6 f6 w-100"
              >
                Add to Cart
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ProductPage
