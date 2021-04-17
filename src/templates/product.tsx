import Layout from "../components/layout";
import SEO from "../components/seo";
import { formatPrice } from "../lib";
import Img from "gatsby-image/withIEPolyfill";
import { useProductContainer } from "../containers/productContainer";
import React, { useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { AllWcProducts, WooProduct } from "../lib/types";
import { Button } from "../lib/styles";

interface ProductPageProps {
  pageContext: {
    title: string;
    wordId: string;
    slug: string;
    price: string;
    image: any;
  };
  edges: [
    {
      node: WooProduct;
    }
  ];
}

const headers = "text-3xl cubano my-8";

const ProductPage: React.FC<ProductPageProps> = ({ pageContext }) => {
  const { allWcProducts } = useStaticQuery(graphql`
    {
      allWcProducts {
        edges {
          node {
            id
            name
            price
            wordpress_id
            slug
            status
            description
            short_description
            images {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              src
            }
            product_variations {
              id
              price
              attributes {
                name
                option
              }
            }
          }
        }
      }
    }
  `);

  const {
    setProduct,
    setAddedToCart,
    addedToCart,
    productVariants,
    options,
    setOption,
    currentProductVariant,
    selectProductVariant,
    lineItems,
    addToCart,
  } = useProductContainer();

  const { node }: { node: WooProduct } = allWcProducts.edges.filter(
    (product: AllWcProducts) => product.node.slug === pageContext.slug
  )[0];
  const { edges }: { edges: ProductPageProps["edges"] } = allWcProducts;

  useEffect(() => {
    setProduct(node);
  }, [node]);

  useEffect(() => {
    if (options) {
      selectProductVariant(options);
    }
  }, [productVariants, options]);

  const addItem = () => {
    const lineItem = {
      product_id: node.wordpress_id,
      variation_id: currentProductVariant.id,
      quantity: 1,
    };
    addToCart(lineItem);
    setAddedToCart();
    console.log(lineItems);
  };

  const { images } = node;
  const buttonText = !productVariants.length
    ? "Sold Out"
    : addedToCart
    ? "Added to Cart!"
    : `Add to Cart
                ${
                  currentProductVariant &&
                  ` - 
                  ${formatPrice(currentProductVariant.price)}`
                }`;
  console.log(productVariants, allWcProducts, node);
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <h1 className="text-4xl mb-4 text-center cubano sm:hidden">
        {node.name}
      </h1>

      <div className="mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {node.images[0].localFile ? (
            <Img
              className="md:w-full w-3/4 mx-auto md:mr-5 mb-5 md:mb-0"
              fluid={images[0].localFile.childImageSharp.fluid}
              objectFit="contain"
              objectPosition="50% 50%"
            />
          ) : (
            <img
              className=" md:w-full w-3/4 mx-auto md:mr-5 mb-5 md:mb-0"
              src={node.images[0].src}
            />
          )}
          <div className="md:ml-5 w-full rounded-lg md:w-full mx-auto cubano bg-gray-500 p-5">
            <h1 className="text-3xl mb-4 hidden sm:block">{node.name}</h1>
            <p
              className="pt2-ns mt2 pt1 pb-3 text-xl gt"
              dangerouslySetInnerHTML={{ __html: node.short_description }}
            />
            <div className="flex flex-col items-start">
              {Object.keys(options).map((option: string) => {
                return (
                  <div className="pb-2 w-full">
                    <label
                      htmlFor="country"
                      className="block text-md font-medium text-gray-700"
                    >
                      {option}
                    </label>
                    <select
                      id="amount"
                      name="amount"
                      onChange={(e) =>
                        setOption({ name: option, option: e.target.value })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
                    >
                      {options[option].map((variant, id) => {
                        return (
                          <option key={id} value={variant}>
                            {variant}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
              <Button
                onClick={addItem}
                className="bg-black outline-none hover:bg-white hover:text-black  text-white w-full p-3 rounded-md"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        <h3 className={headers}>Description</h3>
        <div
          className="pt2-ns pb-3 gt text-xl"
          dangerouslySetInnerHTML={{ __html: node.description }}
        />
        <h3 className={headers}>You May Also Like</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-32">
          {edges
            .filter(
              (edge) =>
                edge.node.status === "publish" &&
                edge.node.wordpress_id !== node.wordpress_id
            )
            .map((edge) => {
              const { node } = edge;
              console.log(edge);
              return (
                <div
                  className="box-border bg-gray-500 rounded-lg px-5 py-4 h-full"
                  key={node.wordpress_id}
                >
                  <div className="flex justify-between">
                    <span className="black no-underline w-2/3 pr-2">
                      <Link to={`/products/${node.slug}`}>
                        <h3 className="text-2xl sm:text-xl fw8 mt2 mb0 ttu cubano">
                          {node.name}
                        </h3>
                      </Link>
                    </span>
                    {node.images[0].localFile ? (
                      <Img
                        className="object-none w-1/3 float-right w-24 "
                        fluid={node.images[0].localFile.childImageSharp.fluid}
                      />
                    ) : (
                      <img
                        className=" w-1/3 float-right w-24 cover "
                        src={node.images[0].src}
                      />
                    )}
                  </div>
                  <div className="items-end mt-5 pt-5">
                    <div className="gt flex justify-between">
                      <h4 className="float-left f5 fw6 mt1 pt1 text-gray-300">
                        {formatPrice(node.price)}
                      </h4>
                      <Link to={`/products/${node.slug}`}>
                        <Button className="float-right bg-black hover:bg-white hover:text-black rounded-sm py-1 px-3 text-white">
                          SHOP
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
            .sort(() => Math.random() - 0.5)
            .slice(2)}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
