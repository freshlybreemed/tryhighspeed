const path = require("path");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

// Create product pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productTemplate = path.resolve(`src/templates/product.tsx`);

  const result = await graphql(`
    query {
      allWcProducts {
        edges {
          node {
            id
            wordpress_id
            name
            price
          }
        }
      }
    }
  `);
  result.data.allWcProducts.edges.forEach((edge) => {
    const { node } = edge;
    createPage({
      path: `products/${edge.node.wordpress_id}`,
      component: productTemplate,
      context: {
        title: node.name,
        wordId: node.wordpress_id,
        price: node.price,
        image: node.categories,
      },
    });
  });
};
