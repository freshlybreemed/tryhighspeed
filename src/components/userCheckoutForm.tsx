import { Link } from "gatsby";
import React, { useState } from "react";
import { useCheckoutContainer } from "../containers/checkoutContainer";
import { Button } from "../lib/styles";

const inputStyles = "border-2 border-black";
const labelStyles = "mt-2";
export const UserCheckout: React.FunctionComponent = () => {
  const {
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
  } = useCheckoutContainer();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <div className={"m-4"}>
      <div className="">
        <h3 className="cubano">Billing Address</h3>
        <form>
          <div className="grid gap-2 max-w-xs">
            <small className="font-bold">First Name</small>
            <input
              value={firstName}
              className={inputStyles}
              type="text"
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <small className={labelStyles}>Last Name</small>

            <input
              value={lastName}
              className={inputStyles}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />

            <small className={labelStyles}>Address</small>

            <input
              value={address}
              className={inputStyles}
              onChange={(e) => setAddress(e.currentTarget.value)}
            />

            <small className={labelStyles}>Address #2</small>

            <input
              value={address2}
              className={inputStyles}
              onChange={(e) => setAddress2(e.currentTarget.value)}
            />

            <small className={labelStyles}>City</small>

            <input
              value={city}
              className={inputStyles}
              onChange={(e) => setCity(e.currentTarget.value)}
            />

            <small className={labelStyles}>State</small>

            <input
              value={state}
              className={inputStyles}
              onChange={(e) => setState(e.currentTarget.value)}
            />

            <small className={labelStyles}>ZIP</small>

            <input
              value={zip}
              className={inputStyles}
              onChange={(e) => setZip(e.currentTarget.value)}
            />
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className={labelStyles}>Phone Number</small>

              <input
                value={phoneNumber}
                className={inputStyles}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className={labelStyles}>Email Address</small>

              <input
                value={emailAddress}
                className={inputStyles}
                onChange={(e) => setEmailAddress(e.currentTarget.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* <div className="fr tl w-40-ns">
        <h3 className="fw7 mb0 pb2">Order Summary</h3>
        <p className="bb pb4">2 Items</p>
        <p> Merchandise</p>
        <p className="bb pb4"> Shipping</p>
        <h3 className="fw7 mb0 pb2">Estimated Total</h3>
      </div> */}
      <Link to="/checkout">
        <Button className="bg-black text-white py-2 px-4 rounded gt text-right">
          Checkout
        </Button>
      </Link>
    </div>
  );
};
