// ProductDetail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";
import { useCart } from "../cartcontext/Cartcontext";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Headercomponent />
      <div className="container my-5">
        <button 
          className="btn btn-secondary mb-3" 
          onClick={() => navigate(-1)}
        >
          ← Back to Products
        </button>
        
        <div className="row">
          <div className="col-md-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="img-fluid w-75"
            />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <h3 className="text-primary">US ${product.price}</h3>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Type:</strong> {product.type}</p>
            
            <div className="mt-4">
              <h5>Description</h5>
              <p>
                This is a premium quality {product.category.toLowerCase()} item. 
                Perfect for everyday wear with comfortable fit and stylish design.
              </p>
            </div>

            <button 
              className="btn btn-primary btn-lg mt-3"
              onClick={handleAddToCart}
            >
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