import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import { File, WooProduct } from "../lib/types";
import styled from "styled-components";
import App from "../components/App";
const headers = "text-3xl gt mb-8";

const Slider = styled.div`
  height: 50px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 960px;
  margin: auto;
`;

const Text = styled.div`
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;

  /* Starting position */
  -moz-transform: translateX(0%);
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
  /* Apply animation to this element */
  -moz-animation: scroll-left 25s linear infinite;
  -webkit-animation: scroll-left 25s linear infinite;
  animation: scroll-left 25s linear infinite;
  /* Move it (define the animation) */
  @-moz-keyframes scroll-left {
    0% {
      -moz-transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(calc(-250px * 7));
    }
  }
  @-webkit-keyframes scroll-left {
    0% {
      -webkit-transform: translateX(100%);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
    }
  }
  @keyframes scroll-left {
    0% {
      -moz-transform: translateX(100%); /* Browser bug fix */
      -webkit-transform: translateX(100%); /* Browser bug fix */
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(calc(-250px * 7)); /* Browser bug fix */
      -webkit-transform: translateX(calc(-250px * 7)); /* Browser bug fix */
      transform: translateX(calc(-250px * 7));
    }
  }
`;
const IndexPage: React.FunctionComponent = () => {
  const {
    allWcProducts: { edges },
    allFile,
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
            short_description
            status
            slug
            images {
              src
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
            product_variations {
              id
              price
              attributes {
                name
                option
              }
            }
          }
        }
      }
      file(name: { eq: "tabletophighspeed" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "press" } }) {
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
  `);
  const [emailAddress, setEmailAddress] = useState("");
  // console.log(edges.filter((edge: WooProduct) => !edge.node.categories));
  // console.log(emailAddress);
  return (
    <App>
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
          <h3 className={headers}>Shop the Products You Love</h3>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mx-8 mb-32">
          {edges
            .filter((edge) => edge.node.status === "publish")
            .map((edge) => {
              const { node } = edge;
              return (
                <Link
                  to={`/products/${node.slug}`}
                  className="box-border bg-gray-500 rounded-lg px-5 py-4 h-full"
                  key={node.wordpress_id}
                >
                  <div className="flex">
                    <span className="black no-underline">
                      <h3 className="text-xl w-2/3 fw8 pl-2 mt2 mb0 ttu cubano">
                        {node.name}
                      </h3>
                    </span>
                    {node.images[0].localFile ? (
                      <Img
                        className="object-none w-1/3 float-right w-24 "
                        fluid={node.images[0].localFile.childImageSharp.fluid}
                      />
                    ) : (
                      <img
                        className=" w-1/3 float-right w-24 cover "
                        src={node.images[0].src}
                      />
                    )}
                  </div>
                  <div className="gt">
                    <p
                      className="mt-6 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: node.short_description,
                      }}
                    />
                    <h4 className="float-left f5 fw6 mt1 pt1 text-gray-300">
                      {formatPrice(node.price)}
                    </h4>
                    <button className="float-right">SHOP</button>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="ml-8 pb-5">
          <h3 className={headers}>As Featured In</h3>
        </div>
        <Slider>
          <Text>
            {allFile.edges.map((logo: File, id: number) => {
              console.log(logo.node.childImageSharp);
              return (
                <Img
                  key={id}
                  style={{ filter: "grayscale(100%)" }}
                  className="mr-5 mb-5"
                  fixed={logo.node.childImageSharp.fixed}
                />
              );
            })}
          </Text>
        </Slider>
        <div className="py-16 bg-gray-500 flex">
          <div className="float-left">
            <h3 className="text-3xl mb-5 pb-4 cubano text-center w-50">
              <span className="line-through">Cannabis</span> Plant Delivery,
              made simple.
            </h3>
          </div>
          <div className="float-right">
            <p>Subscribe to get some serious deals to rock your day.</p>
            <input
              className="p-1"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email Address"
            />
            <button className="text-center text-white bg-black p-1">
              <span className="gt pl-3 pr-3">Subscribe</span>
            </button>
          </div>
        </div>
      </Layout>
    </App>
  );
};
export default IndexPage;
