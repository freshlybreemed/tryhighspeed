// import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Img from "gatsby-image";

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
  return (
    <header className="">
      <div className="flex space-x-10 p-5 font-medium gt">
        <div className="inline-block">
          <a href="/" className={` `}>
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
        <div className="ml-auto">
          <a href="/cart" className={"black "}>
            <span>
              <svg
                style={{ width: "25px", height: "23px" }}
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
            </span>
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
  );
};
Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
