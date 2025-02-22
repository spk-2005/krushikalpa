import React, { useEffect, useState } from 'react';
import './farmerdashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Farmerdashboard() {
  const [farmerData, setFarmerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Move useNavigate to the top
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/farmer-dashboard/${email}`);
        const data = await response.json();
        if (response.ok) {
          setFarmerData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerData();
  }, [email]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  const handleTrack = () => {
    navigate(`/trackorder`);
  };

  return (
    <section id="consumer-dashboard-section">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>My Consumer Dashboard</h1>
        </header>

        <div className="personal-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{farmerData.user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{farmerData.user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type:</span>
              <span className="info-value">{farmerData.user.userType}</span>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h2>Purchase History</h2>
          {farmerData.productsSold.length > 0 ? (
            <ul className="products-grid">
              {farmerData.productsSold.map((product, index) => (
                <li key={index} className="product-card">
                  <div className="product-header">
                    <h3 className="product-name">{product.productName}</h3>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-details">
                    <div className="detail-item">
                      <span className="detail-label">Price:</span>
                      <span className="price-tag">₹{product.buyingPrice}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Quantity:</span>
                      <span>{product.quantity || 0} units</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Amount:</span>
                      <span className="price-tag">₹{product.buyingPrice * (product.quantity)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Purchase Date:</span>
                      <span>{product.dateTime}</span>
                    </div>
                    {product.receipt && (
                      <div className="receipt-link">
                        <a href={product.receipt} target="_blank" rel="noopener noreferrer">
                          View Receipt
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>You haven't made any purchases yet.</p>
              <p>Start shopping to see your purchase history here!</p>
            </div>
          )}
          <p onClick={handleTrack}>Track Now</p>
        </div>
      </div>
    </section>
  );
}
