import create from "zustand";
import { ProductVariations, WooProduct } from "../lib/types";

type cartSelectors = {
  price: number;
  currentProduct: any;
  currentProductVariant: any;
  amount: string;
  speed: string;
  flavor: string;
  amounts: string[];
  addedToCart: boolean;
  speeds: string[];
  flavors: string[];
  productVariants: ProductVariations[];
  currentProductVariantId: number;
  setAddedToCart: () => void;
  setSpeed: (speed: string) => void;
  setAmount: (amount: string) => void;
  setFlavor: (amount: string) => void;
  setPrice: (price: number) => void;
  setProduct: (product: WooProduct) => void;
  selectProductVariant: ({
    amount,
    speed,
    flavor,
  }: {
    amount: string;
    flavor: string;
    speed: string;
  }) => void;
};
export const useProductStore = create<cartSelectors>((set, get) => ({
  price: 0,
  currentProduct: null,
  amount: "",
  speed: "",
  flavor: "",
  amounts: [],
  speeds: [],
  addedToCart: false,
  flavors: [],
  productVariants: [],
  currentProductVariantId: 0,
  currentProductVariant: {},
  setAddedToCart: () => set({ addedToCart: !get().addedToCart }),
  setProduct: (product: WooProduct) =>
    set({
      currentProduct: product,
      productVariants: product.product_variations,
      speeds: [
        ...new Set<string>(
          product.product_variations.map(
            (go) =>
              go.attributes.filter((attr) => attr.name === "Speed")[0].option
          )
        ),
      ].reverse(),
      amounts: [
        ...new Set<string>(
          product.product_variations.map(
            (go) =>
              go.attributes.filter((attr) => attr.name === "Amount")[0].option
          )
        ),
      ],
      flavors: [
        ...new Set<string>(
          product.product_variations.map(
            (go) =>
              go.attributes.filter((attr) => attr.name === "Flavor")[0].option
          )
        ),
      ],
    }),
  setPrice: (price) => set({ price }),
  setAmount: (amount) => set({ amount, addedToCart: false }),
  setFlavor: (flavor) => set({ flavor, addedToCart: false }),
  setSpeed: (speed) =>
    set({ speed: speed ? speed : get().speeds[0], addedToCart: false }),
  selectProductVariant: ({ speed, amount, flavor }) => {
    const variant = get().productVariants.filter(
      (variant) =>
        variant.attributes.filter((attr) => attr.name === "Amount")[0]
          .option === amount &&
        variant.attributes.filter((attr) => attr.name === "Speed")[0].option ===
          speed &&
        variant.attributes.filter((attr) => attr.name === "Flavor")[0]
          .option === flavor
    );
    if (variant.length) {
      set({
        currentProductVariant: variant,
        currentProductVariantId: variant[0].id,
      });
    }
  },
}));
