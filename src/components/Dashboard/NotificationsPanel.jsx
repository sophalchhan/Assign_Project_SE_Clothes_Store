import React from "react";
import { BsBell } from "react-icons/bs";

const NotificationsPanel = ({ 
  showNotifications, 
  notifications, 
  markAsRead, 
  deleteNotification, 
  markAllAsRead, 
  unreadCount, 
  setActivePage, 
  setShowNotifications 
}) => {
  return (
    <div className={`notifications-panel ${showNotifications ? 'show' : ''}`}>
      <div className="notifications-header">
        <h3>Notifications</h3>
        <div className="notifications-actions">
          {unreadCount > 0 && (
            <button className="mark-all-read" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
          <span className="notification-count">
            {unreadCount} unread
          </span>
        </div>
      </div>
      
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <BsBell className="no-notifications-icon" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
            >
              <div className="notification-content">
                <div className="notification-header">
                  <h4>{notification.title}</h4>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p>{notification.message}</p>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="notifications-footer">
        <button 
          className="view-all-btn"
          onClick={() => {
            setActivePage("notifications");
            setShowNotifications(false);
          }}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;