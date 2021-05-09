import Layout from "../components/layout";
import SEO from "../components/seo";
import React from "react";
import { UserCheckout } from "../components/userCheckoutForm";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { useCartContainer } from "../containers/cartContainer";
import { WooProduct } from "../lib/types";
import { formatPrice, getSubtotal } from "../lib";
import App from "../components/App";
import { Button } from "../lib/styles";

type Products = {
  allWcProducts: {
    edges: [
      {
        node: WooProduct;
      }
    ];
  };
};
const headers =
  "fw3 pt-10 mt-10 mb-5 text-3xl cubano text-center sm:text-left f1";

const CartPage = () => {
  const {
    allWcProducts: { edges },
  }: Products = useStaticQuery(graphql`
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
    }
  `);
  const { cart, lineItems } = useCartContainer();
  console.log(edges, lineItems);
  const items = lineItems.map((line) => {
    const item = edges.filter(
      (prod) => prod.node.wordpress_id === line.product_id
    )[0].node;
    const variant = item.product_variations.filter(
      (vari) => vari.id === line.variation_id
    )[0];
    const speed = variant.attributes.filter((attr) => attr.name === "Speed")[0];
    variant.attributes = variant.attributes.filter(
      (attr) => attr.name !== "Speed"
    );
    return {
      ...line,
      variant,
      speed,
      ...item,
      price: variant.price,
    };
  });
  console.log(items);
  // edges.filter(product=> product.id lineItems.indexOf())
  return (
    <App>
      <Layout>
        <SEO title="Checkout" />
        <div className="mx-8">
          <h1 className={headers}>Your Shopping Cart</h1>
          <div className="w-11/12 rounded-lg bg-gray-500 w-full p-4">
            {lineItems.length ? (
              <div className="m-4">
                <table className="min-w-full pb-5 mb-5">
                  <thead>
                    <tr className="text-left cubano">
                      <th className="text-sm sm:text-md md:text-lg lg:text-xl">
                        Product
                      </th>
                      <th className="text-sm sm:text-md md:text-lg lg:text-xl">
                        Total
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((product, key) => {
                      return (
                        <tr key={key} className="text-left my-2">
                          <td>
                            <div className="flex items-center">
                              <Img
                                className="sm:w-15 md:w-20 w-12"
                                fluid={
                                  product.images &&
                                  product.images[0].localFile.childImageSharp
                                    .fluid
                                }
                              ></Img>
                              <div className="pl-2">
                                <p className="text-sm sm:text-md md:text-lg lg:text-xl">
                                  {product.name}
                                </p>
                                {product.variant &&
                                  product.variant.attributes.map((attr) => {
                                    return (
                                      <p className="text-xs md:text-sm lg:text-md text-gray-600 font-semibold">
                                        {attr.option}
                                      </p>
                                    );
                                  })}
                              </div>
                            </div>
                          </td>
                          <td className="text-sm sm:text-md md:text-lg lg:text-xl">
                            {formatPrice(product.price)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h3 className="mt-5 pt-5 cubano text-sm sm:text-md md:text-lg lg:text-xl">
                  Subtotal
                </h3>
                <h3 className="text-sm sm:text-md md:text-lg lg:text-xl mb-5">
                  {formatPrice(getSubtotal(items).toString())}
                </h3>
                {/* {aeroReady && <div id="aeropay-button-container" />} */}
                <Link to="/cart" className="mt-5  pt-5">
                  <Button className="bg-black hover:bg-white hover:text-black rounded text-white py-2 px-4 rounded gt ">
                    Go back
                  </Button>
                </Link>
                <UserCheckout />
              </div>
            ) : lineItems.length === 0 ? (
              <div>
                <p className="text-center mt-4 align-middle text-lg gt">
                  Cart is empty :(
                </p>
                <div
                  style={{
                    minHeight: "5rem",
                  }}
                  className=""
                >
                  <Link to="/shop">
                    <Button className="bg-black text-white py-2 px-4 rounded gt ">
                      Go Shop
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <svg
                className="animate-spin mx-auto h-10 w-10 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </div>
        </div>
        <br />
      </Layout>
    </App>
  );
};
export default CartPage;
