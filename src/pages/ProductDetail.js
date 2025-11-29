// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('handloom_products') || '[]');
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('handloom_cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
    
    localStorage.setItem('handloom_cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const addToWishlist = () => {
    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem('handloom_wishlist') || '[]');
    const existingItem = wishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
      wishlist.push(product);
      localStorage.setItem('handloom_wishlist', JSON.stringify(wishlist));
      alert('Product added to wishlist!');
    } else {
      alert('Product already in wishlist!');
    }
  };

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <p>Product not found.</p>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; 
          <Link to="/products">Products</Link> &gt; 
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-artisan">By {product.artisan}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            
            <div className="product-specs">
              <h3>Product Specifications</h3>
              <div className="specs-grid">
                <div className="spec">
                  <strong>Materials:</strong> {product.materials}
                </div>
                <div className="spec">
                  <strong>Dimensions:</strong> {product.dimensions}
                </div>
                <div className="spec">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="spec">
                  <strong>Stock:</strong> {product.stock} available
                </div>
              </div>
            </div>
            
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="action-buttons">
                <button 
                  onClick={addToCart}
                  className="btn btn-primary btn-large"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button 
                  onClick={addToWishlist}
                  className="btn btn-secondary"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;