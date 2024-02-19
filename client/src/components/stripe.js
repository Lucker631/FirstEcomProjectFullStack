import React from "react";
import Checkout from "../containers/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  );
};

export default Stripe;
