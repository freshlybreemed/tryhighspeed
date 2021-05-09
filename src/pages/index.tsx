import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import { File, WooProduct } from "../lib/types";
import styled from "styled-components";
import App from "../components/App";
import axios from "axios";
import { useAppContainer } from "../containers/appContainer";
import { Button } from "../lib/styles";

const headers = "text-3xl cubano mb-5 pt-10 mt-10";

const Slider = styled.div`
  height: 50px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
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

interface HomeProps {
  edges: [
    {
      node: WooProduct;
    }
  ];
  allFile: any;
}
const IndexPage: React.FunctionComponent<HomeProps> = () => {
  const {
    allWcProducts: { edges },
    allFile,
  }: {
    allWcProducts: { edges: HomeProps["edges"] };
    allFile: HomeProps["allFile"];
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
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  `);
  const {
    emailAddress,
    emailSent,
    setEmailAddress,
    setEmailSent,
  } = useAppContainer();

  const subscriber = () => {
    setEmailSent();
    axios.post("/api/subscriber", {
      email: emailAddress,
    });
  };
  const subscriberText = emailSent ? "Thank you!" : "Subscribe";
  return (
    <App>
      <Layout>
        <SEO title="Home" />
        <main
          className="h-full flex items-center py-40 lg:py-48 xl:py-60 pl-10 pr-30 bg-purple-900 text-white relative"
          style={{
            backgroundImage:
              "url('https://tryhighspeed.com/wp-content/uploads/2019/05/tabletophighspeed.jpg')",
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize: "cover",
          }}
        >
          <section className="w-full md:w-9/12 xl:w-8/12">
            <h1 className="sm:text-5xl text-3xl pb-2 sm:pb-5 cubano">
              Wellness, Delivered
            </h1>
            <span className="font-bold sm:text-2xl text-lg gt tracking-wide">
              Now Serving DC + Boston + NYC
            </span>
          </section>
        </main>

        <div className="ml-8">
          <h3 className={headers}>Shop the Products You Love</h3>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mx-8 ">
          {edges
            .filter((edge) => edge.node.status === "publish")
            .map((edge) => {
              const { node } = edge;
              return (
                <Link
                  to={`/products/${node.slug}`}
                  className="box-border bg-gray-500 rounded-lg px-5 py-4 h-full flex flex-col justify-between"
                  key={node.wordpress_id}
                >
                  <div className="flex justify-between">
                    <span className="black no-underline w-2/3 pr-2">
                      <h3 className="text-2xl sm:text-xl fw8 mt2 mb0 ttu cubano">
                        {node.name}
                      </h3>
                    </span>
                    {node.images[0].localFile ? (
                      <Img
                        className="w-1/3 float-right w-24 "
                        fluid={node.images[0].localFile.childImageSharp.fluid}
                        objectFit="contain"
                        objectPosition="50% 50%"
                      />
                    ) : (
                      <img
                        className=" w-1/3 float-right w-24 cover "
                        src={node.images[0].src}
                      />
                    )}
                  </div>
                  <div
                    className="mt-6 mb-3 gt  text-xl sm:text-lg md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: node.short_description,
                    }}
                  />
                  <div className="gt flex justify-between items-baseline">
                    <h4 className="float-left f5 fw6 mt1 pt1 text-gray-300">
                      {formatPrice(node.price)}
                    </h4>
                    <Button className="float-right bg-black rounded-sm py-1 px-3 text-white">
                      SHOP
                    </Button>
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
        <div className="py-8 md:py-14 bg-gray-500 grid grid-cols-1 md:grid-cols-2">
          <div className="sm:w-5/6 text-center mx-auto">
            <h3 className="xl:text-5xl px-3  text-4xl mb-5 pb-4 cubano text-center ">
              <span className="line-through">Cannabis</span> Plant Delivery,
              made simple.
            </h3>
          </div>
          <div className="text-center sm:w-5/6 mx-auto gt">
            <p className="text-xl mx-auto w-5/6 pb-2">
              Subscribe to get some serious deals to rock your day.
            </p>
            <div className="md:mt-0 md:mp-0 pt-2 mt-2">
              <input
                className="p-2 rounded-l rounded-r-none"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
              />
              <Button
                onClick={subscriber}
                className="text-center rounded-r text-white bg-black p-2"
              >
                <span className="gt pl-3 pr-3">{subscriberText}</span>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </App>
  );
};
export default IndexPage;
