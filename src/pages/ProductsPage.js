// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    search: ''
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('handloom_products') || '[]');
    setProducts(savedProducts);
    setFilteredProducts(savedProducts);
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }
    
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Handloom Products</h1>
        <p>Discover unique handcrafted items from skilled artisans</p>
      </div>

      <div className="products-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="home-decor">Home Decor</option>
              <option value="textiles">Textiles</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-">$200+</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-artisan">By {product.artisan}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description.substring(0, 100)}...</p>
                <div className="product-actions">
                  <Link to={`/product/${product.id}`} className="btn btn-view">
                    View Details
                  </Link>
                  <button className="btn btn-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;