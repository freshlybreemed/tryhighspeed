import React, { useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import { useCartContainer } from "../containers/cartContainer";
import { useAppContainer } from "../containers/appContainer";
import { WooProduct } from "../lib/types";
import { formatPrice } from "../lib";

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
  // const [aeroReady, setAeroReady] = useState(false);
  const { lineItems, removeFromCart } = useCartContainer();
  const { headerHeight, setHeaderHeight } = useAppContainer();

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

  const getSubtotal: number = items.reduce(
    (prev, item) => parseInt(item.price) + prev,
    0
  );

  useEffect(() => {
    if (document) {
      const header = document.getElementById("header");
      setHeaderHeight(header?.clientHeight || 0);
    }
  });

  return (
    <Layout>
      <div className="mx-8">
        <SEO title="Home" />
        <div style={{ height: `${headerHeight}px`, width: 0 }} />

        <h1 className={headers}>Your Shopping Cart</h1>
        <div className="w-11/12 rounded-lg bg-gray-500 w-full p-4">
          {lineItems.length ? (
            <div>
              <table className="min-w-full m-4">
                <thead>
                  <tr className="text-left cubano">
                    <th>Product</th>
                    <th>Total</th>
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
                              className="sm:w-10 w-8"
                              fluid={
                                product.images[0].localFile.childImageSharp
                                  .fluid
                              }
                            ></Img>
                            <div className="pl-2">
                              <p className="text-sm">{product.name}</p>
                              {product.variant.attributes.map((attr) => {
                                return (
                                  <p className="text-xs text-gray-600 font-semibold">
                                    {attr.option}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="text-xs">
                          {formatPrice(product.price)}
                        </td>
                        <td className="text-xs">
                          <button
                            className="p-2 bg-black text-white rounded"
                            onClick={() => removeFromCart(key)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3>Subtotal</h3>
              <h3>{formatPrice(getSubtotal.toString())}</h3>
              {/* {aeroReady && <div id="aeropay-button-container" />} */}
              <Link to="/checkout" className="float-right">
                <button className="bg-black text-white py-2 px-4 rounded gt ">
                  Checkout
                </button>
              </Link>
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
                className="flex  items-end flex-row-reverse"
              >
                <Link to="/shop">
                  <button className="bg-black text-white py-2 px-4 rounded gt ">
                    Go Shop
                  </button>
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
        <br />
      </div>
    </Layout>
  );
};
export default CartPage;
