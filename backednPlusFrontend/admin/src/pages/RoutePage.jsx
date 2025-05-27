import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './LoginAndSignupPage/LoginPage';
import SignUp from './LoginAndSignupPage/SignupPage';
import Dashboard from './Dashboard';

import AddProductPage from './ProductPage/AddProductPage';
import ProductsPage from './ProductPage/ProductsPage';
import ProductTable from '../component/ProductComponent/ProductsList';
import EditProduct from '../component/ProductComponent/EditProduct';

import CategoryPage from './CategoryPage/CategoryPage';
import CategoryList from '../component/Category/CategoryList';
import NewCategory from '../component/Category/NewCategory';
import EditCategory from '../component/Category/EditCategory';

import OrderPage from './OrderPage/OrderPage';
import OrdersList from '../component/Order/OrderList';
import ManageOrder from '../component/Order/ManageOrder';

import UserPage from './user/UserPage';
import AllUser from '../component/User/AllUser';

import './RoutePage.scss';
import UserProfile from './user/UserProfile';


// Protect routes that require login and admin role
const ProtectedRoute = ({ user, children }) => {
  if (!user?._id || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Prevent logged-in users from accessing login/signup
const IsLogInRoute = ({ user, children }) => {
  if (user?._id) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const RoutePage = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="mainPage-container">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<IsLogInRoute user={user}><Login /></IsLogInRoute>} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Product routes */}
          <Route path="addProduct" element={<AddProductPage />} />
          <Route path="product" element={<Outlet />}>
            <Route path="product-table" element={<ProductTable />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          {/* Category routes */}
          <Route path="category" element={<Outlet />}>
            <Route path="category-table" element={<CategoryList />} />
            <Route path="create-category" element={<NewCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>

          {/* Order routes */}
          <Route path="order" element={<Outlet />}>
            <Route path="order-table" element={<OrdersList />} />
            <Route path="manage/:id" element={<ManageOrder />} />
          </Route>

          {/* User management routes */}
          <Route path="user" element={<Outlet />}>
            <Route path="users-table" element={<AllUser />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default RoutePage;
