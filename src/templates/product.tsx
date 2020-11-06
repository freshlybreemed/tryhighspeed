import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPrice } from "../lib"

import React from "react"

const ProductPage = ({ pageContext }) => {
  console.log(pageContext)
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <h1>
        {pageContext.title} {formatPrice(pageContext.price)}
      </h1>
    </Layout>
  )
}

export default ProductPage
