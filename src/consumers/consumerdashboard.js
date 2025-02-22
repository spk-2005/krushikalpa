import React, { useEffect, useState } from 'react';
import './consumerdashboard.css';

export default function ConsumerDashboard() {
  const [farmerData, setFarmerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/consumer-dashboard/${email}`);
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
 
  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return 'Date not available';
    
    try {
      // Since your MongoDB has date in "DD/MM/YYYY, HH:mm:ss" format
      const [datePart, timePart] = dateTimeStr.split(', ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
  
      return `${day} ${getMonthName(Number(month))} ${year}, ${formatTime(hours, minutes)}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date not available';
    }
  };
  
  // Helper function to get month name
  const getMonthName = (monthNum) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1];
  };
  
  // Helper function to format time
  const formatTime = (hours, minutes) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };;
  const formatPrice = (price) => {
    if (!price && price !== 0) return '₹0.00';
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
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
                      <span className="price-tag">{formatPrice(product.sellingPrice)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Quantity:</span>
                      <span>{product.quantity || 0} units</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Amount:</span>
                      <span className="price-tag">{formatPrice(product.sellingPrice * (product.quantity || 0))}</span>
                    </div>
                    <div className="detail-item">
  <span className="detail-label">Purchase Date:</span>
  <span>{formatDate(product.dateTime)}</span>
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
        </div>
      </div>
    </section>
  );
}