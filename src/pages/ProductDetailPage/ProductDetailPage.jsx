import { useLocation, useNavigate } from "react-router-dom";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetailPage.css";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;

  if (!product) {
    return (
      <>
        <Headercomponent />
        <div className="container my-5 text-center">
          <h2>Product not found</h2>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>
        <Footercomponent />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Headercomponent />
      
      <div className="container my-5">
        <button 
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back
        </button>

        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "850px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{product.name}</h1>
            <h3 className="text-primary my-3">US {product.price} $</h3>
            <p className="text-muted">Size: {product.size}</p>
            <p className="text-muted">Category: {product.category}</p>
            
            <div className="mt-4">
              <h5>Description</h5>
              <p>
                This is a premium quality {product.category.toLowerCase()} item. 
                Perfect for everyday wear with comfortable fit and stylish design.
              </p>
            </div>

            <button
              className="btn btn-primary btn-lg mt-4"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footercomponent />
    </>
  );
};

export default ProductDetail;