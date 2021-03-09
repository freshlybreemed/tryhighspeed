import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { useCartContainer } from "../components/cartContainer";

const CartPage = () => {
  const {
    allWcProducts: { edges },
  } = useStaticQuery(graphql`
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
  console.log(cart, lineItems);
  return (
    <Layout>
      <div className="pl2 ml2 ">
        <SEO title="Home" />
        <div className="pv3 mv3 ">
          <h1 className="fw3 f1">Your Shopping Cart</h1>
        </div>
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
