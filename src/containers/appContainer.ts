import { useAppStore } from "../stores/appStore";

export const useAppContainer = () => {
  const slidingMenuOpen = useAppStore((state) => state.slidingMenuOpen);
  const setSlidingMenuOpen = useAppStore((state) => state.setSlidingMenuOpen);
  const emailAddress = useAppStore((state) => state.emailAddress);
  const setEmailAddress = useAppStore((state) => state.setEmailAddress);
  const emailSent = useAppStore((state) => state.emailSent);
  const setEmailSent = useAppStore((state) => state.setEmailSent);
  return {
    setSlidingMenuOpen,
    slidingMenuOpen,
    emailAddress,
    setEmailAddress,
    setEmailSent,
    emailSent,
  };
};
