import React from "react";
// import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import AddCat from "../components/AddCat";
import Categories from "../components/Categories";
import AddProd from "../components/AddProd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Catalog() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Categories />
      </Elements>
    </div>
  );
}

export default Catalog;
