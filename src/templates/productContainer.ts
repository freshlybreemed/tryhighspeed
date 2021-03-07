import { useCartStore } from "../stores/cartStore";
import { useProductStore } from "../stores/productStore";

export const useProductContainer = () => {
  const currentProduct = useCartStore((state) => state.currentProduct);
  const setProduct = useProductStore((state) => state.setProduct);
  const cart = useCartStore((state) => state.cart);
  const amount = useProductStore((state) => state.amount);
  const lineItems = useCartStore((state) => state.lineItems);
  const speed = useProductStore((state) => state.speed);
  const speeds = useProductStore((state) => state.speeds);
  const productVariants = useProductStore((state) => state.productVariants);
  const options = useProductStore((state) => state.options);
  const currentProductVariant = useProductStore(
    (state) => state.currentProductVariant
  );
  const currentProductVariantId = useProductStore(
    (state) => state.currentProductVariantId
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const setAddedToCart = useProductStore((state) => state.setAddedToCart);
  const addedToCart = useProductStore((state) => state.addedToCart);
  const setOptions = useProductStore((state) => state.setOptions);
  const setSpeeds = useProductStore((state) => state.setSpeeds);
  const setAmount = useProductStore((state) => state.setAmount);
  const setSpeed = useProductStore((state) => state.setSpeed);
  const setProductVariants = useProductStore(
    (state) => state.setProductVariants
  );
  const selectProductVariant = useProductStore(
    (state) => state.selectProductVariant
  );
  return {
    currentProduct,
    setProductVariants,
    setProduct,
    currentProductVariant,
    selectProductVariant,
    setOptions,
    setSpeed,
    setAmount,
    speeds,
    productVariants,
    setSpeeds,
    lineItems,
    addToCart,
    setAddedToCart,
    addedToCart,
    currentProductVariantId,
    cart,
    amount,
    speed,
    options,
  };
};
