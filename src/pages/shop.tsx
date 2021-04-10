import React, { useState, useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import { WooProduct } from "../lib/types";
import App from "../components/App";
import { useAppContainer } from "../containers/appContainer";

const headers =
  "fw3 pt-10 mt-10 mb-5 text-3xl cubano text-center sm:text-left f1";

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
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);
  const { headerHeight, setHeaderHeight } = useAppContainer();

  useEffect(() => {
    if (document) {
      const header = document.getElementById("header");
      setHeaderHeight(header?.clientHeight || 0);
    }
  });

  return (
    <App>
      <Layout>
        <SEO title="Shop" />
        <div style={{ height: `${headerHeight}px`, width: 0 }} />

        <div className="mx-8">
          <h3 className={headers}>Shop the Products You Love</h3>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mx-8 mb-32">
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
                  <div className="flex justify-between">
                    <span className="black no-underline w-2/3 pr-2">
                      <h3 className="text-2xl sm:text-xl fw8 mt2 mb0 ttu cubano">
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
                  <div>
                    <div
                      className="mt-6 mb-3 gt  text-xl sm:text-lg md:text-xl"
                      dangerouslySetInnerHTML={{
                        __html: node.short_description,
                      }}
                    />
                  </div>
                  <div className="gt flex justify-between items-baseline">
                    <h4 className="float-left f5 fw6 mt1 pt1 text-gray-300">
                      {formatPrice(node.price)}
                    </h4>
                    <button className="float-right bg-black rounded-sm py-1 px-3 text-white">
                      SHOP
                    </button>
                  </div>
                </Link>
              );
            })}
        </div>
      </Layout>
    </App>
  );
};
export default IndexPage;
