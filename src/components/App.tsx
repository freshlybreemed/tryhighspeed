import React from "react";
import { useCartStore } from "../stores/cartStore";

export default function App({ children }) {
  const { total, cart, billingInfo } = useCartStore();

  console.log(total, cart, billingInfo);
  return <div>{children}</div>;
}
