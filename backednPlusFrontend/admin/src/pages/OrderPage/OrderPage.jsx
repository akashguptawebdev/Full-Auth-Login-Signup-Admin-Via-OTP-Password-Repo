import React from 'react'
import { Outlet } from 'react-router-dom'
export const OrderContext = React.createContext();

const OrderPage = () => {
  const orders = [
    {
      id: '7712301',
      productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShSYo2p2TtI4i29_46qYY2Or5Kj3UWq8qm-Q&s',
      name: 'Kristin Watson',
      price: '$1,452.500',
      quantity: 1638,
      payment: 20,
      status: 'Success',
    },
    {
      id: '7712302',
      productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ868djAR5mIlAFnnjF---4paarCg48aQTr-g&s',
      name: 'Kristin Watson',
      price: '$1,452.500',
      quantity: 1638,
      payment: 20,
      status: 'Pending',
    },
    {
      id: '7712303',
      productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7ElBNPs-HbYJJOMHRu7lEmphTn8-52FYKw&s',
      name: 'Kristin Watson',
      price: '$1,452.500',
      quantity: 1638,
      payment: 20,
      status: 'Cancel',
    },
  ];
  
  return (
     <OrderContext.Provider value={{orders}}>
       <div className="order-page-main-container">
         <Outlet />
       </div>
     </OrderContext.Provider>
  )
}

export default OrderPage