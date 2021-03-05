import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import Img from "gatsby-image";

import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { WooProduct } from "../lib/types";

interface ProductPageProps {
  pageContext: {
    title: string;
    wordId: string;
    price: string;
    image: any;
  };
}
const ProductPage: React.FC<ProductPageProps> = ({ pageContext }) => {
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
  `);
  const { node } = allWcProducts.edges.filter(
    (product: WooProduct) => product.node.wordpress_id === pageContext.wordId
  )[0];
  const { images } = node;
  console.log(pageContext, allWcProducts, node);
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <div className="ml-8 mr-8">
        <div className="flex flex-row">
          <Img
            className="w-full mr-5"
            fluid={images[0].localFile.childImageSharp.fluid}
          />
          <div className="ml-5 rounded-lg w-full cubano bg-gray-500 p-5">
            <h1 className="text-3xl mb-4">{pageContext.title}</h1>
            <div
              className="pt2-ns mt2 pt1 pb-3 lh-title "
              dangerouslySetInnerHTML={{ __html: node.description }}
            />
            <div className="pb-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="pb-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <button>{formatPrice(pageContext.price)}</button>
          </div>
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
  );
};

export default ProductPage;
