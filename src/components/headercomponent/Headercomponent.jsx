import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHouse,
  faStore,
  faAddressBook,
  faShop,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/cartcontext/Cartcontext";
import AuthModal from "./AuthModal";
import "./Headercomponent.css";

const Headercomponent = () => {
  const { cartCount } = useCart();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">

          <Link className="navbar-brand fw-bold text-dark" to="/">
            <FontAwesomeIcon icon={faShop} className="me-1" />
            CLOTHES STORE
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-3">
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

            <div className="d-flex gap-2">
              <Link to="/cart" className="btn btn-outline-primary position-relative">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button className="btn btn-primary" onClick={() => setShowAuth(true)}>
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
};

export default Headercomponent;
