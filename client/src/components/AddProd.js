import React, { useState } from "react";
import axios from "axios";

function AddProd({
  fetchProducts,
  category,
  categoriesState,
  setCategoriesState,
}) {
  const [product, setProduct] = useState({
    category: category,
    name: "",
    price: 0,
    color: "",
    description: "",
    image: [],
  });

  // const handleAddProduct = async (categoryName, productName) => {
  //   try {
  //     await axios.post("http://localhost:5010/product/add", {
  //       category: categoryName,
  //       name: productName,
  //     });
  //     debugger;
  //     const updatedCategories = await fetchProducts(categoriesState);
  //     setCategoriesState(updatedCategories);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5010/product/add",
        product
      );
      console.log(response);
      if (response.status === 200) {
        setProduct({
          category: category,
          name: "",
          price: 0,
          color: "",
          description: "",
          image: [],
        });

        // const updatedProductsResponse = await axios.post(
        //   "http://localhost:5010/product/products",
        //   { category: category }
        // );
        // const updatedProducts = updatedProductsResponse.data.data;

        const categoriesWithProducts = await fetchProducts([
          ...categoriesState,
        ]);
        console.log(categoriesWithProducts);
        setCategoriesState(categoriesWithProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          placeholder={product.category}
          disabled
        />
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <br />
        <label>Color:</label>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
        />
        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <br />
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProd;
