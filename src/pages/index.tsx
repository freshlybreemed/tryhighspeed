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
    allFile
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
      allFile(filter: {relativeDirectory: {eq: "press"}}) {
        edges {
          node {
            id
            name
            relativeDirectory
            childImageSharp {
              id
              fixed(height: 30) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)
  console.log(edges,allFile)
  return (
    <Layout>
      <SEO title="Home" />
      {/* <img
        className="w-70 db center"
        src="https://tryhighspeed.com/wp-content/uploads/2019/05/tabletophighspeed.jpg"
      /> */}
      <div className="mt-32 mb-32 pt-32 pb-32 ml-8">
        <h1 className="text-5xl pb-5">Wellness, Delivered</h1>
        <h3 className="text-2xl">Now Serving DC + Boston + NYC</h3>
      </div>
      <div className="ml-8 pb-5">
        <h3 className="text-2xl">Shop the Products You Love</h3>
      </div>
      <div
        className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ml-8 mr-8 mb-8"
      >
        {edges.map(edge => {
          const { node } = edge
          return (
            <Link
              to={`/products/${node.wordpress_id}`}
              className="box-border border-2 border-black bg-gray-500 rounded-lg p-2"
              key={node.wordpress_id}
            >
              <div className='flex'>

              <a
                href={`/products/${node.wordpress_id}`}
                className="black no-underline"
                >
                <h4 className="f4 fw8 mt2 mb0 ttu">{node.name}</h4>
              </a>
              <Img
                className="object-scale-down object-right-top bg-yellow-300 w-24 h-24 "
                fluid={node.images[0].localFile.childImageSharp.fluid}
                />
                </div>
              <h4 className="f5 fw6 mt1 pt1 text-gray-300">{formatPrice(node.price)}</h4>
            </Link>
          )
        })}
      </div>
      <div className='ml-8 pb-5'>
        <h3 className="text-2xl mb-5 pb-4">As Featured In</h3>
        {allFile.edges.map((logo)=>{
          console.log(logo.node.childImageSharp)
          return (
            <Img 
              style={{ filter: 'grayscale(100%)'}}
              className="mr-5" 
              fixed={logo.node.childImageSharp.fixed} 
            />
          )
        })}
      </div>
    </Layout>
  )
}
export default IndexPage
