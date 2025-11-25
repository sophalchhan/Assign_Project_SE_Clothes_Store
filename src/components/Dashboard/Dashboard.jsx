import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import NotificationsPanel from "./NotificationsPanel";
import DashboardHome from "./pages/DashboardHome";
import ProductsPage from "./pages/ProductPage/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import OrdersPage from "./pages/OrdersPage ";
import "./Dashboard.css";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #12345 has been placed",
      time: "5 min ago",
      read: false,
      type: "order"
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "T-shirt (Blue) is running low",
      time: "1 hour ago",
      read: false,
      type: "inventory"
    },
    {
      id: 3,
      title: "New Message",
      message: "You have a new customer message",
      time: "2 hours ago",
      read: true,
      type: "message"
    },
    {
      id: 4,
      title: "Weekly Report",
      message: "Your weekly sales report is ready",
      time: "1 day ago",
      read: true,
      type: "report"
    }
  ]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "orders":
        return <OrdersPage />;
      case "products":
        return <ProductsPage />;
      case "profile":
        return <ProfilePage />;
      case "notifications":
        return (
          <NotificationsPage 
            notifications={notifications}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
            markAllAsRead={markAllAsRead}
            unreadCount={unreadCount}
          />
        );
      case "settings":
        return <h1>Settings Page</h1>;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        collapsed={collapsed}
        activePage={activePage}
        setActivePage={setActivePage}
        toggleSidebar={toggleSidebar}
      />
      
      <main className="main">
        <TopBar 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleNotifications={toggleNotifications}
          unreadCount={unreadCount}
          setActivePage={setActivePage}
        />
        
        <NotificationsPanel 
          showNotifications={showNotifications}
          notifications={notifications}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
          markAllAsRead={markAllAsRead}
          unreadCount={unreadCount}
          setActivePage={setActivePage}
          setShowNotifications={setShowNotifications}
        />
        
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;