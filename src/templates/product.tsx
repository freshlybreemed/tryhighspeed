import Layout from "../components/layout"
import SEO from "../components/seo"

import React from "react"

const ProductPage = data => {
  console.log(data)
  return (
    <Layout>
      <SEO title={data.pageContext.title} />
    </Layout>
  )
}

export default ProductPage
