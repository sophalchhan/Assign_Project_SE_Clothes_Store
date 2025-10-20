// src/components/footercomponent/Footercomponent.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faGift, faPaperPlane, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok, } from "@fortawesome/free-brands-svg-icons";
import "./Footercomponent.css";   // <-- Add this line

const Footercomponent = () => {
  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-3 mt-5 footer-custom">
        <div className="container">
          <div className="row text-center text-md-start">
            {/* CLOTHES STORE QR / Logo */}
            <div className="col-md-2 mb-3">
              <h6 className="fw-bold">CLOTHES STORE</h6>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=clothesstore"
                alt="QR Code"
                className="img-fluid mt-2 hover-zoom"
              />
            </div>

            {/* Loyalty */}
            <div className="col-md-2 mb-3 footer-item">
              <h6 className="fw-bold">LOYALTY</h6>
              <p>
                <FontAwesomeIcon icon={faGift} className="me-2" />
                Membership & Benefits
              </p>
            </div>

            {/* Follow Us */}
            <div className="col-md-2 mb-3 footer-item">
              <h6 className="fw-bold">FOLLOW US</h6>
              <p>
                <FontAwesomeIcon icon={faTiktok} className="me-2" />
                TikTok
              </p>
              <p>
                <FontAwesomeIcon icon={faInstagram} className="me-2" />
                Instagram
              </p>
              <p>
                <FontAwesomeIcon icon={faFacebook} className="me-2" />
                Facebook
              </p>
            </div>

            {/* Location */}
            <div className="col-md-2 mb-3 footer-item">
              <h6 className="fw-bold">LOCATION</h6>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                Find a store
              </p>
            </div>

            {/* Contact Us */}
            <div className="col-md-2 mb-3 footer-item">
              <h6 className="fw-bold">CONTACT US</h6>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                clothe2store@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                0987654321 / 0123456789
              </p>
              <p>
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                Telegram
              </p>
            </div>

            {/* Payment Methods */}
            <div className="col-md-2 mb-3 footer-item">
              <h6 className="fw-bold">WE ACCEPT</h6>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                width="40"
                className="me-2 hover-zoom"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                alt="MasterCard"
                width="40"
                className="me-2 hover-zoom"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                width="50"
                className="hover-zoom"
              />
            </div>
          </div>

          <hr className="bg-white" />
          <p className="text-center mb-0">
            &copy; {new Date().getFullYear()} CLOTHES STORE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footercomponent;
