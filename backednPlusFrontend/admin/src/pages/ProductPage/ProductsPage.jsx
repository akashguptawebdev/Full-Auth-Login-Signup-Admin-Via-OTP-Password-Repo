import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ProductContext = React.createContext();

const ProductsPage = () => {
  const allProducts = Array(45).fill(null).map((_, i) => ({
    id: `#7712309${i}`,
    name: 'Dog Food, Chicken & Chicken Liver Recipe...',
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: 'Out of stock',
    startDate: '$28,672.36',
    image: 'https://img.freepik.com/premium-psd/skincare-product-sale-poster-template_597316-411.jpg?semt=ais_hybrid&w=740'
  }));

  const [editProductId , setEditProductId ] = useState("");

  return (
    <ProductContext.Provider value={{ allProducts , setEditProductId  , editProductId}}>
      <div className="product-page-main-container">
        {/* Common header or sidebar can go here */}
        <Outlet />
      </div>
    </ProductContext.Provider>
  );
};

export default ProductsPage;
