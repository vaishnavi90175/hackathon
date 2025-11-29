// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Assuming you have a CSS file for product pages
import './ProductDetail.css'; 
// Assuming sampleData exports an array of products
import { products } from '../data/sampleData'; 
import { useAuth } from '../context/AuthContext';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Now correctly used
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Mock Data Fetching Logic
    const fetchedProduct = products.find(p => p.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Handle product not found
      navigate('/products', { replace: true });
    }
    setLoading(false);
  }, [id, navigate]); // Depend on id and navigate

  const handleGoBack = () => {
    navigate('/products');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
        alert('Please log in to add items to your cart.');
        navigate('/login');
        return;
    }
    // Implement actual cart logic here (e.g., dispatch context update)
    console.log(`Added ${quantity} of product ${product.name} to cart.`);
    alert(`Added ${quantity} x ${product.name} to your cart!`);
  };

  if (loading) {
    return <div className="loading-state">Loading Handloom Art...</div>;
  }
  
  if (!product) {
      // This case is typically handled by the navigate in useEffect, 
      // but serves as a quick fallback.
      return null;
  }

  return (
    <div className="product-detail-container">
      <button onClick={handleGoBack} className="btn-back">
        ⬅️ Back to Collection
      </button>

      <div className="product-detail-card">
        <div className="product-image-section">
          <img src={product.imageUrl || ''} alt={product.name} />
          {/* Mock secondary images could go here */}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <p className="product-artisan">
            Woven by: <strong>{product.artisan || 'Unknown Artisan'}</strong>
          </p>

          <p className="product-price">
            Price: ${product.price.toFixed(2)}
          </p>
          
          <div className="product-description">
            <h3>The Story of the Weave:</h3>
            <p>{product.description || 'A timeless piece handcrafted using traditional techniques, embodying the rich heritage of Indian textiles.'}</p>
          </div>

          <div className="product-attributes">
             <p><strong>Material:</strong> {product.material || 'Silk/Cotton Blend'}</p>
             <p><strong>Dimensions:</strong> {product.dimensions || '2m x 1m'}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                />
            </div>
            
            <button 
              onClick={handleAddToCart} 
              className="btn-add-to-cart btn-primary"
            >
              Add to Cart 🛒
            </button>
            <button className="btn-wishlist btn-secondary">
              Add to Wishlist ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;