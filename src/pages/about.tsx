import Layout from "../components/layout";
import SEO from "../components/seo";

import React from "react";

const ProductPage = () => (
  <Layout>
    <SEO title="FAQ" />
    <div className="pv3 mv3 ">
      <h1 className="fw3 mb-3 pb-3 text-3xl cubano text-center f1">Why?</h1>
    </div>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        className="m-auto"
        src="https://www.youtube.com/embed/OsNMur4tqHQ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="mx-8 ">
      <p className="my-2">
        Our mission has been very clear from the beginning. Destigmatize
        Marijuana and Rebrand Cannabis. We are are a cultural hub.
      </p>
      <p className="my-2">
        Since July 2015, we have embraced that notion. From Walkathons in
        collaboration with CURE, to an Art Show with an emphasis on local
        talent, to a full fledged juice outfit geared to set foot in every major
        city, to Book Drives for the youth, HighSpeed is determined to establish
        a new frontier. We pride ourselves on being innovators in spaces that
        have been limited for years!
      </p>
      <p className="my-2 text-bold">More questions? tryhighspeed@gmail.com</p>
    </div>
    <div className=" tc center">
      {/* <video
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
       */}
    </div>
  </Layout>
);

export default ProductPage;
