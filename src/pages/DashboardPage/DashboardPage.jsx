import React, { useState } from "react";
import {
  BsHouseDoor,
  BsCart,
  BsBox,
  BsCalendar,
  BsChatDots,
  BsBell,
  BsGear,
  BsSearch,
  BsMoon,
  BsPersonCircle,
  BsList,
  BsFolder,
} from "react-icons/bs";
import OrdersPage from "../OrderPage/Orderpage";
import ProjectsPage from "../DashboardProductPage/DashboardProductPage";
import "./Dashboardpage.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h1 className="page-title">Welcome Back 👋</h1>
            <div className="stats">
              <div className="stat-card">
                <h3>$12,340</h3>
                <p>Total Sales</p>
              </div>
              <div className="stat-card">
                <h3>320</h3>
                <p>Total Orders</p>
              </div>
              <div className="stat-card">
                <h3>89</h3>
                <p>Products</p>
              </div>
              <div className="stat-card">
                <h3>42</h3>
                <p>New Messages</p>
              </div>
            </div>
          </>
        );
      case "orders":
        return <OrdersPage />;
      case "products":
        return <h1>Products Page</h1>;
      case "projects":
        return <ProjectsPage />;
      case "calendar":
        return <h1>Calendar Page</h1>;
      case "messages":
        return <h1>Messages Page</h1>;
      case "notifications":
        return <h1>Notifications Page</h1>;
      case "settings":
        return <h1>Settings Page</h1>;
      default:
        return <h1>Welcome Back 👋</h1>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
        <div className="sidebar-header">
          <h2 className="logo">{collapsed ? "T" : "Clothes Store"}</h2>
          <BsList className="toggle-btn" onClick={toggleSidebar} />
        </div>

        <ul className="menu">
          <li 
            className={activePage === "dashboard" ? "active" : ""} 
            onClick={() => setActivePage("dashboard")}
          >
            <BsHouseDoor /> {!collapsed && "Dashboard"}
          </li>
          <li 
            className={activePage === "orders" ? "active" : ""} 
            onClick={() => setActivePage("orders")}
          >
            <BsCart /> {!collapsed && "Orders"}
          </li>
          <li 
            className={activePage === "products" ? "active" : ""} 
            onClick={() => setActivePage("products")}
          >
            <BsBox /> {!collapsed && "Products"}
          </li>
          <li 
            className={activePage === "projects" ? "active" : ""} 
            onClick={() => setActivePage("projects")}
          >
            <BsFolder /> {!collapsed && "Projects"}
          </li>
          <li 
            className={activePage === "calendar" ? "active" : ""} 
            onClick={() => setActivePage("calendar")}
          >
            <BsCalendar /> {!collapsed && "Calendar"}
          </li>
          <li 
            className={activePage === "messages" ? "active" : ""} 
            onClick={() => setActivePage("messages")}
          >
            <BsChatDots /> {!collapsed && "Messages"}
          </li>
          <li 
            className={activePage === "notifications" ? "active" : ""} 
            onClick={() => setActivePage("notifications")}
          >
            <BsBell /> {!collapsed && "Notifications"}
          </li>
          <li 
            className={activePage === "settings" ? "active" : ""} 
            onClick={() => setActivePage("settings")}
          >
            <BsGear /> {!collapsed && "Settings"}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Bar */}
        <div className="topbar">
          <div className="search-box">
            <BsSearch />
            <input type="text" placeholder="Search products..." />
          </div>

          <div className="topbar-right">
            <BsMoon className="icon" />
            <BsBell className="icon" />
            <BsPersonCircle className="profile-img" />
          </div>
        </div>

        {/* Content Section */}
        <div className="content-area">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;