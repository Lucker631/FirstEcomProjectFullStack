import React from "react";
// import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import AddCat from "../components/AddCat";
import Categories from "../components/Categories";
import AddProd from "../components/AddProd";
function Catalog() {
  return (
    <div>
      <Categories />
    </div>
  );
}

export default Catalog;
