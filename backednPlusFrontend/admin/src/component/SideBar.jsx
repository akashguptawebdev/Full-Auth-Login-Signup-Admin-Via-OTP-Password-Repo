import React, { useEffect, useRef, useState } from 'react';
import './SideBar.scss';
import {
  FaTachometerAlt, FaShoppingCart, FaBox, FaTags, FaClipboardList,
  FaUser, FaUserShield, FaImages
} from 'react-icons/fa';
import { CornerRightDown, CornerRightUp, Menu } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const { darkLightColor, isSideBarActive } = useSelector((state) => state.app);
  const [isEcommPageActive, setIsEcommPageActive] = useState(false);
  const [isCategoryPageActive, setIsCategoryPageActive] = useState(false);
  const [isOrderPageActive, setIsOrderPageActive] = useState(false);
  const [isUserPageActive, setIsUserPageActive] = useState(false);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const closeSidebar = () => {
    dispatch({ type: "IS_SIDEBAR_ACTIVE", payload: false });
  };

  const handleNavigate = (route) => {
    closeSidebar();
    if (route) navigate(route);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeSidebar();
      }
    }

    if (isSideBarActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideBarActive]);

  const isActiveRoute = (path) => location.pathname.includes(path);

  return (
    <div className="sidebar" style={{ backgroundColor: darkLightColor }} ref={navRef}>
      <div className="logo">
        <div className="logo_icon" onClick={() => handleNavigate("/")}>
          <img src="https://static.vecteezy.com/system/resources/previews/006/547/168/non_2x/creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg" alt="logo" />
          <h3>E-COMM</h3>
        </div>
        <Menu className="menu" onClick={closeSidebar} />
      </div>

      <div className="menu-section">
        <p className="section-title">MAIN HOME</p>
        <div
          className={`menu-item ${isActiveRoute("dashboard") ? "active" : ""}`}
          onClick={() => handleNavigate("/dashboard")}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="menu-section">
        <p className="section-title">ALL PAGES</p>

        <div className="menu-group">
          <div className={`menu-item ${isEcommPageActive ? "active" : ""}`} onClick={() => setIsEcommPageActive(!isEcommPageActive)}>
            <FaShoppingCart />
            <span>Ecommerce</span>
            {isEcommPageActive ? <CornerRightUp /> : <CornerRightDown />}
          </div>
          <div className="submenu" style={{ display: isEcommPageActive ? "flex" : "none" }}>
            <span className={isActiveRoute("addProduct") ? "active" : ""} onClick={() => handleNavigate("/addProduct")}>Add Product</span>
            <span className={isActiveRoute("product-table") ? "active" : ""} onClick={() => handleNavigate("/product/product-table")}>Product List</span>
          </div>
        </div>
        <div className="menu-group">
          <div className={`menu-item ${isActiveRoute("category") ? "active" : ""}`} onClick={() => setIsCategoryPageActive(!isCategoryPageActive)}>
            <FaBox />
            <span>Category</span>
            {isCategoryPageActive ? <CornerRightUp /> : <CornerRightDown />}
          </div>
          <div className="submenu" style={{ display: isCategoryPageActive ? "flex" : "none" }}>
            <span className={isActiveRoute("category") ? "active" : ""} onClick={() => handleNavigate("category/category-table")}>Category List</span>
            <span className={isActiveRoute("product-table") ? "active" : ""} onClick={() => handleNavigate("/category/create-category")}>New Category</span>
          </div>
        </div>
        <div className="menu-group">
          <div className={`menu-item ${isActiveRoute("order") ? "active" : ""}`} onClick={() => setIsOrderPageActive(!isOrderPageActive)}>
            <FaClipboardList />
            <span>Order</span>
            {isOrderPageActive ? <CornerRightUp /> : <CornerRightDown />}
          </div>
          <div className="submenu" style={{ display: isOrderPageActive ? "flex" : "none" }}>
            <span className={isActiveRoute("order") ? "active" : ""} onClick={() => handleNavigate("/order/order-table")}>Order List</span>
            {/* <span className={isActiveRoute("product-table") ? "active" : ""} onClick={() => handleNavigate("/product/product-table")}>Manage Order </span> */}
          </div>
        </div>

        <div className="menu-group">
          <div className={`menu-item ${isActiveRoute("user") ? "active" : ""}`} onClick={() => setIsUserPageActive(!isUserPageActive)}>
            <FaUser />
            <span>User</span>
            {isUserPageActive ? <CornerRightUp /> : <CornerRightDown />}
          </div>
          <div className="submenu" style={{ display: isUserPageActive ? "flex" : "none" }}>
            <span className={isActiveRoute("user") ? "active" : ""} onClick={() => handleNavigate("/user/users-table")}>All User List</span>
            {/* <span className={isActiveRoute("product-table") ? "active" : ""} onClick={() => handleNavigate("/product/product-table")}>Manage Order </span> */}
          </div>
        </div>
          
      </div>
    </div>
  );
};

export default SideBar;
