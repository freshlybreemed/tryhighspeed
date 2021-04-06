import create from "zustand";
import { ProductVariations, WooProduct } from "../lib/types";

type cartSelectors = {
  price: number;
  currentProduct: any;
  currentProductVariant: any;
  options: { [opt: string]: string[] };
  amounts: string[];
  addedToCart: boolean;
  productVariants: ProductVariations[];
  setAddedToCart: () => void;
  setOption: ({ option, name }: { option: string; name: string }) => void;
  setPrice: (price: number) => void;
  setProduct: (product: WooProduct) => void;
  selectProductVariant: (options: { [opt: string]: string[] }) => void;
};
export const useProductStore = create<cartSelectors>((set, get) => ({
  price: 0,
  currentProduct: null,
  amount: "",
  speed: "",
  flavor: "",
  amounts: [],
  speeds: [],
  options: {},
  addedToCart: false,
  flavors: [],
  productVariants: [],
  currentProductVariant: {},
  setAddedToCart: () => set({ addedToCart: !get().addedToCart }),
  setProduct: (product: WooProduct) => {
    const variants: { [variant: string]: string[] } = {};
    const sortedVariations = product.product_variations.sort(
      (a, b) => parseInt(a.price) - parseInt(b.price)
    );
    sortedVariations.forEach((variations) =>
      variations.attributes.forEach((opt) => {
        const { name, option } = opt;
        if (variants[name] && variants[name].indexOf(option) === -1) {
          variants[name].push(option);
        } else if (!variants[name]) {
          variants[name] = [option];
        }
      })
    );
    set({
      currentProduct: product,
      productVariants: product.product_variations,
      options: variants,
    });
  },
  setPrice: (price) => set({ price }),
  setOption: (option) => {
    const currVariant: WooProduct["product_variations"][0] = get()
      .currentProductVariant;
    const newVariants = [
      ...currVariant.attributes.filter((opt) => opt.name !== option.name),
      option,
    ];
    console.log(newVariants);
    const variant = get().productVariants.filter((variant) => {
      const { attributes } = variant;
      for (let i = 0; i < attributes.length; i++) {
        for (let j = 0; j < newVariants.length; j++) {
          if (attributes[i].name !== newVariants[j].name) continue;
          if (attributes[i].option !== newVariants[j].option) return false;
        }
      }
      return true;
    });
    if (variant.length) {
      set({
        currentProductVariant: variant[0],
        addedToCart: false,
      });
    }
  },
  selectProductVariant: (options: { [opt: string]: string[] }) => {
    const keys = Object.keys(options);
    const attributes = keys.map((key) => {
      return get().options[key].map((opt: string) => {
        return {
          option: opt,
          name: key,
        };
      });
    });
    const variant = get().productVariants.filter((vari) => {
      let match = true;
      for (let i = 0; i < attributes.length - 1; i++) {
        if (vari.attributes.indexOf(attributes[i]) === -1) {
          match = false;
          break;
        }
      }
      return match;
    });
    if (variant.length) {
      set({
        currentProductVariant: variant[0],
      });
    }
  },
}));
