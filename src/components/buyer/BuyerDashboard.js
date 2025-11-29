// src/components/buyer/BuyerDashboard.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('handloom_cart') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('handloom_orders') || '[]');
    setCart(savedCart);
    setOrders(savedOrders);
  }, []);

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-sidebar">
        <h2>Buyer Panel</h2>
        <nav>
          <Link to="/buyer" className={location.pathname === '/buyer' ? 'active' : ''}>
            My Profile
          </Link>
          <Link to="/buyer/orders" className={location.pathname === '/buyer/orders' ? 'active' : ''}>
            My Orders
          </Link>
          <Link to="/buyer/wishlist" className={location.pathname === '/buyer/wishlist' ? 'active' : ''}>
            Wishlist
          </Link>
        </nav>
      </div>
      
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<BuyerHome cart={cart} orders={orders} />} />
          <Route path="/orders" element={<BuyerOrders orders={orders} />} />
          <Route path="/wishlist" element={<BuyerWishlist />} />
        </Routes>
      </div>
    </div>
  );
};

const BuyerHome = ({ cart, orders }) => {
  const user = JSON.parse(localStorage.getItem('handloom_user') || '{}');

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div className="buyer-stats">
        <div className="stat-card">
          <h3>Cart Items</h3>
          <p className="stat-number">{cart.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-number">
            {orders.filter(order => order.status === 'pending').length}
          </p>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/cart" className="btn btn-secondary">View Cart</Link>
          <Link to="/buyer/orders" className="btn btn-secondary">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

const BuyerOrders = ({ orders }) => {
  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet. <Link to="/products">Start shopping!</Link></p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Items:</strong> {order.items.length}</p>
              </div>
              <div className="order-actions">
                <button className="btn btn-view">View Details</button>
                <button className="btn btn-track">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BuyerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('handloom_wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('handloom_wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/products">Explore products!</Link></p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <p className="artisan">By {item.artisan}</p>
              </div>
              <div className="item-actions">
                <button className="btn btn-primary">Add to Cart</button>
                <button 
                  className="btn btn-delete"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;