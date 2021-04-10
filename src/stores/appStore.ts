import create from "zustand";

type appSelectors = {
  slidingMenuOpen: boolean;
  setSlidingMenuOpen: () => void;
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  emailSent: boolean;
  setEmailSent: () => void;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
};

export const useAppStore = create<appSelectors>((set, get) => ({
  slidingMenuOpen: false,
  setSlidingMenuOpen: () => set({ slidingMenuOpen: !get().slidingMenuOpen }),
  emailAddress: "",
  setEmailAddress: (email: string) =>
    set({ emailAddress: email, emailSent: false }),
  headerHeight: 0,
  setHeaderHeight: (height: number) => set({ headerHeight: height }),
  emailSent: false,
  setEmailSent: () => set({ emailSent: !get().emailSent }),
}));
