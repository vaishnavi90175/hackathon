// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    // Mock data - In real app, fetch from API
    const users = JSON.parse(localStorage.getItem('handloom_users') || '[]');
    const products = JSON.parse(localStorage.getItem('handloom_products') || '[]');
    
    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: 45, // Mock data
      pendingApprovals: 3 // Mock data
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link 
            to="/admin" 
            className={location.pathname === '/admin' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/users" 
            className={location.pathname === '/admin/users' ? 'active' : ''}
          >
            User Management
          </Link>
          <Link 
            to="/admin/products" 
            className={location.pathname === '/admin/products' ? 'active' : ''}
          >
            Product Management
          </Link>
          <Link 
            to="/admin/orders" 
            className={location.pathname === '/admin/orders' ? 'active' : ''}
          >
            Order Management
          </Link>
        </nav>
      </div>
      
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<AdminHome stats={stats} />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminHome = ({ stats }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-number">{stats.pendingApprovals}</p>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('handloom_users') || '[]');
    setUsers(savedUsers);
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
                <td>
                  <button className="btn btn-edit">Edit</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductManagement = () => {
  return <div>Product Management Component</div>;
};

const OrderManagement = () => {
  return <div>Order Management Component</div>;
};

export default AdminDashboard;