import React, { useState } from "react";
import './Orderpage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      customer: "John Doe", 
      email: "john@example.com",
      total: "$120", 
      items: 3,
      status: "Pending",
      date: "2024-01-15"
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      email: "jane@example.com",
      total: "$80", 
      items: 2,
      status: "Completed",
      date: "2024-01-14"
    },
    { 
      id: 3, 
      customer: "Mike Johnson", 
      email: "mike@example.com",
      total: "$210", 
      items: 4,
      status: "Processing",
      date: "2024-01-15"
    },
    { 
      id: 4, 
      customer: "Sarah Wilson", 
      email: "sarah@example.com",
      total: "$65", 
      items: 1,
      status: "Shipped",
      date: "2024-01-13"
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => (order.id === id ? { ...order, status: newStatus } : order)));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed": return "status-completed";
      case "Pending": return "status-pending";
      case "Processing": return "status-processing";
      case "Shipped": return "status-shipped";
      case "Cancelled": return "status-cancelled";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return "✓";
      case "Pending": return "⏱";
      case "Processing": return "🔄";
      case "Shipped": return "🚚";
      case "Cancelled": return "✕";
      default: return "";
    }
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div className="header-left">
          <h1>Orders</h1>
          <p>Manage and track your orders</p>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search orders..." />
            <span className="search-icon">🔍</span>
          </div>
          <button className="btn-primary">
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">📦</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏱</div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.status === "Pending").length}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✓</div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.status === "Completed").length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>${orders.reduce((sum, order) => sum + parseInt(order.total.replace('$', '')), 0)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <div className="table-header">
          <h3>Recent Orders</h3>
          <div className="table-actions">
            <select className="filter-select">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="order-row">
                <td className="order-id">#{order.id}</td>
                <td className="customer-info">
                  <div className="customer-name">{order.customer}</div>
                  <div className="customer-email">{order.email}</div>
                </td>
                <td className="order-date">{order.date}</td>
                <td className="order-items">{order.items} items</td>
                <td className="order-total">{order.total}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    <span className="status-icon">{getStatusIcon(order.status)}</span>
                    {order.status}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-buttons">
                    <button 
                      className="btn-action view"
                      title="View Details"
                    >
                      👁
                    </button>
                    <button 
                      className="btn-action complete"
                      onClick={() => updateStatus(order.id, "Completed")}
                      title="Mark Complete"
                    >
                      ✓
                    </button>
                    <button 
                      className="btn-action cancel"
                      onClick={() => updateStatus(order.id, "Cancelled")}
                      title="Cancel Order"
                    >
                      ✕
                    </button>
                    <button 
                      className="btn-action delete"
                      onClick={() => deleteOrder(order.id)}
                      title="Delete Order"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;