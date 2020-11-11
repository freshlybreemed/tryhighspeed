import Layout from "../components/layout"
import SEO from "../components/seo"

import React from "react"

const ProductPage = () => (
  <Layout>
    <SEO title="FAQ" />
    <div className=" tc center">
      <video
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          top: 0,
          left: 0,
        }}
        className="dib w-100  x y top left"
        loop
        autoPlay
      >
        <source
          data-src="https://player.vimeo.com/external/390337451.sd.mp4?s=57bbabbfdacf56f707d2e92b084477c7a187b1f7&amp;profile_id=165"
          src="https://player.vimeo.com/external/390337451.sd.mp4?s=57bbabbfdacf56f707d2e92b084477c7a187b1f7&amp;profile_id=165"
          type="video/mp4"
        />
      </video>
      <article>
        <div></div>
        <h3>SPinach</h3>
      </article>
    </div>
  </Layout>
)

export default ProductPage
