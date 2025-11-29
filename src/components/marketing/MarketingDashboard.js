// src/components/marketing/MarketingDashboard.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './MarketingDashboard.css';

const MarketingDashboard = () => {
  const location = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    conversions: 0,
    engagement: 0
  });

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('handloom_campaigns') || '[]');
    setCampaigns(savedCampaigns);
    
    // Mock analytics data
    setAnalytics({
      totalViews: 12450,
      conversions: 345,
      engagement: 12.5
    });
  }, []);

  const addCampaign = (campaign) => {
    const newCampaigns = [...campaigns, campaign];
    setCampaigns(newCampaigns);
    localStorage.setItem('handloom_campaigns', JSON.stringify(newCampaigns));
  };

  return (
    <div className="marketing-dashboard">
      <div className="dashboard-sidebar">
        <h2>Marketing Panel</h2>
        <nav>
          <Link to="/marketing" className={location.pathname === '/marketing' ? 'active' : ''}>
            Analytics
          </Link>
          <Link to="/marketing/campaigns" className={location.pathname === '/marketing/campaigns' ? 'active' : ''}>
            Campaigns
          </Link>
          <Link to="/marketing/create" className={location.pathname === '/marketing/create' ? 'active' : ''}>
            Create Campaign
          </Link>
        </nav>
      </div>
      
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<MarketingHome analytics={analytics} />} />
          <Route path="/campaigns" element={<CampaignList campaigns={campaigns} />} />
          <Route path="/create" element={<CreateCampaign onAddCampaign={addCampaign} />} />
        </Routes>
      </div>
    </div>
  );
};

const MarketingHome = ({ analytics }) => {
  return (
    <div>
      <h1>Marketing Analytics</h1>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Views</h3>
          <p className="analytics-number">{analytics.totalViews.toLocaleString()}</p>
          <span className="analytics-trend">↑ 12%</span>
        </div>
        <div className="analytics-card">
          <h3>Conversions</h3>
          <p className="analytics-number">{analytics.conversions}</p>
          <span className="analytics-trend">↑ 8%</span>
        </div>
        <div className="analytics-card">
          <h3>Engagement Rate</h3>
          <p className="analytics-number">{analytics.engagement}%</p>
          <span className="analytics-trend">↑ 5%</span>
        </div>
      </div>
      
      <div className="quick-stats">
        <h2>Platform Performance</h2>
        <div className="platform-stats">
          <div className="platform-stat">
            <h4>Social Media</h4>
            <p>Engagement: 15.2%</p>
            <p>Reach: 45,678</p>
          </div>
          <div className="platform-stat">
            <h4>Email Marketing</h4>
            <p>Open Rate: 28.5%</p>
            <p>CTR: 4.2%</p>
          </div>
          <div className="platform-stat">
            <h4>Website</h4>
            <p>Bounce Rate: 42.1%</p>
            <p>Avg. Session: 3:45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CampaignList = ({ campaigns }) => {
  return (
    <div>
      <h1>Marketing Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns created yet. <Link to="/marketing/create">Create your first campaign!</Link></p>
      ) : (
        <div className="campaigns-list">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="campaign-card">
              <div className="campaign-header">
                <h3>{campaign.name}</h3>
                <span className={`campaign-status ${campaign.status}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="campaign-details">
                <p><strong>Platform:</strong> {campaign.platform}</p>
                <p><strong>Budget:</strong> ${campaign.budget}</p>
                <p><strong>Duration:</strong> {campaign.startDate} to {campaign.endDate}</p>
                <p><strong>Target Audience:</strong> {campaign.audience}</p>
              </div>
              <div className="campaign-metrics">
                <div className="metric">
                  <span className="metric-value">{campaign.reach}</span>
                  <span className="metric-label">Reach</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{campaign.engagement}%</span>
                  <span className="metric-label">Engagement</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{campaign.conversions}</span>
                  <span className="metric-label">Conversions</span>
                </div>
              </div>
              <div className="campaign-actions">
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-analyze">Analyze</button>
                <button className="btn btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateCampaign = ({ onAddCampaign }) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: 'social-media',
    budget: '',
    startDate: '',
    endDate: '',
    audience: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      id: Date.now(),
      ...formData,
      budget: parseFloat(formData.budget),
      status: 'active',
      reach: Math.floor(Math.random() * 10000),
      engagement: (Math.random() * 20 + 5).toFixed(1),
      conversions: Math.floor(Math.random() * 100)
    };
    onAddCampaign(newCampaign);
    
    // Reset form
    setFormData({
      name: '',
      platform: 'social-media',
      budget: '',
      startDate: '',
      endDate: '',
      audience: '',
      description: ''
    });
    
    alert('Campaign created successfully!');
  };

  return (
    <div>
      <h1>Create Marketing Campaign</h1>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label>Campaign Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Platform:</label>
          <select name="platform" value={formData.platform} onChange={handleChange} required>
            <option value="social-media">Social Media</option>
            <option value="email">Email Marketing</option>
            <option value="seo">SEO</option>
            <option value="ppc">PPC Advertising</option>
            <option value="influencer">Influencer Marketing</option>
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Budget ($):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Target Audience:</label>
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              placeholder="e.g., Global buyers, 25-40 age"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Campaign Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Create Campaign</button>
      </form>
    </div>
  );
};

export default MarketingDashboard;