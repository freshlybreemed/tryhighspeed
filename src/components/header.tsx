// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"

const Header = () => (
  <header className="bg-white ba bw15 pb1 center flex items-center  w-100 ">
    <div className="list dtc w-100 v-mid ph3 tl mv0">
      <a
        href="/about"
        className={` fw4 v-mid black link no-underline pb2 dib mr3 mr4-ns `}
      >
        About
      </a>
      <a
        href="/shop"
        className={`fw4 v-mid  black link no-underline pb2 dib mr3 mr4-ns `}
      >
        Shop
      </a>
    </div>
    <a className="pt2 " href="/">
      <Image />
    </a>

    <div className="list dtc w-100 v-mid ph3 tr mv0">
      <a
        href="/faq"
        className={`fw4 black v-mid  link no-underline pb2 dib mr3 mr4-ns `}
      >
        FAQ
      </a>
      <a
        href="/cart"
        className={`fw4 black v-mid link no-underline pb2 dib mr3 mr4-ns `}
      >
        Cart
      </a>
    </div>
    {/* <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            // color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div> */}
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
