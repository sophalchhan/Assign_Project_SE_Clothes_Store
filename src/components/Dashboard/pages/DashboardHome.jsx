import React from "react";
import StatCard from "../../UI/StatCard";

const DashboardHome = () => {
  const stats = [
    { value: "$12,340", label: "Total Sales" },
    { value: "320", label: "Total Orders" },
    { value: "89", label: "Products" },
    { value: "42", label: "New Messages" }
  ];

  return (
    <>
      <h1 className="page-title">Welcome Back 👋</h1>
      <div className="stats">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </>
  );
};

export default DashboardHome;