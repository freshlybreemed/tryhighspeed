import create from "zustand";

type cartSelectors = {
  lineItems: any[];
  total: number;
  shippingType: string;
  billingInfo: any;
  cart: any;
  currentProduct: any;
  amount: string;
  speed: string;
  setProduct: () => void;
  addToCart: () => void;
  clearCart: () => void;
};
export const useCartStore = create((set, get) => ({
  lineItems: [],
  total: 0,
  shippingType: "",
  billingInfo: {},
  cart: {},
  currentProduct: {},
  amount: "",
  speed: "",
  setProduct: (product) => set({ currentProduct: product }),
  addToCart: (item) =>
    set((state) => ({ lineItems: state.lineItems.append(item) })),
  clearCart: () => set(() => ({ cart: {} })),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));
