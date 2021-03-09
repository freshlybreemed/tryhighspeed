import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { useCartContainer } from "../components/cartContainer";
import { WooProduct } from "../lib/types";

type Products = {
  allWcProducts: {
    edges: WooProduct[];
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
          }
        }
      }
    }
  `);
  const { cart, lineItems } = useCartContainer();
  console.log(edges, lineItems);
  const items = lineItems.map((line) => {
    const item = edges.filter((prod) => prod.id === line.product_id);
    return {
      ...line,
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
            {lineItems.map((product) => {
              return (
                <tr>
                  <td>{product.product_id}</td>
                  <td>{product.product_id}</td>
                  <td>{product.product_id}</td>
                  <td>{product.product_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="tc f3 fw3">Your shopping cart is empty</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/checkout">Checkout</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </div>
    </Layout>
  );
};
export default CartPage;
