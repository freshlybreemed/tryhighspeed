// import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";
import Img from "gatsby-image";
import { useCartContainer } from "../components/cartContainer";

const Header = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(name: { eq: "logo-circle" }) {
        childImageSharp {
          fixed(height: 50, width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { lineItems } = useCartContainer();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const emptyCart = lineItems.length === 0;
  return (
    <header className="max-w-7xl">
      <div className="flex items-center justify-between p-5 font-medium gt">
        <div className="sm:flex items-center space-x-10 text-xl  hidden">
          <div className="inline-block">
            <a href="/" className={``}>
              <Img
                className="object-none w-1/3 float-right w-24 "
                fixed={file.childImageSharp.fixed}
              />
            </a>
          </div>
          <div className="inline-block">
            <a href="/about" className={` `}>
              About
            </a>
          </div>
          <div className="inline-block">
            <a href="/shop" className={`f`}>
              Shop
            </a>
          </div>
          <div className="inline">
            <a href="/faq" className={``}>
              FAQ
            </a>
          </div>
        </div>
        <button
          style={{ outline: "none" }}
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          className={`hamburger hamburger--collapse p-0 sm:hidden ${classnames({
            "is-active": hamburgerOpen,
          })}`}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <div
          className={`inline-block mx-auto ${classnames({
            "pr-5": emptyCart,
          })} sm:hidden`}
        >
          <a href="/" className={``}>
            <Img
              className="object-none w-1/3 float-right w-24 "
              fixed={file.childImageSharp.fixed}
            />
          </a>
        </div>
        {!emptyCart && (
          <div className="block">
            <div className="flex items-center">
              <a href="/cart" className={"black "}>
                <span className="relative ">
                  <svg
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 24.3"
                  >
                    <path
                      d="M22.4,17.5l3.2-12.9c0-0.1,0-0.1,0-0.2c0-0.3-0.3-0.6-0.6-0.6H6.4L5.8,1.1C5.7,0.8,5.5,0.6,5.2,0.6h-4
                    c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h3.5l0.6,2.7c0,0,0,0.1,0,0.1l2.5,10.2l1.1,4.6c-0.7,0.4-1.2,1.1-1.2,2
                    c0,1.3,1,2.3,2.3,2.3c1,0,1.9-0.7,2.2-1.7l5.9,0c0.3,1,1.1,1.6,2.1,1.6c1.3,0,2.3-1,2.3-2.3c0-1.3-1-2.3-2.3-2.3
                    c-1,0-1.9,0.7-2.2,1.7l-5.8,0C12,19.7,11.1,19,10.1,19l-0.3-1.1h11.9C22.1,17.9,22.3,17.7,22.4,17.5z M19.2,5h5l-0.9,3.6H19L19.2,5z
                    M18.9,9.9H23l-0.9,3.6h-3.4L18.9,9.9z M7.6,8.6L7.1,6.4L6.7,5h5L12,8.6H7.6z M8.8,13.4L7.9,9.9H12l0.2,3.6H8.8z M9.6,16.7l-0.5-2
                    h3.2l0.1,2H9.6z M17.3,16.7h-3.6l-0.1-2h3.9L17.3,16.7z M17.5,13.4h-4l-0.2-3.6h4.4L17.5,13.4z M17.8,8.6h-4.6L13,5h5L17.8,8.6z
                    M18.5,16.7l0.1-2h3.2l-0.5,2H18.5z"
                    ></path>
                  </svg>
                  <span
                    style={{ top: "-0.8rem", right: "-2.8rem" }}
                    className={"text-sm font-semibold absolute"}
                  >
                    {!emptyCart && lineItems.length}
                  </span>
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
