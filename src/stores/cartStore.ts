import create, { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { WooProduct } from "../lib/types";
// import { persist } from "zustand/middleware";

type LineItem = {
  product_id: number;
  variation_id: number;
  quantity: number;
};

type BillingInfo = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
};
type cartSelectors = {
  lineItems: LineItem[];
  total: number;
  shippingType: string;
  billingInfo: BillingInfo;
  cart: any;
  currentProduct: WooProduct;
  amount: string;
  speed: string;
  setProduct: (product: WooProduct) => void;
  addToCart: (lineItem: LineItem) => void;
  removeFromCart: (lineItem: LineItem) => void;
  clearCart: () => void;
  setPersist: () => void;
};
const persist = (config) => (set, get, api) => {
  const initialState = config(
    (args) => {
      set(args);
      window.sessionStorage.setItem("state", JSON.stringify(get()));
    },
    get,
    api
  );

  const restoredState =
    typeof window === "undefined"
      ? {}
      : JSON.parse(sessionStorage.getItem("state"));

  console.log("res", restoredState);
  return {
    ...initialState,
    ...restoredState,
  };
};

export const useCartStore = create<cartSelectors>(
  persist((set: any, get: any) => ({
    lineItems: [],
    total: 0,
    shippingType: "",
    billingInfo: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "US",
      email: "",
      phone: "",
    },
    cart: {},
    currentProduct: {},
    amount: "",
    speed: "",
    addedToCart: false,
    setProduct: (product: WooProduct) => set({ currentProduct: product }),
    addToCart: (item: LineItem) => {
      set({ lineItems: [...get().lineItems, item] });
    },
    removeFromCart: (item: LineItem) => {
      set({ lineItems: [...get().lineItems, item] });
    },
    setAddedToCart: () => set({ addedToCart: !get().addedToCart }),
    clearCart: () => set(() => ({ cart: {} })),
    setPersist: () => {
      const state = get();
      set({ ...state });
    },
  }))
);
