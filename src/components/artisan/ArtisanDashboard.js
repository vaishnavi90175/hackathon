// src/components/artisan/ArtisanDashboard.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './ArtisanDashboard.css';

const ArtisanDashboard = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('handloom_products') || '[]');
    setProducts(savedProducts);
  }, []);

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('handloom_products', JSON.stringify(newProducts));
  };

  return (
    <div className="artisan-dashboard">
      <div className="dashboard-sidebar">
        <h2>Artisan Panel</h2>
        <nav>
          <Link to="/artisan" className={location.pathname === '/artisan' ? 'active' : ''}>
            My Products
          </Link>
          <Link to="/artisan/add" className={location.pathname === '/artisan/add' ? 'active' : ''}>
            Add Product
          </Link>
          <Link to="/artisan/orders" className={location.pathname === '/artisan/orders' ? 'active' : ''}>
            Orders
          </Link>
        </nav>
      </div>
      
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<ArtisanHome products={products} />} />
          <Route path="/add" element={<AddProduct onAddProduct={addProduct} />} />
          <Route path="/orders" element={<ArtisanOrders />} />
        </Routes>
      </div>
    </div>
  );
};

const ArtisanHome = ({ products }) => {
  return (
    <div>
      <h1>My Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <div className="product-actions">
              <button className="btn btn-edit">Edit</button>
              <button className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    materials: '',
    dimensions: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      artisan: JSON.parse(localStorage.getItem('handloom_user')).name
    };
    onAddProduct(newProduct);
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
      materials: '',
      dimensions: ''
    });
    alert('Product added successfully!');
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="home-decor">Home Decor</option>
            <option value="textiles">Textiles</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Materials Used:</label>
          <input
            type="text"
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Dimensions:</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="e.g., 10x10 inches"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

const ArtisanOrders = () => {
  return <div>Orders Management Component</div>;
};

export default ArtisanDashboard;