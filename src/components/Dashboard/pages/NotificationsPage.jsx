import React from "react";
import { BsBell, BsCart, BsBox, BsEnvelope, BsFolder } from "react-icons/bs";

const NotificationsPage = ({ 
  notifications, 
  markAsRead, 
  deleteNotification, 
  markAllAsRead, 
  unreadCount 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return <BsCart />;
      case 'inventory': return <BsBox />;
      case 'message': return <BsEnvelope />;
      case 'report': return <BsFolder />;
      default: return <BsBell />;
    }
  };

  return (
    <div className="notifications-page">
      <h1 className="page-title">Notifications</h1>
      <div className="notifications-container">
        <div className="notifications-header-page">
          <h2>All Notifications</h2>
          {unreadCount > 0 && (
            <button className="mark-all-read-btn" onClick={markAllAsRead}>
              Mark All as Read
            </button>
          )}
        </div>
        
        <div className="notifications-list-page">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <BsBell className="empty-icon" />
              <h3>No notifications yet</h3>
              <p>You're all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item-page ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content-page">
                  <div className="notification-header-page">
                    <h4>{notification.title}</h4>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p>{notification.message}</p>
                </div>
                <div className="notification-actions-page">
                  {!notification.read && (
                    <button 
                      className="mark-read-btn-page"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    className="delete-btn-page"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;