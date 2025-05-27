import React, { useState } from 'react';
import './ProductForm.scss';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    gender: '',
    brand: '',
    description: '',
  });

  const categories = ['Shirts', 'Shoes', 'Pants'];
  const genders = ['Male', 'Female', 'Unisex'];
  const brands = ['Nike', 'Adidas', 'Puma'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="product-form">
      {/* Product Name */}
      <div className="form-group">
        <label>
          Product name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="productName"
          maxLength={20}
          placeholder="Enter product name"
          value={formData.productName}
          onChange={handleChange}
        />
        <small>Do not exceed 20 characters when entering the product name.</small>
      </div>

      {/* Category & Gender */}
      <div className="form-row">
        <div className="form-group">
          <label>
            Category <span className="required">*</span>
          </label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            Gender <span className="required">*</span>
          </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Choose gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brand */}
      <div className="form-group">
        <label>
          Brand <span className="required">*</span>
        </label>
        <select name="brand" value={formData.brand} onChange={handleChange}>
          <option value="">Choose brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="form-group">
        <label>
          Description <span className="required">*</span>
        </label>
        <textarea
          name="description"
          rows={4}
          maxLength={100}
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <small>Do not exceed 100 characters when entering the product name.</small>
      </div>
    </div>
  );
};

export default ProductForm;
