import React from "react";
import { BsEye, BsPencil, BsTrash, BsStar, BsStarFill } from "react-icons/bs";

const ProductCard = ({ product, onDelete, onToggleStatus }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className={`product-status ${product.status}`}>
          {product.status === 'active' && 'Active'}
          {product.status === 'inactive' && 'Inactive'}
          {product.status === 'out-of-stock' && 'Out of Stock'}
          {product.status === 'low-stock' && 'Low Stock'}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(product.rating) ? 
              <BsStarFill key={i} className="star filled" /> : 
              <BsStar key={i} className="star" />
          ))}
          <span>({product.rating})</span>
        </div>
        
        <div className="product-details">
          <div className="product-price">${product.price}</div>
          <div className="product-stock">
            Stock: <span className={product.stock === 0 ? 'out-of-stock' : product.stock < 10 ? 'low-stock' : 'in-stock'}>
              {product.stock}
            </span>
          </div>
        </div>
        
        <div className="product-sales">Sales: {product.sales}</div>
      </div>
      
      <div className="product-actions">
        <button className="btn-action view" title="View">
          <BsEye />
        </button>
        <button className="btn-action edit" title="Edit">
          <BsPencil />
        </button>
        <button 
          className={`btn-action ${product.status === 'active' ? 'deactivate' : 'activate'}`}
          onClick={() => onToggleStatus(product.id)}
          title={product.status === 'active' ? 'Deactivate' : 'Activate'}
        >
          {product.status === 'active' ? '×' : '✓'}
        </button>
        <button 
          className="btn-action delete" 
          onClick={() => onDelete(product.id)}
          title="Delete"
        >
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;