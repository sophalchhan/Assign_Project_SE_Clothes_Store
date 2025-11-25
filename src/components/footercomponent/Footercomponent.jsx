import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "./Footercomponent.css";

const Footercomponent = () => {
  return (
    <>
      <footer className="footer-modern">
        <div className="container">
          <div className="row text-center text-md-start">
            
            {/* LOGO & QR */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">CLOTHES STORE</h5>
              {/* <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=clothesstore"
                alt="QR Code"
                className="qr-img"
              /> */}
              <p className="footer-desc">Fashion for everyone.</p>
            </div>

            {/* FOLLOW */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">FOLLOW US</h5>
              <ul className="footer-list">
                <li><FontAwesomeIcon icon={faTiktok} /> TikTok</li>
                <li><FontAwesomeIcon icon={faInstagram} /> Instagram</li>
                <li><FontAwesomeIcon icon={faFacebook} /> Facebook</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">CONTACT US</h5>
              <ul className="footer-list">
                <li><FontAwesomeIcon icon={faEnvelope} /> clothe2store@gmail.com</li>
                <li><FontAwesomeIcon icon={faPhone} /> 0987654321 / 0123456789</li>
                <li><FontAwesomeIcon icon={faPaperPlane} /> Telegram</li>
              </ul>
            </div>

            {/* PAYMENT */}
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">WE ACCEPT</h5>
              <div className="payment-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width="45" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" width="45" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="60" />
              </div>
            </div>

          </div>

          <hr className="footer-hr" />

          <p className="text-center footer-copy">
            © {new Date().getFullYear()} CLOTHES STORE — All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footercomponent;
