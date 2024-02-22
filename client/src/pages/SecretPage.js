import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCat from "../components/AddCat";
import AddProd from "../components/AddProd";
// import UploadImages from "./UploadImages";

const SecretPage = ({ user }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [categoriesState, setCategoriesState] = useState([]);

  const fetchCategories = async () => {
    try {
      let response = await axios.get(
        "http://localhost:5010/category/categories"
      );
      const categories = response.data.data;
      const categoriesWithProducts = await fetchProducts(categories);
      console.log(categoriesWithProducts);
      setCategoriesState(categoriesWithProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async (categories) => {
    const updatedCategories = [];
    for (let category of categories) {
      try {
        const productsResponse = await axios.post(
          "http://localhost:5010/product/products",
          { category: category.category }
        );
        const categoryWithProducts = {
          ...category,
          products: productsResponse.data.data,
        };

        updatedCategories.push(categoryWithProducts);
      } catch (error) {
        console.error("Error fetching products for category:", error);
        updatedCategories.push({ ...category, products: [] });
      }
    }
    return updatedCategories;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryName) => {
    try {
      await axios.post("http://localhost:5010/category/delete", {
        category: categoryName,
      });
      const updatedCategories = categoriesState.filter(
        (cat) => cat.category !== categoryName
      );
      setCategoriesState(updatedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (categoryName, productName) => {
    try {
      await axios.post("http://localhost:5010/product/delete", {
        category: categoryName,
        name: productName,
      });
      const updatedCategories = categoriesState.map((cat) => {
        if (cat.category === categoryName) {
          const updatedProducts = cat.products.filter(
            (prod) => prod.name !== productName
          );
          return { ...cat, products: updatedProducts };
        }
        return cat;
      });
      setCategoriesState(updatedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpandProducts = (categoryId) => {
    const updatedCategories = categoriesState.map((cat) => {
      if (cat._id === categoryId) {
        return { ...cat, expanded: !cat.expanded };
      } else {
        return { ...cat, expanded: false };
      }
    });
    setCategoriesState(updatedCategories);
  };
  // const [pictures, setPictures] = useState([]);

  // useEffect(() => {
  //   fetch_pictures();
  // }, []);

  // const fetch_pictures = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5010/pictures/get_all"
  //     );
  //     setPictures([...response.data.pictures]);
  //   } catch (error) {
  //     debugger;
  //   }
  // };

  // const remove_picture = async (_id, idx) => {
  //   try {
  //     await axios.delete(`http://localhost:5010/pictures/remove/${_id}`);
  //     const temp = pictures;
  //     temp.splice(idx, 1);
  //     setPictures([...temp]);
  //   } catch (error) {
  //     debugger;
  //   }
  // };
  return (
    <div className="secret_page">
      <AddCat fetchCategories={fetchCategories} />

      <div className="container">
        <div>
          {categoriesState.length > 0 ? (
            categoriesState.map((cat) => (
              <div key={cat._id}>
                <p>{cat.category}</p>
                <button
                  className="remove-button"
                  onClick={() => handleDeleteCategory(cat.category)}
                >
                  Delete
                </button>
                <button
                  className="colorful-button"
                  onClick={() => handleExpandProducts(cat._id)}
                >
                  {cat.expanded ? "Collapse Products" : "Expand Products"}
                </button>
                {cat.expanded && (
                  <ul>
                    {cat.products
                      .filter((prod) => prod.category_id === cat._id)
                      .map((product) => (
                        <div>
                          <li key={product._id}>{product.name}</li>
                          <button
                            className="remove-button"
                            onClick={() =>
                              handleDeleteProduct(cat.category, product.name)
                            }
                          >
                            Delete Product
                          </button>
                        </div>
                      ))}
                    <AddProd
                      category={cat.category}
                      fetchProducts={fetchProducts}
                      categoriesState={categoriesState}
                      setCategoriesState={setCategoriesState}
                    />
                    {/* <div className="header">
                      <UploadImages fetch_pictures={fetch_pictures} />
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
                            <button
                              onClick={() => remove_picture(picture._id, idx)}
                            >
                              Remove picture
                            </button>
                          </div>
                        );
                      })}
                    </div> */}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <h1>No categories</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretPage;
