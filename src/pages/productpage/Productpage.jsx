import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";
import "./Productpage.css";

const Productpage = () => {
  // State declarations
  const [clothes, setClothes] = useState([]); // Stores all products data
  const [filter, setFilter] = useState("All"); // Current type filter (All, Men, Women, etc.)
  const [categoryFilter, setCategoryFilter] = useState("All"); // Current category filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query from URL
  const { addToCart } = useCart(); // Cart context function
  const filterRef = useRef(null); // Reference to filter container for sticky behavior
  const [isSticky, setIsSticky] = useState(false); // Tracks if filter bar is sticky
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Access current URL location

  // Fetch products data on component mount
  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []); // Empty dependency array - runs once on mount

  // Handle search query from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search"); // Get 'search' query parameter from URL
    
    if (query) {
      setSearchQuery(query); // Set search query if exists
      setFilter("All"); // Reset type filter
      setCategoryFilter("All"); // Reset category filter
    } else {
      setSearchQuery(""); // Clear search query if no parameter
    }
  }, [location.search]); // Runs when URL search parameters change

  // Get unique categories based on current type filter
  const getCategoriesByType = () => {
    if (filter === "All") {
      // If "All" filter, get all unique categories from all products
      const allCategories = [...new Set(clothes.map(item => item.category))];
      return ["All", ...allCategories]; // Include "All" option
    }
    
    // If specific type filter, get categories only from that type
    const typeCategories = clothes
      .filter(item => item.type === filter) // Filter by current type
      .map(item => item.category); // Extract categories
    
    const uniqueCategories = [...new Set(typeCategories)]; // Remove duplicates
    return ["All", ...uniqueCategories]; // Include "All" option
  };

  // Combined filtering logic for type, category, and search
  const filteredProducts = clothes.filter((item) => {
    // Type filter: Check if item matches selected type (or "All")
    let typeMatch = true;
    if (filter !== "All") {
      typeMatch = item.type === filter;
    }

    // Category filter: Check if item matches selected category (or "All")
    let categoryMatch = true;
    if (categoryFilter !== "All") {
      categoryMatch = item.category.toLowerCase() === categoryFilter.toLowerCase();
    }

    // Search filter: Check if item matches search query in various fields
    let searchMatch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      searchMatch = 
        item.name.toLowerCase().includes(query) || // Search in name
        item.description?.toLowerCase().includes(query) || // Search in description
        item.category?.toLowerCase().includes(query) || // Search in category
        item.type?.toLowerCase().includes(query); // Search in type
    }

    // Return true only if all filters match
    return typeMatch && categoryMatch && searchMatch;
  });

  // Reset category filter when type filter changes
  useEffect(() => {
    setCategoryFilter("All"); // Clear category selection when type changes
  }, [filter]); // Runs when filter state changes

  // Scroll detection for sticky filter behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      const offset = filterRef.current.getBoundingClientRect().top; // Get distance from top
      setIsSticky(offset <= 70); // Set sticky when 70px from top
    };

    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []); // Empty dependency array - runs once

  // Navigate to individual product detail page
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Add product to cart and prevent card click event
  const handleBuyClick = (e, product) => {
    e.stopPropagation(); // Prevent triggering parent card click
    addToCart(product); // Add to cart using context
  };

  // Clear search query and reset URL
  const clearSearch = () => {
    setSearchQuery(""); // Clear search state
    navigate("/product", { replace: true }); // Update URL without search parameter
  };

  const categories = getCategoriesByType(); // Get available categories for current filter

  return (
    <>
      <Headercomponent />

      {/* Search Results Header - Only shows when search is active */}
      {searchQuery && (
        <div className="container mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              Search Results for: "{searchQuery}"
              <span className="text-muted ms-2">({filteredProducts.length} products found)</span>
            </h4>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Sticky Filter Buttons Container */}
      <div
        ref={filterRef}
        className={`container mb-2 filter-container ${isSticky ? "sticky" : ""}`}
      >
        {/* Type Filter Buttons */}
        <div className="d-flex gap-2 flex-wrap mb-3">
          <button
            className={`btn filter-btn ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All Products
          </button>
          <button
            className={`btn filter-btn ${filter === "Men" ? "active" : ""}`}
            onClick={() => setFilter("Men")}
          >
            Men
          </button>
          <button
            className={`btn filter-btn ${filter === "Women" ? "active" : ""}`}
            onClick={() => setFilter("Women")}
          >
            Women
          </button>
          <button
            className={`btn filter-btn ${filter === "Boys" ? "active" : ""}`}
            onClick={() => setFilter("Boys")}
          >
            Boys
          </button>
          <button
            className={`btn filter-btn ${filter === "Girls" ? "active" : ""}`}
            onClick={() => setFilter("Girls")}
          >
            Girls
          </button>
        </div>

        {/* Category Filter Buttons - Only show when specific type is selected */}
        {filter !== "All" && categories.length > 1 && (
          <div className="d-flex gap-2 flex-wrap">
            <h6 className="w-100 mb-2">Categories:</h6>
            {categories.map(category => (
              <button
                key={category}
                className={`btn category-btn ${categoryFilter === category ? "active" : ""}`}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="container w-100">
        {filteredProducts.length === 0 ? (
          // No products found message
          <div className="text-center py-5">
            <h5 className="text-muted">
              {searchQuery 
                ? `No products found for "${searchQuery}"` // Search no results
                : filter !== "All" && categoryFilter !== "All"
                ? `No ${categoryFilter.toLowerCase()} found in ${filter}` // Type + category no results
                : filter !== "All"
                ? `No products found in ${filter}` // Type no results
                : "No products found" // General no results
              }
            </h5>
            {searchQuery && (
              <button 
                className="btn btn-primary mt-3"
                onClick={clearSearch}
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          // Products grid
          <div className="row">
            {filteredProducts.map((item) => (
              <div key={item.id} className="col-3 mb-4">
                {/* Product Card */}
                <div 
                  className="card border-0 rounded-0 h-100 category-card cursor-pointer"
                  onClick={() => handleProductClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body p-0">
                    <img
                      className="w-100 product-img"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="card-footer bg-white">
                    <h5 className="fw-bold">{item.name}</h5>
                    <h6 className="text-muted">US {item.price} $</h6>
                    <p>Size: {item.size}</p>
                    <p className="small text-muted">Category: {item.category}</p>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary mt-2 w-100"
                        onClick={(e) => handleBuyClick(e, item)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footercomponent />
    </>
  );
};

export default Productpage;