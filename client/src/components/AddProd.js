import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadImages from "../pages/UploadImages";
import { URL } from "../config.js";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/product/add`, product);
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

  const [pictures, setPictures] = useState([]);

  // useEffect(() => {
  //   fetch_pictures();
  // }, []);

  // const fetch_pictures = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5010/products/get_all"
  //     );
  //     setPictures([...response.data.pictures]);
  //   } catch (error) {
  //     debugger;
  //   }
  // };

  const remove_picture = async (_id, idx) => {
    try {
      await axios.delete(`${URL}/pictures/remove/${_id}`);
      const temp = pictures;
      temp.splice(idx, 1);
      setPictures([...temp]);
    } catch (error) {
      debugger;
    }
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
        <div className="header">
          <UploadImages productSetter={setProduct} />
        </div>
        <div className="pictures_container">
          {pictures.map((picture, idx) => {
            return (
              <div key={idx} className="picture_container">
                <img
                  alt="example_image"
                  src={picture.photo_url}
                  style={{ width: "70%" }}
                />
                <button onClick={() => remove_picture(picture._id, idx)}>
                  Remove picture
                </button>
              </div>
            );
          })}
        </div>
        <br />
        <button className="form-button" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProd;
