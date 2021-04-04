import { Link } from "gatsby";
import React, { useState } from "react";
import { useCheckoutContainer } from "../containers/checkoutContainer";

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
    <div className={"w-100 ph4 pt4 bg- black"}>
      <div className="w-60-ns w-100 fl">
        <h3 className="tl fw7 mb0 pb1">Billing Address</h3>
        <form>
          <div className="w-100">
            <div className="mt1 dtc w-50 pb1 tl ">
              <small className="db pl2 pt2 pb1  ">First Name</small>

              <input
                value={firstName}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div className="mt1 dtc w-50 pb1 tl">
              <small className="db pl2 pt2 pb1  ">Last Name</small>

              <input
                value={lastName}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className="db pl2 pt2 pb1  ">Address</small>

              <input
                value={address}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </div>
            <div className="mt1 dtc w-48 pb1 tl">
              <small className="db pl2 pt2 pb1  ">Address #2</small>

              <input
                value={address2}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setAddress2(e.currentTarget.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className="db pl2 pt2 pb1  ">City</small>

              <input
                value={city}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </div>
            <div className="mt1 dtc w-48 pb1 tl">
              <small className="db pl2 pt2 pb1  ">State</small>

              <input
                value={state}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setState(e.currentTarget.value)}
              />
            </div>
            <div className="mt1 dtc w-48 pb1 tl">
              <small className="db pl2 pt2 pb1  ">ZIP</small>

              <input
                value={zip}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setZip(e.currentTarget.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className="db pl2 pt2 pb1  ">Phone Number</small>

              <input
                value={phoneNumber}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt1 dtc w-48 pb1 tl ">
              <small className="db pl2 pt2 pb1  ">Email Address</small>

              <input
                value={emailAddress}
                className="bg-transparent ba-hover  pv2 pl2 mr3 w-90"
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
        <button className="bg-black text-white py-2 px-4 rounded gt text-right">
          Checkout
        </button>
      </Link>
    </div>
  );
};
