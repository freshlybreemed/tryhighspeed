// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"

const Header = () => (
  <header className="">
    <div className='flex space-x-10 p-5 font-medium gt'>
    <div className="inline-block">
      {/* <a
        href="/about"
        className={` `}
      > */}
        About
      {/* </a> */}
    </div>
    <div className="inline-block">
      {/* <a
        href="/shop"
        className={`f`}
        > */}
        Shop
      {/* </a> */}
    </div>
    <div className="inline">
      <a
        href="/faq"
        className={``}
      >
        FAQ
      </a>
    </div>
    <div className="inline">

      <a
        href="/cart"
        className={``}
      >
        Cart
      </a>
    </div>
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
