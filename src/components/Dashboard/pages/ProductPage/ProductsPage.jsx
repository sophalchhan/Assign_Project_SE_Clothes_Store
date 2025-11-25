import React, { useState } from "react";
import {
  BsBox,
  BsSearch,
  BsPlus,
} from "react-icons/bs";
import ProductCard from "../../../UI/ProductCard";
import "./ProductPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "T-Shirts",
      price: 29.99,
      stock: 45,
      sales: 120,
      status: "active",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150",
      rating: 4.5,
      description: "Comfortable cotton t-shirt for everyday wear"
    },
    {
      id: 2,
      name: "Denim Jacket",
      category: "Jackets",
      price: 89.99,
      stock: 12,
      sales: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150",
      rating: 4.8,
      description: "Classic denim jacket for casual occasions"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    rating: 0,
    status: "active",
    sales: 0
  });

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const toggleProductStatus = (id) => {
    setProducts(
      products.map(product =>
        product.id === id
          ? { ...product, status: product.status === "active" ? "inactive" : "active" }
          : product
      )
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };

    setProducts([...products, productToAdd]);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      rating: 0,
      status: "active",
      sales: 0
    });

    setShowAddModal(false);
  };

  const categories = ["all", ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const productsStats = [
    { value: products.length, label: "Total Products" },
    { value: products.filter(p => p.status === "active").length, label: "Active Products" },
    { value: products.filter(p => p.status === "out-of-stock").length, label: "Out of Stock" },
    {
      value: `$${products
        .reduce((total, product) => total + product.sales * product.price, 0)
        .toLocaleString()}`,
      label: "Total Sales"
    }
  ];

  return (
    <div className="products-page">

      {/* Header */}
      <div className="products-header clean-card">
        <div>
          <h1 className="page-title">Products Management</h1>
          <p className="page-subtitle">Manage, add, and organize your store products</p>
        </div>

        <button className="btn-primary add-btn" onClick={() => setShowAddModal(true)}>
          <BsPlus size={20} /> Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box smooth-card">
            <h2 className="modal-title">Add New Product</h2>

            <form onSubmit={handleAddProduct} className="modal-form">

              <div className="modal-grid">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />

                <input
                  type="file"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                className="textarea-large"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="btn-primary wide-btn">Add Product</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="products-stats stats-grid">
        {productsStats.map((stat, index) => (
          <div key={index} className="product-stat-card smooth-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="products-filters clean-card">
        <div className="search-box">
          <BsSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== "all").map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="low-stock">Low Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products smooth-card">
            <BsBox className="no-products-icon" />
            <h3>No products found</h3>
            <p>Try changing your filters</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
              onToggleStatus={toggleProductStatus}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default ProductsPage;
