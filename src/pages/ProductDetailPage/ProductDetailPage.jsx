import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
  faShoppingCart,
  faHeart,
  faShare,
  faTruck,
  faShieldAlt,
  faUndo,
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../pages/cartcontext/Cartcontext";
import "./ProductDetailPage.css";
import Headercomponent from "../../components/headercomponent/Headercomponent";
import Footercomponent from "../../components/footercomponent/Footercomponent";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data - in real app, this would come from API
  const product = {
    id: id,
    name: "Premium Cotton T-Shirt",
    brand: "FashionCo",
    price: 29.99,
    originalPrice: 39.99,
    description: "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this t-shirt offers exceptional softness and breathability for everyday wear.",
    longDescription: "Our premium cotton t-shirt is crafted from the finest organic cotton, ensuring maximum comfort and durability. The fabric is pre-shrunk and maintains its shape wash after wash. Perfect for casual outings, workouts, or layering under your favorite jacket.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Reinforced neckline",
      "Double-stitched seams",
      "Machine washable",
      "Eco-friendly production"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Navy Blue", value: "#1e3a5f" },
      { name: "Forest Green", value: "#2d5a27" },
      { name: "Burgundy", value: "#800020" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.5,
    reviews: 127,
    inStock: true,
    sku: "TSHIRT-001",
    category: "T-Shirts",
    tags: ["casual", "cotton", "basic", "everyday"]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Classic V-Neck Tee",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "T-Shirts"
    },
    {
      id: 3,
      name: "Slim Fit Jeans",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Jeans"
    },
    {
      id: 4,
      name: "Hooded Sweatshirt",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Sweatshirts"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSelectedSize(product.sizes[2]); // Default to Medium
      setSelectedColor(product.colors[0].name); // Default to first color
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color before adding to cart");
      return;
    }

    setIsAddingToCart(true);
    
    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: product.images[0]
    };

    addToCart(cartItem);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Show success message or redirect
      alert("Product added to cart successfully!");
    }, 1000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to cart page after adding
    setTimeout(() => navigate("/cart"), 1500);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} className="text-warning" />);
      }
    }
    return stars;
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
        <Headercomponent/>
      {/* Breadcrumb */}
      {/* <nav aria-label="breadcrumb" className="container py-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/product" className="text-decoration-none">Shop</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/category/${product.category.toLowerCase()}`} className="text-decoration-none">
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav> */}

      <div className="container py-4">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 mb-5">
            <div className="product-image-main position-relative">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="img-fluid rounded main-image"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button className="carousel-control prev" onClick={prevImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className="carousel-control next" onClick={nextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}

              {/* Sale Badge */}
              {product.originalPrice > product.price && (
                <div className="sale-badge">SALE</div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="product-thumbnails mt-3">
              <div className="row g-2">
                {product.images.map((image, index) => (
                  <div key={index} className="col-3">
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className={`img-fluid thumbnail ${activeImage === index ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              {/* Brand & Category */}
              <div className="mb-2">
                <span className="text-muted">{product.brand}</span>
                <span className="text-muted mx-2">•</span>
                <span className="text-muted">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="product-title mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="product-rating mb-3">
                <div className="d-flex align-items-center">
                  <div className="stars me-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-value me-2">{product.rating}</span>
                  <span className="reviews-count text-muted">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="product-price mb-4">
                <span className="current-price h3 text-primary fw-bold">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price text-muted text-decoration-line-through ms-2">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="discount-badge badge bg-danger ms-2">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="product-description mb-4">{product.description}</p>

              {/* Size Selection */}
              <div className="size-selection mb-4">
                <label className="form-label fw-bold">Size: {selectedSize}</label>
                <div className="size-options d-flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="color-selection mb-4">
                <label className="form-label fw-bold">Color: {selectedColor}</label>
                <div className="color-options d-flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-option btn ${selectedColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <FontAwesomeIcon icon={faStar} className="text-white" size="xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="quantity-selection mb-4">
                <label className="form-label fw-bold">Quantity</label>
                <div className="quantity-controls d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="quantity-display mx-3 fw-bold">{quantity}</span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mb-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <button
                      className="btn btn-primary btn-lg w-100"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || !product.inStock}
                    >
                      {isAddingToCart ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn btn-dark btn-lg w-100"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="stock-status mb-4">
                {product.inStock ? (
                  <span className="text-success">
                    <i className="fas fa-check-circle me-2"></i>
                    In Stock - Ready to Ship
                  </span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </div>

              {/* Features */}
              <div className="product-features mb-4">
                <div className="row">
                  <div className="col-md-4 text-center mb-3">
                    <FontAwesomeIcon icon={faTruck} className="text-primary mb-2" />
                    <div className="small">Free Shipping</div>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <FontAwesomeIcon icon={faUndo} className="text-primary mb-2" />
                    <div className="small">30-Day Returns</div>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-primary mb-2" />
                    <div className="small">2-Year Warranty</div>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions d-flex gap-3">
                <button className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={faHeart} className="me-2" />
                  Wishlist
                </button>
                <button className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={faShare} className="me-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="product-tabs">
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button" role="tab">
                    Features
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                    Reviews ({product.reviews})
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="shipping-tab" data-bs-toggle="tab" data-bs-target="#shipping" type="button" role="tab">
                    Shipping & Returns
                  </button>
                </li>
              </ul>
              <div className="tab-content p-4 border border-top-0 rounded-bottom">
                <div className="tab-pane fade show active" id="description" role="tabpanel">
                  <p>{product.longDescription}</p>
                </div>
                <div className="tab-pane fade" id="features" role="tabpanel">
                  <ul className="list-unstyled">
                    {product.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <FontAwesomeIcon icon={faStar} className="text-primary me-2" size="xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <p>Customer reviews will be displayed here.</p>
                </div>
                <div className="tab-pane fade" id="shipping" role="tabpanel">
                  <p>Free standard shipping on all orders. 30-day return policy. International shipping available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">You May Also Like</h3>
            <div className="row">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="col-md-4 mb-4">
                  <div className="card product-card h-100">
                    <img src={relatedProduct.image} className="card-img-top" alt={relatedProduct.name} />
                    <div className="card-body">
                      <h5 className="card-title">{relatedProduct.name}</h5>
                      <p className="card-text text-primary fw-bold">${relatedProduct.price}</p>
                      <Link to={`/product/${relatedProduct.id}`} className="btn btn-outline-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footercomponent/>
    </div>
  );
};

export default ProductDetail;