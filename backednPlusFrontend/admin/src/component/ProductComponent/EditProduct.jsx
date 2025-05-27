import React, { useState, useRef, useContext, useEffect } from 'react';
import './EditProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../pages/ProductPage/ProductsPage';
import NavigateBack from '../NavigateBack';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts } = useContext(ProductContext);

  const selectedProduct = allProducts.find(p => p.id?.toString() === `#${id}`);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    sale: 0,
    stock: 'In stock',
    startDate: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // ✅ useEffect to initialize form values when product is found
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || '',
        price: selectedProduct.price || 0,
        quantity: selectedProduct.quantity || 0,
        sale: selectedProduct.sale || 0,
        stock: selectedProduct.stock || 'In stock',
        startDate: selectedProduct.startDate || '',
        images: selectedProduct.images || [],
      });

      // Use product.image or product.images
      if (selectedProduct.images && Array.isArray(selectedProduct.images)) {
        setPreviewImages(selectedProduct.images);
      } else if (selectedProduct.image) {
        setPreviewImages([selectedProduct.image]);
      }
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate("/product/product-table");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...urls]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...urls]);
    dropRef.current?.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current?.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current?.classList.remove('dragging');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...selectedProduct,
      ...formData,
      images: previewImages,
    };
    console.log("✅ Updated Product:", updatedProduct);

    // TODO: Send updatedProduct to backend or context
    // e.g., updateProductInContext(updatedProduct)
    navigate("/product/product-table");
  };

  const handleRemoveImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!selectedProduct) return <p>⏳ Loading product...</p>;

  return (
    <>
      <NavigateBack pageName={"Edit Product"}/>
    <div className='edit-product-main-container'>
      <div className="edit-product-container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Product ID : {`#${id}`}</label>

          <label>Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />

          <label>Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

          <label>Sale (%)</label>
          <input type="number" name="sale" value={formData.sale} onChange={handleChange} />

          <label>Stock Status</label>
          <select name="stock" value={formData.stock} onChange={handleChange}>
            <option value="In stock">In stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>

          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />

          <label>Images</label>
          <div className="image-preview-container">
            {previewImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img} alt={`Preview ${index}`} />
                <button
                    className="remove-image"
                    onClick={() => handleRemoveImage(index)}
                    >
                    &times;
                 </button>
              </div>
            ))}
            <div
              className="upload-box"
              ref={dropRef}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <div className="drag-drop-content">
                <span>Drop your images here or <strong>click to browse</strong></span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">💾 Save</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>❌ Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditProduct;
