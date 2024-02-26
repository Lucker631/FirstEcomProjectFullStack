import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
// import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import SecretPage from "./pages/SecretPage.js";
import { URL } from "./config";
import * as jose from "jose";
import PaymentSuccess from "./pages/payment_success";
import PaymentError from "./pages/payment_error";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  useEffect(() => {
    const verify_token = async () => {
      try {
        // debugger;
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);

          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);
  const login = (token, userData) => {
    let decodedToken = jose.decodeJwt(token);
    console.log(decodedToken);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      email: decodedToken.userEmail,
      role: decodedToken.role,
    };
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = "/";
  };
  const fetch_pictures = async (setter) => {
    try {
      const response = await axios.get(`${URL}/pictures/get_all`);
      // debugger;
      setter([...response.data.pictures]);
    } catch (error) {
      debugger;
    }
  };

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      ></link>

      <link
        href="https://fonts.googleapis.com/css2?family=Courgette&family=Pacifico&display=swap"
        rel="stylesheet"
      ></link>

      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          user={user}
        />
        <Routes>
          <Route path="/" element={<Home fetch_pictures={fetch_pictures} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/trackOrder" element={<TrackOrder />} /> */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/pages/payment_error" element={<PaymentError />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/secret-page" />
              ) : (
                <Login login={login} />
              )
            }
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/secret-page" /> : <Register />}
          />
          <Route
            path="/secret-page"
            element={
              !isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <SecretPage
                  fetch_pictures={fetch_pictures}
                  logout={logout}
                  user={user}
                />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
