import React, { useContext } from 'react';
import "./OrderList.scss";
import NavigateBack from '../NavigateBack';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../pages/OrderPage/OrderPage';

const getStatusClass = (status) => {
  switch (status) {
    case 'Success':
      return 'status success';
    case 'Pending':
      return 'status pending';
    case 'Cancel':
      return 'status cancel';
    default:
      return 'status';
  }
};


const OrdersList = () => {
    const navigate = useNavigate();
    const {orders} = useContext(OrderContext);
    const HandleManageOrder = (OrderId)=>{
        navigate(`/order/manage/${OrderId}`)
    }
  return (
    <>
      <NavigateBack pageName={"Order Table"} />
      <div className="orders">
        <div className="header">
          <h2>Order List</h2>
          <button className="export-btn">Export all order</button>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Search here..." />
          <button className="search-btn">🔍</button>
        </div>

        {/* Table for desktop */}
        <table className="order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Order ID</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} onClick={()=>HandleManageOrder(order.id)}>
                <td className="product" >
                  <img src={order.productImage} alt="product" />
                  <span>{order.name}</span>
                </td>
                <td>{order.id}</td>
                <td>{order.price}</td>
                <td>{order.quantity.toLocaleString()}</td>
                <td>{order.payment}</td>
                <td>
                  <span className={getStatusClass(order.status)}>{order.status}</span>
                </td>
                <td>
                  <button className="track-btn">Tracking</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cards for mobile */}
        <div className="order-cards">
          {orders.map((order, i) => (
            <div className="order-card" key={i} onClick={()=> HandleManageOrder(order.id)}>
              <div className="card-header">
                <img src={order.productImage} alt="product" />
                <div>
                  <h4>{order.name}</h4>
                  <p>ID: {order.id}</p>
                </div>
              </div>
              <p><strong>Price:</strong> {order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity.toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={getStatusClass(order.status)}>{order.status}</span>
              </p>
              <button className="track-btn">Tracking</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersList;
