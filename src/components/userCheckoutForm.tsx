import { Link } from "gatsby";
import React, { useState } from "react";
import { useCheckoutContainer } from "../containers/checkoutContainer";
import { Button } from "../lib/styles";

const divStyles = "w-full bg-white rounded mt-2";
const inputStyles = "outline-none w-full block p-2 pt-0 rounded ";
const labelStyles = " pl-2 block pt-1 text-gray-700";
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
    <div className={"my-4 w-100"}>
      <div className="">
        <h3 className="cubano text-sm sm:text-md md:text-lg lg:text-xl my-5">
          Billing Address
        </h3>
        <form>
          <div className="grid gap-0 max-w-xl mx-auto">
            <div className="md:flex">
              <div className={divStyles}>
                <small className={`${labelStyles}`}>First Name</small>
                <input
                  value={firstName}
                  className={inputStyles}
                  type="text"
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                />
              </div>
              <div className={`w-full md:ml-4 ${divStyles}`}>
                <small className={labelStyles}>Last Name</small>

                <input
                  value={lastName}
                  className={inputStyles}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="md:flex">
              <div className={divStyles}>
                <small className={labelStyles}>Address</small>

                <input
                  value={address}
                  className={inputStyles}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
              </div>
              <div className={`w-full md:ml-4 ${divStyles}`}>
                <small className={labelStyles}>Address #2</small>

                <input
                  value={address2}
                  className={inputStyles}
                  onChange={(e) => setAddress2(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="md:flex">
              <div className={divStyles}>
                <small className={labelStyles}>City</small>

                <input
                  value={city}
                  className={inputStyles}
                  onChange={(e) => setCity(e.currentTarget.value)}
                />
              </div>
              <div className={`w-full md:ml-4 ${divStyles}`}>
                <small className={labelStyles}>State</small>

                <input
                  value={state}
                  className={inputStyles}
                  onChange={(e) => setState(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="md:flex">
              <div className={divStyles}>
                <small className={labelStyles}>ZIP</small>

                <input
                  value={zip}
                  className={inputStyles}
                  onChange={(e) => setZip(e.currentTarget.value)}
                />
              </div>
              <div className={`w-full md:ml-4 ${divStyles}`}>
                <small className={labelStyles}>Phone Number</small>

                <input
                  value={phoneNumber}
                  className={inputStyles}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className={`w-full ${divStyles}`}>
              <small className={labelStyles}>Email Address</small>

              <input
                value={emailAddress}
                className={inputStyles}
                onChange={(e) => setEmailAddress(e.currentTarget.value)}
              />
            </div>
          </div>
          <div></div>
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
