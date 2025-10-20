import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext"; // ✅ Import Cart Context
import "./Homepage.css";

const Homepage = () => {
  const [clothes, setClothes] = useState([]);
  const carouselRef = useRef(null);
  const scrollRefs = useRef({});
  const { addToCart } = useCart(); // ✅ Get addToCart function

  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data));

    if (carouselRef.current) {
      new bootstrap.Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
        pause: "hover",
        touch: true,
        wrap: true,
      });
    }
  }, []);

  // Group by category
  const grouped = clothes.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const scrollLeft = (category) => {
    scrollRefs.current[category].scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (category) => {
    scrollRefs.current[category].scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <Headercomponent />

      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide" ref={carouselRef}>
        <div className="carousel-inner my-5">
          <div className="carousel-item active">
            <img
              src="https://marketplace.canva.com/EAF0XmkzgQA/1/0/1600w/canva-gray-minimalist-new-collection-banner-O7EU5YM_MGU.jpg"
              className="d-block w-100"
              alt="Fashion 1"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://as1.ftcdn.net/jpg/03/81/07/74/1000_F_381077472_Zqttov9dRe2PwQcvYVBcPsUrrMY5EMRd.jpg"
              className="d-block w-100"
              alt="Fashion 2"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://marketplace.canva.com/EAFWecuevFk/1/0/1600w/canva-grey-brown-minimalist-summer-season-collections-banner-landscape-VXEmg9V800o.jpg"
              className="d-block w-100"
              alt="Fashion 3"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      {Object.keys(grouped).length === 0 ? (
        <p className="text-center my-5">Loading products...</p>
      ) : (
        Object.keys(grouped).map((category) => (
          <div key={category} className="container position-relative my-5">
            <h2 className="mb-4 text-capitalize">{category}</h2>

            {/* Scroll Buttons */}
            <button
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
              onClick={() => scrollLeft(category)}
              style={{ zIndex: 10 }}
            >
              ‹
            </button>

            {/* Scrollable Row */}
            <div
              ref={(el) => (scrollRefs.current[category] = el)}
              className="d-flex flex-nowrap overflow-x-auto py-2"
              style={{ gap: "1rem", scrollBehavior: "smooth" }}
            >
              {grouped[category].map((item) => (
                <div
                  key={item.id}
                  className="card shadow-sm category-card"
                  style={{ minWidth: "250px" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-footer bg-white">
                    <h5 className="fw-bold element">{item.name}</h5>
                    <h6 className="text-muted">US {item.price} $</h6>
                    <p>Size: {item.size}</p>

                    {/* ✅ Buy Button adds to cart */}
                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={() => addToCart(item)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll */}
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

      {/* About Section */}
      <div className="container-fluid bg-light p-5">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center">
            We bring you the best quality clothes and accessories at affordable
            prices. Our mission is to make you look stylish and confident every
            day.
          </p>
        </div>
      </div>

      <Footercomponent />
    </>
  );
};

export default Homepage;
