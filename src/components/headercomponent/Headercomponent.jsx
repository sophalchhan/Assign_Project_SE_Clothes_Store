import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHouse,
  faStore,
  // faBookmark,
  faAddressBook,
  faShop,
  faHeart,
  faBell,
  faCircleInfo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/cartcontext/Cartcontext";
import { Modal, Tab, Nav } from "react-bootstrap";
import "./Headercomponent.css";

//AuthModal Component
const AuthModal = ({ show, handleClose }) => {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="position-relative">
        {/* Close Button */}
        <button
          type="button"
          className="btn-close position-absolute"
          style={{ top: "10px", right: "15px" }}
          onClick={handleClose}
          aria-label="Close"
        ></button>
        
        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          {/* Tabs */}
          <Nav
            variant="tabs"
            className="mb-3 my-3 justify-items-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="login" className="mb-0 my-3 justify-content-center">LOGIN</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" className="mb-0 my-3 justify-content-center">REGISTER</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Login Form */}
            <Tab.Pane eventKey="login">
              <form>
                <div className="mb-3">
                  <label className="form-label">Gmail</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Gmail"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  LOGIN
                </button>
              </form>

              <p className="text-center mt-3">Forgot your password?</p>

              {/* <div className="text-center my-3">OR</div> */}

              {/* <button className="btn btn-outline-dark w-100 mb-2 d-flex align-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  alt="Google"
                  width="20"
                  height="20"
                  className="me-2"
                />
                <span className="flex-grow-1 text-center">Continue with Google</span>
              </button> */}

              {/* <button className="btn btn-outline-dark w-100 d-flex align-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  className="me-2"
                />
                <span className="flex-grow-1 text-center">Continue with Facebook</span>
              </button> */}


              <p className="text-center mt-3">
                New to Clothes Store?{" "}
                <a href="#" onClick={() => setActiveKey("register")}>
                  Register
                </a>
              </p>
            </Tab.Pane>

            {/*Register Form */}
            <Tab.Pane eventKey="register">
              <form>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  REGISTER
                </button>
              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <a href="#" onClick={() => setActiveKey("login")}>
                  Login
                </a>
              </p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

const Headercomponent = () => {
  const { cartCount } = useCart(); // get live cart count
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Brand / Logo */}
          <Link className="navbar-brand fw-bold text-dark" to="/">
            <FontAwesomeIcon icon={faShop} className="me-1" />
            CLOTHES STORE
          </Link>

          {/* Toggle for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Menu */}
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

            {/* Right Side Buttons */}
            <div className="d-flex gap-2">
              {/* <Link className="text-decoration-none btn btn-outline-primary position-relative border-0">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
              <Link className="text-decoration-none btn btn-outline-primary position-relative border-0">
                <FontAwesomeIcon icon={faBell} />
              </Link> */}
              <Link
                to="/cart"
                className="text-decoration-none btn btn-outline-primary position-relative"
              >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* 🔹 Login Button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowAuth(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Auth Modal */}
      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
};

export default Headercomponent;