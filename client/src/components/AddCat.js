import React from "react";
import { useState } from "react";
import axios from "axios";
function AddCat({ fetchCategories }) {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:5010/category/add", {
        category: category,
      });
      console.log(response);
      if (response.status === 200) {
        fetchCategories();
        setCategory("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
        <button className="form-button" type="submit">
          Add category
        </button>
      </form>
    </div>
  );
}

export default AddCat;
