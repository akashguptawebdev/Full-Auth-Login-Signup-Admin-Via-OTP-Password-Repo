import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ManageOrder.scss';
import NavigateBack from '../NavigateBack';
import { OrderContext } from '../../pages/OrderPage/OrderPage';

// const orders = [
//   {
//     id: '7712309',
//     productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShSYo2p2TtI4i29_46qYY2Or5Kj3UWq8qm-Q&s',
//     name: 'Kristin Watson',
//     price: '$1,452.500',
//     quantity: 1638,
//     payment: 20,
//     status: 'Success',
//   },
//   {
//     id: '7712308',
//     productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ868djAR5mIlAFnnjF---4paarCg48aQTr-g&s',
//     name: 'John Doe',
//     price: '$952.99',
//     quantity: 840,
//     payment: 15,
//     status: 'Pending',
//   },
//   {
//     id: '7712307',
//     productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7ElBNPs-HbYJJOMHRu7lEmphTn8-52FYKw&s',
//     name: 'Alice Smith',
//     price: '$2,152.00',
//     quantity: 123,
//     payment: 30,
//     status: 'Cancel',
//   },
// ];

const getStatusClass = (status) => {
  switch (status) {
    case 'Success': return 'status success';
    case 'Pending': return 'status pending';
    case 'Cancel': return 'status cancel';
    default: return 'status';
  }
};

const ManageOrder = () => {
  const { id } = useParams();
  console.log("manag =>", id)
  const navigate = useNavigate();
  const {orders} = useContext(OrderContext);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const found = orders.find(order => order.id === id);
    if (found) {
      setOrder(found);
      setStatus(found.status);
    }
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setOrder({ ...order, status: e.target.value });
  };

  if (!order) {
    return <div className="manage-order">Order not found</div>;
  }

  return (
    <>
      <NavigateBack pageName="Manage Order" />
      <div className="manage-order">
        <div className="order-card">
          <div className="card-header">
            <img src={order.productImage} alt="product" />
            <div>
              <h4>{order.name}</h4>
              <p>ID: {order.id}</p>
            </div>
          </div>

          <div className="details">
            <p><strong>Price:</strong> {order.price}</p>
            <p><strong>Quantity:</strong> {order.quantity.toLocaleString()}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={getStatusClass(status)}>{status}</span>
            </p>

            <div className="status-update">
              <label htmlFor="status">Update Status:</label>
              <select id="status" value={status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="Success">Success</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>

            <button className="back-btn" onClick={() => navigate(-1)}>← Back to Orders</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrder;
