import React, { useEffect, useState } from 'react';
import './farmerdashboard.css';
export default function Farmerdashboard() {
  const [farmerData, setFarmerData] = useState(null);
  const email = localStorage.getItem('email'); // This should be dynamically set, for example from the logged-in user's email

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/farmer-dashboard/${email}`);
        const data = await response.json();
        if (response.ok) {
          setFarmerData(data);
        } else {
          console.error('Error fetching farmer data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFarmerData();
  }, [email]);

  if (!farmerData) {
    return <p>Loading farmer data...</p>;
  }

  return (
    <section id='farmer-dashboard-section'> 
      <div>
        <h1>Farmer Dashboard</h1>
        <h2>Personal Info</h2>
        <p>Name: {farmerData.user.name}</p>
        <p>Email: {farmerData.user.email}</p>
        <p>User Type: {farmerData.user.userType}</p>
        
        <h2>Products Sold</h2>
        {farmerData.productsSold.length > 0 ? (
          <ul>
            {farmerData.productsSold.map((product, index) => (
              <li key={index}>
                <p>Product Name: {product.productName}</p>
                <p>Category: {product.category}</p>
                <p>Price: {product.price}</p>
                <p>Quantity Available: {product.kgAvailable} kg</p>
                <p>Receipt: {product.receipt ? <a href={product.receipt} target="_blank" rel="noopener noreferrer">View Receipt</a> : 'No Receipt'}</p>
                <p>Sold Date:{product.dateTime}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products sold yet.</p>
        )}
      </div>
    </section>
  );
}
