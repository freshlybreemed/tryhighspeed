import { useCheckoutStore } from "../stores/checkoutStore";

export const useCheckoutContainer = () => {
  const firstName = useCheckoutStore((state) => state.firstName);
  const setFirstName = useCheckoutStore((state) => state.setFirstName);
  const lastName = useCheckoutStore((state) => state.lastName);
  const setLastName = useCheckoutStore((state) => state.setLastName);
  const address = useCheckoutStore((state) => state.address);
  const setAddress = useCheckoutStore((state) => state.setAddress);
  const address2 = useCheckoutStore((state) => state.address2);
  const setAddress2 = useCheckoutStore((state) => state.setAddress2);
  const city = useCheckoutStore((state) => state.city);
  const setCity = useCheckoutStore((state) => state.setCity);
  const state = useCheckoutStore((state) => state.state);
  const setState = useCheckoutStore((state) => state.setState);
  const zip = useCheckoutStore((state) => state.zip);
  const setZip = useCheckoutStore((state) => state.setZip);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    address2,
    setAddress2,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
  };
};
