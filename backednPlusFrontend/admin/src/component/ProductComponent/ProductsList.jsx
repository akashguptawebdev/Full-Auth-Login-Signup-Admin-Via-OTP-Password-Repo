import React, { useContext, useState } from 'react';
import './ProductsList.scss';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../pages/ProductPage/ProductsPage';
import NavigateBack from '../NavigateBack';
const ProductTable = () => {
  const { allProducts ,setEditProductId } = useContext(ProductContext);
    const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts?.filter(product =>
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const HandleNavigate = (productId)=>{
    navigate(`/product/edit/${productId.split("#")[1].toString()}`);
  }
 

  return (
    <>
    <NavigateBack pageName={"Product Table"}/>
    <div className="product-table-container">
      <div className="table-header">
        <p className="tip">💡 Tip: Search by Product ID</p>
        <div className="table-controls">
          <select onChange={handleRowsChange} value={rowsPerPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="add-btn" onClick={()=> navigate("/addProduct")}>➕ Add new</button>
        </div>
      </div>

      {/* Desktop Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sale</th>
            <th>Stock</th>
            <th>Start date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((product, index) => (
            <tr key={index} onClick={()=> HandleNavigate(product.id)}>
              <td>
                <div className="product-info">
                  <img src={product.image} alt="product" />
                  <span>{product.name}</span>
                </div>
              </td>
              <td>{product.id}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.sale}%</td>
              <td><span className="stock-badge">{product.stock}</span></td>
              <td>{product.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      {paginatedData.map((product, index) => (
        <div className="product-card" key={index} onClick={()=> HandleNavigate(product.id)}>
          <div className="product-info">
            <img src={product.image} alt="product" />
            <span>{product.name}</span>
          </div>
          <div className="product-details">
            <div className="detail">ID: <span>{product.id}</span></div>
            <div className="detail">Price: <span>${product.price.toFixed(2)}</span></div>
            <div className="detail">Qty: <span>{product.quantity}</span></div>
            <div className="detail">Sale: <span>{product.sale}%</span></div>
            <div className="detail">Start Date: <span>{product.startDate}</span></div>
          </div>
          <span className="stock-badge">{product.stock}</span>
        </div>
      ))}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductTable;
