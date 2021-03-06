import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import Img from "gatsby-image";
import { useProductContainer } from "./productContainer";
import React, { useEffect } from "react";
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
            short_description
            images {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              src
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
    }
  `);
  const {
    setProduct,
    setOptions,
    setSpeed,
    setAmount,
    setSpeeds,
    setProductVariants,
    speeds,
    productVariants,
    amount,
    speed,
    currentProductVariant,
    currentProductVariantId,
    selectProductVariant,
    options,
  } = useProductContainer();

  const { node } = allWcProducts.edges.filter(
    (product: WooProduct) => product.node.wordpress_id === pageContext.wordId
  )[0];

  useEffect(() => {
    setProduct(node);
    setOptions(node);
    setSpeeds(node);
    setSpeed(node.product_variations[0].attributes[1].option);
    setAmount(node.product_variations[0].attributes[0].option);
    setProductVariants(node);
  }, [node]);

  useEffect(() => {
    selectProductVariant({ amount, speed });
  }, [productVariants, amount, speed]);

  // const addToCart = () => {
  //   const lineItem = {
  //     product_id: node.wordpress_id,
  //     variation_id: currentProductVariantId,
  //     quantity: 1,
  //   };
  // };
  const { images } = node;
  console.log(pageContext, allWcProducts, node);
  console.log(amount, speed, currentProductVariant, currentProductVariantId);
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <div className="ml-8 mr-8">
        <div className="flex flex-row">
          {node.images[0].localFile ? (
            <Img
              className="w-full mr-5"
              fluid={images[0].localFile.childImageSharp.fluid}
            />
          ) : (
            <img className=" w-1/3 mr-5" src={node.images[0].src} />
          )}
          <div className="ml-5 rounded-lg w-full cubano bg-gray-500 p-5">
            <h1 className="text-3xl mb-4">{pageContext.title}</h1>
            <p
              className="pt2-ns mt2 pt1 pb-3 text-xl gt"
              dangerouslySetInnerHTML={{ __html: node.short_description }}
            />
            <div className="pb-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <select
                id="amount"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {options.map((variant) => {
                  return <option value={variant}>{variant}</option>;
                })}
              </select>
            </div>
            <div className="pb-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Speed
              </label>
              <select
                id="country"
                name="country"
                onChange={(e) => setSpeed(e.target.value)}
                // onChange={(e) => console.log(e.target.value)}
                autoComplete="country"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {speeds.map((speed) => (
                  <option value={speed}>{speed}</option>
                ))}
              </select>
            </div>
            <button className="bg-black text-white w-full p-3 rounded-md">
              Add to Cart{" "}
              {currentProductVariant.length &&
                ` - 
                ${formatPrice(currentProductVariant[0].price)}`}
            </button>
          </div>
        </div>
      </div>
      <div
        className="pt2-ns mt2 pt1 pb-3 gt px-5 text-xl pt-4 mt-4 text-xl"
        dangerouslySetInnerHTML={{ __html: node.description }}
      />
    </Layout>
  );
};

export default ProductPage;
