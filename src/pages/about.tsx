import Layout from "../components/layout";
import SEO from "../components/seo";

import React from "react";
import App from "../components/App";

const ProductPage = () => (
  <App>
    <Layout>
    <SEO title="FAQ" />
    <div className="overflow-hidden hidden sm:inline-block tc center">
      <video
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          top: 0,
          left: 0,
        }}
        className=""
        loop
        muted
        autoPlay
      >
        <source
          data-src="https://player.vimeo.com/external/390337451.sd.mp4?s=57bbabbfdacf56f707d2e92b084477c7a187b1f7&amp;profile_id=165"
          src="https://clouty.s3.amazonaws.com/highspeed.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div className="pv3 mv3 ">
      <h1 className="fw3 my-3 py-3 text-3xl cubano text-center f1">Why?</h1>
    </div>
    <div className="mx-5 text-xl">
      <p className="my-2 leading-8">
        Our mission has been very clear from the beginning. Destigmatize
        Marijuana and Rebrand Cannabis. We are are a cultural hub.
      </p>
      <p className="my-2 py-2 leading-8">
        Since July 2015, we have embraced that notion. From Walkathons in
        collaboration with CURE, to an Art Show with an emphasis on local
        talent, to a full fledged juice outfit geared to set foot in every major
        city, to Book Drives for the youth, HighSpeed is determined to establish
        a new frontier. We pride ourselves on being innovators in spaces that
        have been limited for years!
      </p>
      <p className="my-2 text-bold">
        More questions?{" "}
        <a className="font-bold" href="mailto:tryhighspeed@gmail.com">
          tryhighspeed@gmail.com
        </a>
      </p>
    </div>
  </Layout>
);

export default ProductPage;
