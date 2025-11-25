import React from "react";
import { BsSearch, BsMoon, BsSun, BsBell, BsBellFill, BsPersonCircle } from "react-icons/bs";

const TopBar = ({ 
  darkMode, 
  toggleDarkMode, 
  toggleNotifications, 
  unreadCount, 
  setActivePage 
}) => {
  return (
    <div className="topbar">
      <div className="search-box">
        <BsSearch />
        <input type="text" placeholder="Search products..." />
      </div>

      <div className="topbar-right">
        <div className="icon-wrapper" onClick={toggleDarkMode}>
          {darkMode ? <BsSun className="icon" /> : <BsMoon className="icon" />}
        </div>
        
        <div className="icon-wrapper notification-icon" onClick={toggleNotifications}>
          {unreadCount > 0 ? <BsBellFill className="icon" /> : <BsBell className="icon" />}
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>
        
        <div 
          className="profile-img-container"
          onClick={() => setActivePage("profile")}
          style={{ cursor: 'pointer' }}
        >
          <BsPersonCircle className="profile-img" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;