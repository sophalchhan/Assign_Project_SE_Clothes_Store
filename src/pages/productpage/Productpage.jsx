import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";
import "./Productpage.css";

const Productpage = () => {
  const [clothes, setClothes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const filterRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products on component mount
  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Handle search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");
    
    if (query) {
      setSearchQuery(query);
      setFilter("All");
      setCategoryFilter("All");
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  // Get unique categories based on current filter
  const getCategoriesByType = () => {
    if (filter === "All") {
      const allCategories = [...new Set(clothes.map(item => item.category))];
      return ["All", ...allCategories];
    }
    
    const typeCategories = clothes
      .filter(item => item.type === filter)
      .map(item => item.category);
    
    const uniqueCategories = [...new Set(typeCategories)];
    return ["All", ...uniqueCategories];
  };

  // Combined filtering for type, category, and search
  const filteredProducts = clothes.filter((item) => {
    // Apply type filter
    let typeMatch = true;
    if (filter !== "All") {
      typeMatch = item.type === filter;
    }

    // Apply category filter
    let categoryMatch = true;
    if (categoryFilter !== "All") {
      categoryMatch = item.category.toLowerCase() === categoryFilter.toLowerCase();
    }

    // Apply search filter
    let searchMatch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      searchMatch = 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.type?.toLowerCase().includes(query);
    }

    return typeMatch && categoryMatch && searchMatch;
  });

  // Reset category filter when type changes
  useEffect(() => {
    setCategoryFilter("All");
  }, [filter]);

  // Scroll detection to add sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      const offset = filterRef.current.getBoundingClientRect().top;
      setIsSticky(offset <= 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleBuyClick = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const clearSearch = () => {
    setSearchQuery("");
    navigate("/product", { replace: true });
  };

  const categories = getCategoriesByType();

  return (
    <>
      <Headercomponent />

      {/* Search Results Header */}
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

      {/* Sticky Filter Buttons */}
      <div
        ref={filterRef}
        className={`container mb-2 filter-container ${isSticky ? "sticky" : ""}`}
      >
        {/* Type Filters */}
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

        {/* Category Filters - Only show when a specific type is selected */}
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

      {/* Product List */}
      <div className="container w-100">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">
              {searchQuery 
                ? `No products found for "${searchQuery}"`
                : filter !== "All" && categoryFilter !== "All"
                ? `No ${categoryFilter.toLowerCase()} found in ${filter}`
                : filter !== "All"
                ? `No products found in ${filter}`
                : "No products found"
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
          <div className="row">
            {filteredProducts.map((item) => (
              <div key={item.id} className="col-3 mb-4">
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