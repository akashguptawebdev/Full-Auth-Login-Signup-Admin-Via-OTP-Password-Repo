import React, { useEffect, useRef, useState } from 'react';
import GlobalSearch from './GlobalSearch';
import { Bell, Moon, MessageSquare, Maximize2, Grid, Settings, Menu, Sun, LogOut, Cookie } from 'lucide-react';
import './NavBar.scss';
import { useDispatch, useSelector } from "react-redux";
import "../color/_CustomColor.scss"
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const { isSideBarActive , isDarkModeActive , darkLightColor } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);
  const [isSettingActive , setIsSettingActive] = useState(false);
  const [darkMode , setdarkMode] = useState("");
  const dispatch = useDispatch();
  const navIconsRef = useRef(null);
  const navigate = useNavigate();
  const HandleDarkMode = () => {
    const style = getComputedStyle(document.documentElement);
    const mode = style.getPropertyValue(!isDarkModeActive ? "--darkMode" : "--lightMode") || "#ffffff";
    setdarkMode(mode)
    dispatch({
      type: "IS_DARKMODE_ACTIVE",
      payload: !isDarkModeActive
    });
  
    dispatch({
      type: "SET_DARKMODE_LIGHT_COLOR",
      payload: mode.trim()
    });
  };

  useEffect(() => {
  }, [darkLightColor , isDarkModeActive])

  const HandleSideBar = ()=>{
    dispatch({
      type:"IS_SIDEBAR_ACTIVE",
      payload:true
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (navIconsRef.current && !navIconsRef.current.contains(event.target)) {
        setIsSettingActive(false);
      }
    }
  
    if (isSettingActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingActive]);

  const HandleLogOut = () => {
    dispatch({
      type: "LOGOUT_USER_SUCCESS"
    });
    Cookie.remove("token");
    navigate("/");
  }

  return (
    <div className="nav-bar navbar" style={{ backgroundColor: darkMode }}>
      <Menu  className='menu' onClick={HandleSideBar} style={{display:`${isSideBarActive? "none":""}`}}/>

      <GlobalSearch />  
      <div className={`nav-icons ${isSettingActive ? 'active-setting' : ''}`} ref={navIconsRef}> 
      
        <div className="icon-wrapper">
        {isDarkModeActive ? <Moon  onClick={HandleDarkMode}/> : <Sun onClick={HandleDarkMode}/>}
        </div>
        <div className="logout-wrapper icon-wrapper" data-tooltip="Logout" onClick={HandleLogOut}>
           <LogOut color="#df3a3a" />
        </div>
        <div className="icon-wrapper notification">
          <Bell />
          <span className="badge red">1</span>
        </div>


        <div className="icon-wrapper notification">
          <MessageSquare />
          <span className="badge blue">1</span>
        </div>

        <div className="icon-wrapper">
          <Maximize2 />
        </div>

        <div className="profile" onClick={()=>navigate("user/profile")}>
          <img
            src={user?.profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="Kristin Watson"
          />
          <p className="role">{user.role =="admin"?user.role : "" }</p>
        </div>

        <div className="icon-wrapper" id='nav-setting' onClick={()=>setIsSettingActive(!isSettingActive)}>
          <Settings  />
        </div>
     
      </div>
    </div>
  );
};

export default NavBar;
