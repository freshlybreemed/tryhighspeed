import { useCartStore } from "../stores/cartStore";
import { useProductStore } from "../stores/productStore";

export const useProductContainer = () => {
  const currentProduct = useCartStore((state) => state.currentProduct);
  const setProduct = useProductStore((state) => state.setProduct);
  const cart = useCartStore((state) => state.cart);
  const lineItems = useCartStore((state) => state.lineItems);
  const productVariants = useProductStore((state) => state.productVariants);
  const options = useProductStore((state) => state.options);
  const currentProductVariant = useProductStore(
    (state) => state.currentProductVariant
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const setAddedToCart = useProductStore((state) => state.setAddedToCart);
  const addedToCart = useProductStore((state) => state.addedToCart);
  const setOption = useProductStore((state) => state.setOption);

  const selectProductVariant = useProductStore(
    (state) => state.selectProductVariant
  );
  return {
    currentProduct,
    setProduct,
    currentProductVariant,
    selectProductVariant,
    productVariants,
    lineItems,
    addToCart,
    setAddedToCart,
    addedToCart,
    cart,
    options,
    setOption,
  };
};
