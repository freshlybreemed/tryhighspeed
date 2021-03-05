import create from "zustand";
import createStore from "zustand";
// import { configurePersist } from "zustand-persist";

// export const { persist, purge } = configurePersist({
//   storage: localStorage, // use `AsyncStorage` in react native
//   rootKey: "root", // optional, default value is `root`
// });

export const useCartStore = create((set) => ({
  lineItems: [],
  total: 0,
  shippingType: "",
  billingInfo: {},
  cart: {},
  addToCart: (item) =>
    set((state) => ({ lineItems: state.lineItems.append(item) })),
  clearCart: () => set(() => ({ cart: {} })),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));

// export const useStore = createStore(
//   persist(
//     {
//       key: "auth", // required, child key of storage
//       allowlist: ["isAuthenticated", "user"], // optional, will save everything if allowlist is undefined
//       denylist: [], // optional, if allowlist set, denylist will be ignored
//     },
//     (set) => ({
//       isAuthenticating: false,
//       isAuthenticated: false,
//       user: undefined,
//       login: async (username, password) => {
//         set((state) => ({ isAuthenticating: true }));
//         const { user } = await webLogin(username, password);
//         set((state) => ({
//           isAuthenticated: true,
//           isAuthenticating: false,
//           user,
//         }));
//       },
//     })
//   )
// );
