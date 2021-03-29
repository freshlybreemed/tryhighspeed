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
const headers = "text-3xl gt mt-8";

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
    setAddedToCart,
    addedToCart,
    productVariants,
    options,
    setOption,
    currentProductVariant,
    selectProductVariant,
    lineItems,
    addToCart,
  } = useProductContainer();

  const { node }: { node: WooProduct } = allWcProducts.edges.filter(
    (product: AllWcProducts) => product.node.slug === pageContext.slug
  )[0];

  useEffect(() => {
    setProduct(node);
  }, [node]);

  useEffect(() => {
    if (options) {
      selectProductVariant(options);
    }
  }, [productVariants, options]);

  const addItem = () => {
    const lineItem = {
      product_id: node.wordpress_id,
      variation_id: currentProductVariant.id,
      quantity: 1,
    };
    addToCart(lineItem);
    setAddedToCart();
    console.log(lineItems);
  };

  const { images } = node;
  const buttonText = !productVariants.length
    ? "Sold Out"
    : addedToCart
    ? "Added to Cart!"
    : `Add to Cart
                ${
                  currentProductVariant &&
                  ` - 
                  ${formatPrice(currentProductVariant.price)}`
                }`;
  console.log(productVariants, allWcProducts, node);
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <div className="mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {node.images[0].localFile ? (
            <Img
              className="md:w-full w-3/4 mx-auto md:mr-5 mb-5 md:mb-0"
              fluid={images[0].localFile.childImageSharp.fluid}
            />
          ) : (
            <img className=" md:w-1/3 w-3/4 md:mr-5" src={node.images[0].src} />
          )}
          <div className="md:ml-5 w-3/4 rounded-lg md:w-full mx-auto cubano bg-gray-500 p-5">
            <h1 className="text-3xl mb-4">{node.name}</h1>
            <p
              className="pt2-ns mt2 pt1 pb-3 text-xl gt"
              dangerouslySetInnerHTML={{ __html: node.short_description }}
            />
            <div className="flex flex-col items-start">
              {Object.keys(options).map((option: string) => {
                return (
                  <div className="pb-2 w-full">
                    <label
                      htmlFor="country"
                      className="block text-md font-medium text-gray-700"
                    >
                      {option}
                    </label>
                    <select
                      id="amount"
                      name="amount"
                      onChange={(e) =>
                        setOption({ name: option, option: e.target.value })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
                    >
                      {options[option].map((variant, id) => {
                        return (
                          <option key={id} value={variant}>
                            {variant}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
              <button
                onClick={addItem}
                className="bg-black text-white w-full p-3 rounded-md"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-8 text-left">
        <h3 className={headers}>Description</h3>
      </div>{" "}
      <div
        className="pt2-ns mt2 pt1 pb-3 gt px-5 text-xl pt-4 mt-4 text-xl"
        dangerouslySetInnerHTML={{ __html: node.description }}
      />
    </Layout>
  );
};

export default ProductPage;
