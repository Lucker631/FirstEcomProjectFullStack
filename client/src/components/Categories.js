import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { URL } from "../config.js";
import ImageGallery from "react-image-gallery";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();
  const stripe = useStripe();

  const fetchCategories = async () => {
    try {
      const cats = await axios.get("http://localhost:5010/category/categories");
      setCategories(cats.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const productsResponse = await axios.post(
        "http://localhost:5010/product/products",
        {
          category: category,
        }
      );
      console.log("Products response:", productsResponse.data);
      return productsResponse.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsForAllCategories = async () => {
      if (categories) {
        const productsPromises = categories.map(async (category) => {
          const products = await fetchProductsByCategory(category.category);
          return { [category.category]: products };
        });
        const products = await Promise.all(productsPromises);
        const productsObject = products.reduce(
          (acc, obj) => ({ ...acc, ...obj }),
          {}
        );
        setProductsByCategory(productsObject);
      }
    };
    fetchProductsForAllCategories();
  }, [categories]);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const createCheckoutSession = async () => {
    try {
      // debugger;
      // 2. Sending request to the create_checkout_session controller and passing products to be paid for
      // const pass = { products: cart };
      const response = await axios.post(
        `${URL}/payment/create-checkout-session`,
        { cart }
      );
      return response.data.ok
        ? // we save session id in localStorage to get it later
          (localStorage.setItem(
            "sessionId",
            JSON.stringify(response.data.sessionId)
          ),
          // 9. If server returned ok after making a session we run redirect() and pass id of the session to the actual checkout / payment form
          redirect(response.data.sessionId))
        : navigate("../pages/payment_error");
    } catch (error) {
      navigate("/pages/payment_error");
    }
  };

  const redirect = (sessionId) => {
    // debugger;
    // 10. This redirects to checkout.stripe.com and if charge/payment was successful send user to success url defined in create_checkout_session in the controller (which in our case renders payment_success.js)
    stripe
      .redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: sessionId,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
  };

  useEffect(() => {
    // debugger;
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const renderProductImage = (imageUrl, productName) => (
    <img className="cart-img" src={imageUrl} alt={productName} />
  );

  return (
    <div>
      <div className="cart-total">
        <div className="cart-container">
          <h1 className="header-text-catalog">Cart</h1>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                <div className="cart-ul-div">
                  {renderProductImage(item.image[0].photo_url, item.name)}
                  <p>
                    <p className="cart-ul-div-name">{item.name}</p>Quantity:{" "}
                    {item.quantity}
                  </p>
                  <div className="flex-remove">
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove One
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="total">
          <h2>
            <p className="header-text-catalog">Total Price:</p>{" "}
            <p className="price-cart">${totalPrice.toFixed(2)}</p>
          </h2>
          <div className="flex-total">
            <button
              className="total-button"
              onClick={() => createCheckoutSession()}
            >
              Finish shopping and proceed
            </button>
          </div>
        </div>
      </div>
      <h1 className="header-text-catalog-categories">Categories</h1>

      {categories ? (
        <div className="categories-card">
          {categories.map((category) => (
            <div className="category-div" key={category.category}>
              <h2 className="header-text-catalog-categories-type">
                {category.category}
              </h2>
              {productsByCategory[category.category] && (
                <ul>
                  {productsByCategory[category.category]
                    .filter((prod) => prod.category_id === category._id)
                    .map((product) => (
                      <li key={product._id}>
                        <div className="product-card">
                          <div className="parent-grid">
                            {/* <img
                              className="product-image"
                              src={product.image[0].photo_url}
                              alt={product.name}
                            /> */}
                            <div className="gallery-prod-div">
                              <ImageGallery
                                items={product.image?.map((e) => {
                                  // debugger;
                                  return {
                                    original: e?.photo_url,
                                    thumbnail: e?.photo_url,
                                  };
                                })}
                                slideInterval={2000}
                                autoPlay={true}
                                showNav={false}
                                showBullets={false}
                                showThumbnails={false}
                                showPlayButton={false}
                                showFullscreenButton={false}
                              />
                            </div>
                            <div className="flex-price-descr">
                              <div className="price-descr">
                                <div className="product-card-grid">
                                  <p className="product-name">
                                    {" "}
                                    {product.name}
                                  </p>
                                  <p className="product-price">
                                    Price: {product.price}
                                  </p>
                                  <p className="product-color">
                                    Color: {product.color}
                                  </p>
                                </div>
                                <p className="product-description">
                                  {product.description}
                                </p>{" "}
                              </div>
                            </div>
                            <div className="flex-add">
                              <button
                                className="colorful-button"
                                onClick={() => addToCart(product)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h1>No categories</h1>
      )}
    </div>
  );
}

export default Categories;
