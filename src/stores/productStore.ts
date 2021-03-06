import create from "zustand";

type cartSelectors = {
  price: number;
  currentProduct: any;
  currentProductVariant: any;
  amount: string;
  speed: string;
  options: string[];
  speeds: string[];
  productVariants: any[];
  currentProductVariantId: number;
  setOptions: (options: any) => void;
  setProductVariants: (options: any) => void;
  setSpeed: (speed: string) => void;
  setSpeeds: (options: any) => void;
  setAmount: (amount: string) => void;
  setPrice: (price: number) => void;
  setProduct: (product: any) => void;
  selectProductVariant: (product: any) => void;
};
export const useProductStore = create<cartSelectors>((set, get) => ({
  price: 0,
  currentProduct: null,
  amount: "",
  speed: "",
  options: [],
  speeds: [],
  flavors: [],
  productVariants: [],
  currentProductVariantId: 0,
  currentProductVariant: {},
  setProduct: (product) => set({ currentProduct: product }),
  setPrice: (price) => set({ price }),
  setAmount: (amount) => set({ amount }),
  setSpeed: (speed) => set({ speed }),
  selectProductVariant: ({ speed, amount }) => {
    const variant = get().productVariants.filter(
      (variant) =>
        variant.attributes[0].option === amount &&
        variant.attributes[1].option === speed
    );
    if (variant.length) {
      set({
        currentProductVariant: variant,
        currentProductVariantId: variant[0].id,
      });
    }
  },
  setProductVariants: (product) =>
    set({ productVariants: product.product_variations }),
  setSpeeds: (product) => {
    set({
      speeds: [
        ...new Set<string>(
          product.product_variations.map((go: any) => go.attributes[1].option)
        ),
      ],
    });
  },
  setOptions: (product) => {
    set({
      options: [
        ...new Set<string>(
          product.product_variations.map((go: any) => go.attributes[0].option)
        ),
      ],
    });
  },
}));
