import React from "react";
import {
  BsHouseDoor,
  BsCart,
  BsBox,
  BsPersonCircle,
  BsBell,
  BsGear,
  BsList
} from "react-icons/bs";

const Sidebar = ({ collapsed, activePage, setActivePage, toggleSidebar }) => {
  const menuItems = [
    { key: "dashboard", icon: BsHouseDoor, label: "Dashboard" },
    { key: "orders", icon: BsCart, label: "Orders" },
    { key: "products", icon: BsBox, label: "Products" },
    { key: "profile", icon: BsPersonCircle, label: "Profile" },
    { key: "notifications", icon: BsBell, label: "Notifications" },
    { key: "settings", icon: BsGear, label: "Settings" }
  ];

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="sidebar-header">
        <h2 className="logo">{collapsed ? "C" : "Clothes Store"}</h2>
        <BsList className="toggle-btn" onClick={toggleSidebar} />
      </div>

      <ul className="menu">
        {menuItems.map(item => {
          const IconComponent = item.icon;
          return (
            <li 
              key={item.key}
              className={activePage === item.key ? "active" : ""} 
              onClick={() => setActivePage(item.key)}
            >
              <IconComponent /> 
              {!collapsed && item.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;