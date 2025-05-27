import React, { useState } from "react";
import "./NewCategory.scss";
import NavigateBack from "../NavigateBack";

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log({ categoryName, image, icon });
  };

  return (
    <>
    <NavigateBack pageName={"Create Category"}/>
    <div className="new-category-container">
      <h2></h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">
            Product name <span>*</span>
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload">
            Upload images <span>*</span>
          </label>
          <div className="image-drop-area">
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageUpload}
              required
            />
            <p>Drop your images here or select <span>click to browse</span></p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="icon">Select category icon</label>
          <select
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            <option value="">Select icon</option>
            <option value="🔥">Fire</option>
            <option value="🎯">Target</option>
            <option value="🌟">Star</option>
          </select>
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
    </>
  );
};

export default NewCategory;
