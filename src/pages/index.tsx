import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPrice } from "../lib"

const IndexPage: React.FunctionComponent = () => {
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
            description
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
        <h1 className="text-5xl pb-5 cubano">Wellness, Delivered</h1>
        <h3 className="text-2xl gt">Now Serving DC + Boston + NYC</h3>
      </div>
      <div className="ml-8 pb-5">
        <h3 className="text-3xl gt">Shop the Products You Love</h3>
      </div>
      <div
        className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ml-8 mr-8 mb-8"
      >
        {edges.map(edge => {
          const { node } = edge
          return (
            <Link
              to={`/products/${node.wordpress_id}`}
              className="box-border bg-gray-500 rounded-lg p-2"
              key={node.wordpress_id}
            >
              <div className='flex'>

                <a
                  href={`/products/${node.wordpress_id}`}
                  className="black no-underline"
                  >
                  <h4 className="f4 fw8 pl-2 mt2 mb0 ttu cubano">{node.name}</h4>
                </a>
                <Img
                  className="object-scale-down float-right object-right-top bg-yellow-300 w-24 h-24 "
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  />
              </div>
              <div className="flex gt">
                <p className="mt-6 mb-3" dangerouslySetInnerHTML={{ __html: node.description }} />
                <h4 className="float-left f5 fw6 mt1 pt1 text-gray-300">{formatPrice(node.price)}</h4>
                <button className="float-right">SHOP</button>
              </div>
            </Link>
          )
        })}
      </div>
      <div className='ml-8 pb-5'>
        <h3 className="text-3xl mb-5 pb-4 gt" >As Featured In</h3>
        {allFile.edges.map((logo)=>{
          console.log(logo.node.childImageSharp)
          return (
            <Img 
              style={{ filter: 'grayscale(100%)'}}
              className="mr-5 mb-5" 
              fixed={logo.node.childImageSharp.fixed} 
            />
          )
        })}
      </div>
      <div className='pt-16 pb-16 bg-gray-500'>
        <h3 className="text-3xl mb-5 pb-4 cubano text-center">The Amazon of Weed Delivery</h3>
        <input className="p-1" placeholder="Email Address"/>
        <button className="text-center text-white bg-black p-1"><span className="gt pl-3 pr-3">Subscribe</span></button>
      </div>
    </Layout>
  )
}
export default IndexPage
