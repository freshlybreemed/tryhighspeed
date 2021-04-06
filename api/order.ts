/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VercelRequest, VercelResponse } from "@vercel/node";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("@woocommerce/woocommerce-rest-api");

const WooCommerceRestApi = pkg.default;

const WooCommerce = new WooCommerceRestApi({
  url: "https://tryhighspeed.com",
  consumerKey: process.env.GATSBY_WOO_KEY,
  consumerSecret: process.env.GATSBY_WOO_SECRET,
  version: "wc/v3",
});

const data = {
  payment_method: "custom_payment",
  payment_method_title: "Connexus Secure Payment",
  set_paid: true,
  billing: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
    email: "john.doe@example.com",
    phone: "(555) 555-5555",
  },
  shipping: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
  },
  line_items: [
    {
      product_id: 4810,
      variation_id: 4814,
      quantity: 1,
    },
  ],
  shipping_lines: [
    {
      method_id: "flat_rate",
      method_title: "Flat Rate",
      total: "10.00",
    },
  ],
};

// WooCommerce.post("orders", data)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error.response.data);
//   });
export default (_request: VercelRequest, response: VercelResponse) => {
  WooCommerce.get("orders")
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
