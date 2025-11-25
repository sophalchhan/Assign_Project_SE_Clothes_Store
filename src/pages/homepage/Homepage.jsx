import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";
import "./Homepage.css";

const Homepage = () => {
  // State to store clothes data fetched from API
  const [clothes, setClothes] = useState([]);
  
  // Refs for carousel and scrollable sections
  const carouselRef = useRef(null); // Reference for Bootstrap carousel
  const scrollRefs = useRef({}); // Object to store refs for each category's scroll container
  const { addToCart } = useCart(); // Cart context function to add items
  const navigate = useNavigate(); // Navigation hook for routing

  // useEffect hook runs once when component mounts
  useEffect(() => {
    // Fetch clothes data from JSON server
    fetch("http://localhost:4000/clothes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load clothes data");
        return res.json();
      })
      .then((data) => setClothes(data)) // Update state with fetched data
      .catch((err) => console.error(err)); // Handle errors

    // Initialize Bootstrap carousel if ref exists
    if (carouselRef.current) {
      new bootstrap.Carousel(carouselRef.current, {
        interval: 3000, // Auto-advance every 3 seconds
        ride: "carousel", // Start automatically
        pause: "hover", // Pause on hover
        touch: true, // Enable touch swiping
        wrap: true, // Loop back to start after last slide
      });
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Group clothes by category using reduce
  // Creates an object where keys are categories and values are arrays of items
  const grouped = clothes.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []; // Initialize category array if it doesn't exist
    acc[item.category].push(item); // Add current item to its category array
    return acc;
  }, {}); // Start with empty object

  // Function to scroll left in a specific category's container
  const scrollLeft = (category) => {
    scrollRefs.current[category]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  // Function to scroll right in a specific category's container
  const scrollRight = (category) => {
    scrollRefs.current[category]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Handle click on product card - navigates to product detail page
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Handle click on Buy button - adds product to cart and stops event propagation
  const handleBuyClick = (e, product) => {
    e.stopPropagation(); // Prevent triggering the card's click event
    addToCart(product); // Add product to cart using context function
  };

  return (
    <>
      {/* Header Component */}
      <Headercomponent />

      {/* Hero Carousel Section */}
      <div id="heroCarousel" className="carousel slide" ref={carouselRef}>
        <div className="carousel-inner my-5">
          {/* First carousel slide (active by default) */}
          <div className="carousel-item active">
            <img
              src="https://i.pinimg.com/736x/d7/9b/cb/d79bcbecdc093cad6ca78c6e2364ab7b.jpg"
              className="d-block w-100 "
              alt="Fashion 1"
              style={{ height: "800px", objectFit: "cover" }}
            />
          </div>
          {/* Second carousel slide */}
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/236x/08/26/55/0826559a27521d1e02b39615648cbb79.jpg"
              className="d-block w-100"
              alt="Fashion 2"
              style={{ height: "900px", objectFit: "cover" }}
            />
          </div>
          {/* Third carousel slide */}
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/736x/26/76/35/2676357c7681e8ac980717b9776d06d8.jpg"
              className="d-block w-100"
              alt="Fashion 3"
              style={{ height: "800px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Features Image Section */}
      <section className="container text-center mt-5">
        <h2 className="fw-bold mb-4 section-title">FEATURES</h2>
        <div className="row g-4">
          {/* Feature 1 */}
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/236x/d9/df/d8/d9dfd890e30b2dbaaf37d48c6b7d53c5.jpg"
              className="img-fluid rounded shadow-sm feature-img"
              alt="Feature 1"
            />
          </div>

          {/* Feature 2 */}
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/originals/55/e9/a3/55e9a37477e98cb9f0127b8e242e8769.jpg"
              className="img-fluid rounded shadow-sm feature-img"
              alt="Feature 2"
            />
          </div>

          {/* Feature 3 */}
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/51/4a/91/514a91d9221f1a2ecb2eace77f9834f1.jpg"
              className="img-fluid rounded shadow-sm feature-img"
              alt="Feature 3"
            />
          </div>
        </div>
      </section>

      {/* Category Sections - Dynamically generated from grouped data */}
      {Object.keys(grouped).length === 0 ? (
        // Show loading message if no categories exist
        <p className="text-center my-5">Loading products...</p>
      ) : (
        // Map through each category and create a section
        Object.keys(grouped).map((category) => (
          <div key={category} className="container position-relative my-5">
            {/* Category Title */}
            <h2 className="mb-4 text-capitalize">{category}</h2>

            {/* Left Scroll Button */}
            <button
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
              onClick={() => scrollLeft(category)}
              style={{ zIndex: 10 }}
            >
              ‹
            </button>

            {/* Scrollable Row for Products */}
            <div
              ref={(el) => (scrollRefs.current[category] = el)} // Store ref for this category's scroll container
              className="d-flex flex-nowrap overflow-x-auto py-1"
              style={{ gap: "1rem", scrollBehavior: "smooth" }}
            >
              {/* Map through each product in the current category */}
              {grouped[category].map((item) => (
                <div
                  key={item.id}
                  className="card shadow-sm category-card"
                  style={{ minWidth: "300px", cursor: "pointer" }}
                  onClick={() => handleProductClick(item)} // Navigate to product page on click
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "450px", objectFit: "cover" }}
                  />
                  {/* Product Details */}
                  <div className="card-footer bg-white">
                    <h5 className="fw-bold">{item.name}</h5>
                    <h6 className="text-muted">US {item.price} $</h6>
                    <p>Size: {item.size}</p>

                    {/* Buy Button */}
                    <button
                      className="btn btn-primary mt-2 w-100"
                      style={{ 
                        backgroundColor: '#007bff', 
                        borderColor: '#007bff', 
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                      onClick={(e) => handleBuyClick(e, item)} // Add to cart on click
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
              onClick={() => scrollRight(category)}
              style={{ zIndex: 10 }}
            >
              ›
            </button>
          </div>
        ))
      )}

      {/* Footer Component */}
      <Footercomponent />
    </>
  );
};

export default Homepage;