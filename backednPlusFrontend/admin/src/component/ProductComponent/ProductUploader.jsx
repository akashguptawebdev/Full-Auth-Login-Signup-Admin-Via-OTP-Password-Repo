import React, { useState, useRef } from 'react';
import './ProductUploader.scss';

const sizes = ['EU - 38.5', 'EU - 39', 'EU - 40', 'EU - 41.5', 'EU - 42', 'EU - 43', 'EU - 44'];

const ProductUploader = () => {
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [date, setDate] = useState('');
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...urls]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...urls]);
    dropRef.current.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove('dragging');
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="product-uploader">
      <h3>Upload images</h3>
      <div className="image-preview-container">
      {images.map((img, index) => (
          <div key={index} className="image-preview">
            <img src={img} alt={`Preview ${index}`} />
            <button
              className="remove-image"
              onClick={(e) => {
                e.stopPropagation();
                setImages((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              &times;
            </button>
          </div>
        ))}

        <div
          className="upload-box"
          ref={dropRef}
          onClick={() => fileInputRef.current.click()}
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

        {/* If product category is cloth then open this field */}
      {/* <div className="product-meta">
        <div className="size-section">
          <label>Add size</label>
          <select value={selectedSize} onChange={(e) => handleSizeClick(e.target.value)}>
            <option value="">Choose size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <div className="size-options">
            {sizes.map(size => (
              <button
                key={size}
                className={selectedSize === size ? 'active' : ''}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="date-section">
          <label>Product date</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
      </div> */}

      <div className="action-buttons">
        <button className="add">Add product</button>
      </div>
    </div>
  );
};

export default ProductUploader;
