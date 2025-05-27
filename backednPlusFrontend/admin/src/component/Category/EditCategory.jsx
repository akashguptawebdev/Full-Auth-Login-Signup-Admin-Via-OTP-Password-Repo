import React, { useState, useEffect, useContext } from "react";
import "./EditCategory.scss";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../pages/CategoryPage/CategoryPage";
import NavigateBack from "../NavigateBack";

const EditCategory = () => {
  const { id } = useParams();
  const { categoriesData } = useContext(CategoryContext);

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState("");

  // Find the category by id
  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      const foundCategory = categoriesData.find((cat) => cat._id === id);

      if (foundCategory) {
        setCategoryName(foundCategory.name || "");
        setIcon(foundCategory.icon || "");
        // image will not be set here; file inputs can't be prefilled
      }
    }
  }, [categoriesData, id]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual update logic
    console.log("Updated category:", {
      id,
      categoryName,
      icon,
      image,
    });
  };

  return (
    <>
    <NavigateBack pageName="Edit Category"/>
    <div className="edit-category-container">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">
            Category Name <span>*</span>
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload">
            Change Image <span>*</span>
          </label>
          <div className="image-drop-area">
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageUpload}
            />
            <p>Drop a new image or <span>click to browse</span></p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="icon">Category Icon</label>
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

        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
    </>
  );
};

export default EditCategory;
