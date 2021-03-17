import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import { useCartContainer } from "../components/cartContainer";
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
      price: variant.price,
      variant,
      speed,
      ...item,
    };
  });
  console.log(items);
  // edges.filter(product=> product.id lineItems.indexOf())
  return (
    <Layout>
      <div className="pl2 ml2 ">
        <SEO title="Home" />
        <div className="pv3 mv3 ">
          <h1 className="fw3 mb-3 pb-3 text-3xl cubano text-center f1">
            Your Shopping Cart
          </h1>
        </div>
        <div className="w-11/12 rounded-lg bg-white m-auto p-4">
          {lineItems.length ? (
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
                                product.images[0].localFile.childImageSharp
                                  .fluid
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
                        <td className="text-xs">{product.speed.option}</td>
                        <td className="text-xs">
                          {formatPrice(product.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Link to="/checkout">
                <button className="bg-black text-white py-2 px-4 rounded gt text-right">
                  Checkout
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-center text-lg gt">Cart is empty :(</p>
              <Link to="/shop">
                <button className="bg-black text-white py-2 px-4 rounded gt text-right">
                  Go Shop
                </button>
              </Link>
            </div>
          )}
        </div>
        <br />
      </div>
    </Layout>
  );
};
export default CartPage;
