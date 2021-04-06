/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Header from "./header";
import "./styles.css";
import "./hamburgers.min.css";
import { useAppContainer } from "../containers/appContainer";
import styled from "styled-components";
import classnames from "classnames";
// import "./glider.min.css"
// import "./glider.js"

const SlidingMenu = styled.div`
  ${(props) =>
    props.show
      ? `
  transform: translate3d(0vw, 0, 0);
  overflow: hidden;
  `
      : `
      overflow: auto;
    transform: translate3d(-100vw, 0, 0);
      `}
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
`;

const Layout = ({ children }) => {
  const { site, file } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "logo-circle" }) {
        childImageSharp {
          fixed(height: 50, width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { slidingMenuOpen, setSlidingMenuOpen } = useAppContainer();
  return (
    <div className="bg-white-300 font-sans gt h-full">
      <script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <script src="https://online.aeropay.com/apsdk/aeropay.js"></script>
      <div className="pt0">
        <Header siteTitle={site.siteMetadata?.title || `Title`} />
      </div>
      <div>
        <main>{children}</main>

        <SlidingMenu className="max-w-7xl" show={slidingMenuOpen}>
          <div className="flex mx-5  items-center justify-end py-5 font-medium gt">
            <div className={`inline-block mx-auto  sm:hidden`}>
              <a href="/" className={``}>
                <Img
                  className="opacity-0 object-none w-1/3 float-right w-24 "
                  fixed={file.childImageSharp.fixed}
                />
              </a>
            </div>
            <button
              style={{ outline: "none" }}
              onClick={setSlidingMenuOpen}
              className={`p-0 hamburger hamburger--collapse sm:hidden ${classnames(
                {
                  "is-active": slidingMenuOpen,
                }
              )}`}
              type="button"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
          <div className="text-xl gt pb-4">
            <div className="mb-4 ml-5">
              <h3 className="pb-2">
                <a href="/about">About</a>
              </h3>
              <h3 className="pb-2">
                <a href="/">Cities</a>
              </h3>
              <h3 className="pb-2">
                <a href="/faq">FAQ</a>
              </h3>
            </div>
          </div>
        </SlidingMenu>
        <footer className="mt-40 pb-4">
          <div className="flex mb-4">
            <ul className="list-none gt  ml-5">
              <li>About</li>
              <li>Cities</li>
            </ul>
            <ul className="list-none gt ml-8">
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="instagram.com/tryhighspeed">Instagram</a>
              </li>
              <li>
                <a href="twitter.com/tryhighspeed">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="text-center gt text-sm ">
            © {new Date().getFullYear()}, High Speed Inc. All Rights Reserved
          </div>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
