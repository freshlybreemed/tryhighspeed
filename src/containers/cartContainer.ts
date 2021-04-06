import { useCartStore } from "../stores/cartStore";
import { useProductStore } from "../stores/productStore";

export const useCartContainer = () => {
  const cart = useCartStore((state) => state.cart);
  const lineItems = useCartStore((state) => state.lineItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return {
    cart,
    lineItems,
    removeFromCart,
  };
};
