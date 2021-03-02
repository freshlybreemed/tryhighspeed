import { NowRequest, NowResponse } from "@vercel/node";
const pkg = require("@woocommerce/woocommerce-rest-api");

const WooCommerceRestApi = pkg.default;

const WooCommerce = new WooCommerceRestApi({
  url: "https://tryhighspeed.com",
  consumerKey: process.env.GATSBY_WOO_KEY,
  consumerSecret: process.env.GATSBY_WOO_SECRET,
  version: "wc/v3",
});

export default (request: NowRequest, response: NowResponse) => {
  const { name = "World" } = request.query;
  WooCommerce.get("products")
    .then((res: any) => {
      // console.log(response);
      response.send(res.data);
    })
    .catch((error: any) => {
      console.log("dude", error);
    });
  // }
  // response.status(200).send(`Hello ${name}!`);
};
