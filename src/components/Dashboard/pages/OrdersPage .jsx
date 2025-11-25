import React, { useState } from "react";
import { BsDownload, BsPrinter, BsFilePdf } from "react-icons/bs";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Example Fake Orders (replace with your real API data)
  const [orders] = useState([
    {
      orderNumber: "ORD-001",
      customer: "Sok Dara",
      email: "dara@gmail.com",
      date: "2025-11-01",
      status: "Completed",
      total: 120.5,
    },
    {
      orderNumber: "ORD-002",
      customer: "Chan Sreyna",
      email: "sreyna@gmail.com",
      date: "2025-11-03",
      status: "Pending",
      total: 75.0,
    },
  ]);

  // Filter Orders by Search
  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export CSV
  const exportCSV = () => {
    const header = ["Order ID,Customer,Email,Date,Status,Total"];
    const rows = orders.map(
      (o) =>
        `${o.orderNumber},${o.customer},${o.email},${o.date},${o.status},$${o.total}`
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders_export.csv";
    link.click();
  };

  // Print Table
  const printOrders = () => {
    const printContent = document.getElementById("orders-table-print").innerHTML;
    const printWindow = window.open("", "", "width=900,height=700");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Orders</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background: #f8f9fa; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // Export PDF
  const exportPDF = () => {
    const content = document.getElementById("orders-table-print").innerHTML;
    const pdfWindow = window.open("", "", "width=900,height=700");

    pdfWindow.document.write(`
      <html>
        <head>
          <title>Orders PDF</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; font-size: 14px; }
            th { background: #f1f1f1; }
            tr:nth-child(even) { background: #fafafa; }
          </style>
        </head>
        <body>
          <h2>Orders Report</h2>
          ${content}
        </body>
      </html>
    `);

    pdfWindow.document.close();
    pdfWindow.print();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Orders</h2>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by customer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Buttons */}
      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={exportCSV}>
          <BsDownload /> Export CSV
        </button>

        <button className="btn btn-secondary" onClick={printOrders}>
          <BsPrinter /> Print
        </button>

        <button className="btn btn-danger" onClick={exportPDF}>
          <BsFilePdf /> PDF
        </button>
      </div>

      {/* Orders Table */}
      <div id="orders-table-print">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total ($)</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.customer}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
