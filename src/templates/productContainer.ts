import { useCartStore } from "../stores/cartStore";
import { useProductStore } from "../stores/productStore";

export const useProductContainer = () => {
  const currentProduct = useCartStore((state) => state.currentProduct);
  const setProduct = useProductStore((state) => state.setProduct);
  const cart = useCartStore((state) => state.cart);
  const lineItems = useCartStore((state) => state.lineItems);
  const speed = useProductStore((state) => state.speed);
  const speeds = useProductStore((state) => state.speeds);
  const amount = useProductStore((state) => state.amount);
  const flavor = useProductStore((state) => state.flavor);
  const productVariants = useProductStore((state) => state.productVariants);
  const amounts = useProductStore((state) => state.amounts);
  const flavors = useProductStore((state) => state.flavors);
  const currentProductVariant = useProductStore(
    (state) => state.currentProductVariant
  );
  const currentProductVariantId = useProductStore(
    (state) => state.currentProductVariantId
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const setAddedToCart = useProductStore((state) => state.setAddedToCart);
  const addedToCart = useProductStore((state) => state.addedToCart);
  const setAmount = useProductStore((state) => state.setAmount);
  const setFlavor = useProductStore((state) => state.setFlavor);
  const setSpeed = useProductStore((state) => state.setSpeed);

  const selectProductVariant = useProductStore(
    (state) => state.selectProductVariant
  );
  return {
    currentProduct,
    setProduct,
    currentProductVariant,
    selectProductVariant,
    setSpeed,
    setAmount,
    speeds,
    productVariants,
    lineItems,
    addToCart,
    setFlavor,
    flavor,
    flavors,
    setAddedToCart,
    addedToCart,
    currentProductVariantId,
    cart,
    amount,
    speed,
    amounts,
  };
};
