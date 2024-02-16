import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5010/category/categories"
      );
      const categories = response.data.data;
      const productsPromises = categories.map(async (category) => {
        const productsResponse = await axios.get(
          `http://localhost:5010/product_show?category=${category.category}`
        );
        return productsResponse.data.data;
      });
      const products = await Promise.all(productsPromises);
      setProducts(products.flat()); // Flatten array of arrays
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductPage;
