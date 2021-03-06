import Layout from "../components/layout";
import SEO from "../components/seo";
import React from "react";
import { UserCheckout } from "../components/userCheckoutForm";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { useCartContainer } from "../containers/cartContainer";
import { WooProduct } from "../lib/types";
import { formatPrice } from "../lib";
import App from "../components/App";

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
        </div>
        <div className="w-11/12 rounded-lg bg-white m-auto p-4">
          <div>
            <table className="min-w-full m-4">
              <thead>
                <tr className="text-left cubano">
                  <th>Product</th>
                  <th>Speed</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => {
                  return (
                    <tr className="text-left my-2">
                      <td>
                        <div className="flex items-center">
                          <Img
                            className="sm:w-10 md:w-10 w-20"
                            fluid={
                              product.images[0].localFile.childImageSharp.fluid
                            }
                          ></Img>
                          <div className="pl-2">
                            <p className="text-sm">{product.name}</p>
                            {product.variant.attributes.map((attr) => {
                              return <p className="text-xs">{attr.option}</p>;
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="text-xs">{product.speed?.option}</td>
                      <td className="text-xs">{formatPrice(product.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <UserCheckout />
        </div>
        <br />
      </Layout>
    </App>
  );
};
export default CartPage;
