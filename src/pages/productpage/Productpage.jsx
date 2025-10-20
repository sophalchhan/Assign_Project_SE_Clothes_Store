import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";
import "./Productpage.css";

const Productpage = () => {
  const [clothes, setClothes] = useState([]);
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();
  const filterRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // const categories = [...new Set(clothes.map((item) => item.category))];

  const filteredProducts = clothes.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Men" || filter === "Women") return item.type === filter;
    if (filter === "Boys" || filter === "Girls") return item.type === filter;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  // Scroll detection to add sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      const offset = filterRef.current.getBoundingClientRect().top;
      setIsSticky(offset <= 70); // matches top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Headercomponent />

      {/* <div className="container text-primary">
        <h3>All Products</h3>
        <hr />
      </div> */}

      {/* Sticky Filter Buttons */}
      <div
        ref={filterRef}
        className={`container mb-2 filter-container ${isSticky ? "sticky" : ""}`}
      >
        <div className="d-flex gap-2 flex-wrap">
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
          {/* {categories.map((cat) => (
            <button
              key={cat}
              className={`btn filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))} */}
        </div>
      </div>

      {/* Product List */}
      <div className="container w-100">
        <div className="row">
          {filteredProducts.map((item) => (
            <div key={item.id} className="col-3 mb-4">
              <div className="card border-0 rounded-0 h-100 category-card">
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
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={() => addToCart(item)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </div>

      <Footercomponent />
    </>
  );
};

export default Productpage;
