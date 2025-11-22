import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHouse,
  faStore,
  faAddressBook,
  faShop,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { HiSearch } from "react-icons/hi";
import { useCart } from "../../pages/cartcontext/Cartcontext";
import AuthModal from "./AuthModal";
import "./Headercomponent.css";

const Headercomponent = () => {
  const { cartCount } = useCart();
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">

          {/* LEFT - LOGO */}
          <Link className="navbar-brand fw-bold text-dark" to="/">
            <FontAwesomeIcon icon={faShop} className="me-1" />
            CLOTHES STORE
          </Link>

          {/* MENU CENTER */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-4 fw-semibold">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  <FontAwesomeIcon icon={faHouse} className="me-1" />
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/product">
                  <FontAwesomeIcon icon={faStore} className="me-1" />
                  Shop
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">
                  <FontAwesomeIcon icon={faCircleInfo} className="me-1" />
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">
                  <FontAwesomeIcon icon={faAddressBook} className="me-1" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SEARCH */}
          <div className="d-flex align-items-center gap-3">

            {/* SEARCH BAR */}
            <div className="input-group d-none d-md-flex" style={{ width: "260px" }}>
              <input
                type="text"
                className="form-control rounded-start-pill px-3 py-1"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn btn-outline-secondary rounded-end-pill"
                onClick={handleSearch}
              >
                <HiSearch />
              </button>
            </div>

            {/* CART */}
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative px-3"
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* LOGIN */}
            <button
              className="btn btn-primary px-3"
              onClick={() => setShowAuth(true)}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
};

export default Headercomponent;