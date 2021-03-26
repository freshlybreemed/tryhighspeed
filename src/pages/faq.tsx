import Layout from "../components/layout";
import SEO from "../components/seo";

import React from "react";

const ProductPage = () => (
  <Layout>
    <SEO title="FAQ" />
    <h1 className="fw3 mb-3 pb-3 text-3xl cubano text-center f1">
      Frequently Asked Questions
    </h1>
    <div className="mx-8 ">
      <div className="mt4 pt4 mb2 tc">
        <h3 className="text-lg py-1 font-bold">How do I place an order?</h3>
        <p className=" pb-2">
          Choose a city (Washington, D.C., Boston [the whole of Massachusettes],
          or New York City). Pick any product . Select ‘Love’ or ‘Lots of Love’
          for 2 day shipping, Next Day Shipping, or Next Day Pick Up
          (Discontinued for now). Alternatively, select ‘Love On-Demand’ or
          ‘Lots of Love On-Demand’ for same day delivery within 1-2 hours
          (limited to certain occasions).
        </p>
        <h3 className="text-lg py-1 font-bold">
          Are you saying I can place and receive an on-demand order today?
        </h3>
        <p className=" pb-2">
          Yup! On-demand orders are processed immediately and delivered to you
          within 1-2 hours. The thing is, we provide on-demand sparingly now
          that we have broadened our capabilities. (Updated 5/19)
        </p>
        <h3 className="text-lg py-1 font-bold">
          How will I know when my on-demand order is on its way?
        </h3>
        <p className=" pb-2">
          As soon as you submit your order, a HighSpeed team member will
          transmit your information to one of our on-demand drivers. The driver
          will then shoot you a text to let you know that they are on the way.
          You’ll receive another text or a call when your driver arrives at the
          delivery location with your order.
        </p>
        <h3 className="text-lg py-1 font-bold">How do 2 day shipments work?</h3>
        <p className=" pb-2">
          2 Day Shipments arrive in 2 Days from when your order was placed! We
          provide you with up to date tracking from dispatch to delivery
        </p>
        <h3 className="text-lg py-1 font-bold">
          How do next day pick-ups work?
        </h3>
        <p className=" pb-2">
          You place an order today, and tomorrow before 12pm you’ll receive an
          e-mail informing you of the day’s pick up location and time (typically
          a 2-hour window in the early afternoon for DC and Mid to Late
          Afternoon for Boston).
        </p>
        <h3 className="text-lg py-1 font-bold">
          How does next day delivery work?
        </h3>
        <p className=" pb-2">
          In order to receive your delivery by the next day, orders must be
          placed before 7PM. There is an additional fee. When you place an order
          for next day delivery, you have two options: next day delivery between
          10 AM and 12 noon and Next day delivery between 2pm-6pm. You choose
          the window that’s most convenient for you, and we’ll make sure your
          order arrives within the timeframe.
        </p>
        <h3 className="text-lg py-1 font-bold">
          What kinds of Love do you offer?
        </h3>
        <p className=" pb-2">
          Sign up for our mailing list at https://www.tryhighspeed.com to
          receive weekly updates about strains and promo codes!
        </p>
        <h3 className="text-lg py-1 font-bold">
          When are you guys open/When are your delivery hours?
        </h3>
        <p className=" pb-2">
          We are open 7 days a week! On-demand deliveries are available daily
          from 11am-11pm. Next day pick-ups are typically scheduled between
          1pm-3pm at a central location. For next day deliveries, we offer two
          options: 10AM-12noon and 2pm-6pm.
        </p>
        <h3 className="text-lg py-1 font-bold">Where do you deliver?</h3>
        <p className=" pb-2">
          We deliver to residences in the District of Columbia (excluding
          federal/public property) any where in the State of Massachusetts, as
          well as New York City. (Updated 8/19)
        </p>
        <h3 className="text-lg py-1 font-bold">
          What if I don’t live in D.C. (or Boston) ?
        </h3>
        <p className=" pb-2">
          No worries! Shoot us an e-mail and we’ll do our utmost best coordinate
          a delivery with you.
        </p>
        <h3 className="text-lg py-1 font-bold">What if I miss a delivery?</h3>
        <p className=" pb-2">
          For 2 day shipments and next day deliveries, you will be charged a
          re-delivery fee if the address is incorrect. (Updated 5/19) (This does
          NOT apply to on-demand deliveries.)
        </p>
        <h3 className="text-lg py-1 font-bold">
          What if HighSpeed misses my delivery?
        </h3>
        <p className=" pb-2">
          If your 2 day shipment does not arrive in the delivery window you
          selected at checkout, we will credit your account for a future
          discounted order.
        </p>
        <h3 className="text-lg py-1 font-bold">What does ‘sold out’ mean?</h3>
        <p className=" pb-2">
          ‘Sold out’ means we have reached our daily (or current) limit for
          orders and will be back ASAP.
        </p>
        <h3 className="text-lg py-1 font-bold">
          Do your delivery and on demand delivery drivers accept tips?
        </h3>
        <p className=" pb-2">
          Yes! Our drivers accept (and deeply appreciate) cash tips upon
          delivery.
        </p>{" "}
        <h3 className="text-lg py-1 font-bold">Do you offer refunds?</h3>
        <p className=" pb-2">
          We do not offer refunds. All sales are final. I have a general
          question that isn’t answered here… What should I do? E-mail us at
          tryhighspeed@gmail.com, and one of our representatives will respond as
          soon as possible
        </p>
      </div>
    </div>
  </Layout>
);

export default ProductPage;
