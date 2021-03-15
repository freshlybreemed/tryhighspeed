import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
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
    const price = item.product_variations.filter(
      (vari) => vari.id === line.variation_id
    )[0].price;
    return {
      ...line,
      price,
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
          <h1 className="fw3 f1">Your Shopping Cart</h1>
        </div>
        <table className="min-w-full ">
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th>Speed</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => {
              return (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.product_id}</td>
                  <td>{formatPrice(product.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="tc f3 fw3">Your shopping cart is empty</p>
        <Link to="/checkout">Checkout</Link> <br />
      </div>
    </Layout>
  );
};
export default CartPage;
