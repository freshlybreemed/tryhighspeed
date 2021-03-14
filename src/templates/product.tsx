import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import Img from "gatsby-image";
import { useProductContainer } from "./productContainer";
import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { AllWcProducts, WooProduct } from "../lib/types";

interface ProductPageProps {
  pageContext: {
    title: string;
    wordId: string;
    slug: string;
    price: string;
    image: any;
  };
}
const headers = "text-3xl gt mb-8";

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
            slug
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
    setSpeed,
    setAmount,
    setAddedToCart,
    addedToCart,
    speeds,
    productVariants,
    amount,
    amounts,
    speed,
    currentProductVariant,
    currentProductVariantId,
    selectProductVariant,
    lineItems,
    addToCart,
    setFlavor,
    flavors,
    flavor,
  } = useProductContainer();

  const { node } = allWcProducts.edges.filter(
    (product: AllWcProducts) => product.node.wordpress_id === pageContext.wordId
  )[0];

  useEffect(() => {
    setProduct(node);
  }, [node]);

  useEffect(() => {
    if (amount && speed) {
      selectProductVariant({ amount, speed });
    }
  }, [productVariants, amount, speed]);

  useEffect(() => {
    if (!speed && speeds.length) {
      setSpeed(speeds[0]);
    }
  }, [speeds]);

  useEffect(() => {
    if (!amount && amounts.length) {
      setAmount(amounts[0]);
    }
  }, [amounts]);

  useEffect(() => {
    if (!flavor && flavors.length) {
      setAmount(flavors[0]);
    }
  }, [amounts]);
  const addItem = () => {
    const lineItem = {
      product_id: node.wordpress_id,
      variation_id: currentProductVariantId,
      quantity: 1,
    };
    addToCart(lineItem);
    setAddedToCart();
    console.log(lineItems);
  };
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
            {amounts && (
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
                  {amounts.map((variant, id) => {
                    return (
                      <option key={id} value={variant}>
                        {variant}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {flavors && (
              <div className="pb-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Flavor
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={(e) => setFlavor(e.target.value)}
                  // onChange={(e) => console.log(e.target.value)}
                  autoComplete="country"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {flavors.map((flavor, id) => (
                    <option key={id} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {speeds && (
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
                    <option key={speed} value={speed}>
                      {speed}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addItem}
              className="bg-black text-white w-full p-3 rounded-md"
            >
              {addedToCart
                ? "Added to Cart!"
                : `Add to Cart
              ${
                currentProductVariant.length &&
                ` - 
                ${formatPrice(currentProductVariant[0].price)}`
              }`}
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
