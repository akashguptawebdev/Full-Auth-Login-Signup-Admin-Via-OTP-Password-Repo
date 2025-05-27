import React from 'react';
import './Dashboard.scss';
import NavBar from '../component/navBar';
import SideBar from "../component/SideBar";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { isSideBarActive } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);
  console.log("user =>", user)
  return (
    <div className="main_container">
      <div style={{ display: `${isSideBarActive ? "" : "none"}` }}>
        <SideBar />
      </div>
      <div className="main_content">
        <NavBar />
        <div className="page_content">
          {/* Child page routes will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
