import Layout from "../components/layout"
import SEO from "../components/seo"
import React from "react"
import { UserCheckout } from "../components/userCheckoutForm"

const ProductPage = () => {
  return (
    <Layout>
      <SEO title="FAQ" />
      <div className=" tc center">
        <div className="mt4 pt4 mb2 tl">
          <h2
            style={{ borderBottomWidth: "5px" }}
            className="fw3 f2 pb3 bb w-60 tl ml4"
          >
            Secure Checkout
          </h2>
          <UserCheckout />
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage
