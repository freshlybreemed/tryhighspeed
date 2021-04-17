import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Header from "./header";
import "./styles.css";
import "./hamburgers.min.css";
import { useAppContainer } from "../containers/appContainer";
import styled from "styled-components";
import classnames from "classnames";

interface SlidingProps {
  show: boolean;
}

interface LayoutProps {
  children: any;
}
const SlidingMenu = styled.div<SlidingProps>`
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

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
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
  const {
    slidingMenuOpen,
    setSlidingMenuOpen,
    headerHeight,
    setHeaderHeight,
  } = useAppContainer();

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScroll);
    }
  });
  useEffect(() => {
    if (document && slidingMenuOpen) {
      const header = document.getElementById("header");
      console.log(header);
      setHeaderHeight(header?.clientHeight || 0);
    }
  });
  const handleScroll = () => {
    setHeaderHeight(window?.pageYOffset);
  };

  return (
    <div className="bg-white-300 font-sans gt h-full">
      <script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <script src="https://online.aeropay.com/apsdk/aeropay.js"></script>
      <Header siteTitle={site.siteMetadata?.title || `Title`} />

      <main className="z-0">{children}</main>

      <SlidingMenu
        className="max-w-7xl bg-black text-white"
        show={slidingMenuOpen}
        style={{ transition: "0.2s ease" }}
      >
        <div style={{ height: `${headerHeight}px`, width: 0 }} />
        <div className="text-5xl leading-10 cubano py-4">
          <div className="mb-4 ml-5">
            <h3 className="pb-2 mb-2">
              <a href="/about">About</a>
            </h3>
            <h3 className="pb-2 mb-2">
              <a href="/shop">Shop</a>
            </h3>
            <h3 className="pb-2 mb-2">
              <a href="/">Cities</a>
            </h3>
            <h3 className="pb-2 mb-2">
              <a href="/faq">FAQ</a>
            </h3>
          </div>
        </div>
      </SlidingMenu>
      <footer className="mt-40 pb-4 text-xl gt">
        <div className="flex mb-4">
          <ul className="list-none ml-5">
            <li>About</li>
            <li>Cities</li>
          </ul>
          <ul className="list-none  ml-8">
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
        <div className="text-center text-sm ">
          © {new Date().getFullYear()}, High Speed Inc. All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
