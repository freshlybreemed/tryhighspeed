import create from "zustand";

type checkoutSelectors = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  emailAddress: string;
  phoneNumber: string;

  setFirstName: (text: string) => void;
  setLastName: (text: string) => void;
  setAddress: (text: string) => void;
  setAddress2: (text: string) => void;
  setCity: (text: string) => void;
  setState: (text: string) => void;
  setZip: (text: string) => void;
  setEmailAddress: (text: string) => void;
  setPhoneNumber: (text: string) => void;
};

export const useCheckoutStore = create<checkoutSelectors>((set) => ({
  firstName: "",
  lastName: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  emailAddress: "",
  phoneNumber: "",
  setFirstName: (text: string) => set({ firstName: text }),
  setLastName: (text: string) => set({ lastName: text }),
  setAddress: (text: string) => set({ address: text }),
  setAddress2: (text: string) => set({ address2: text }),
  setCity: (text: string) => set({ city: text }),
  setState: (text: string) => set({ state: text }),
  setZip: (text: string) => set({ zip: text }),
  setEmailAddress: (text: string) => set({ emailAddress: text }),
  setPhoneNumber: (text: string) => set({ phoneNumber: text }),
}));
