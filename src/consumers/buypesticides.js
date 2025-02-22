import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './buypesticides.css';
export default function Buypesticides() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pesticide } = location.state || {};
  const [user, setUser] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
  });

  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!user.name || !user.email) {
      alert('Please provide your name and email.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/sellPesticide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pesticide,
          user,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Proceeding to checkout...');
        navigate('/fcheckout', { state: { pesticide, user } }); // Pass data to Checkout component
      } else {
        alert('Error selling pesticide: ' + data.message);
      }
    } catch (error) {
      alert('Error selling pesticide');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id='buyying-section'>
      <h1>Buy {pesticide.name}</h1>
      <div>
        <img
          src={`data:image/jpeg;base64,${pesticide.image}`}
          alt={pesticide.name}
          className="pesticide-image"
        />
        <p><strong>Description:</strong> {pesticide.description}</p>
        <p><strong>Price:</strong> $ {pesticide.price || 'N/A'}/{pesticide.per}</p>
        
        <button onClick={handleBuyNow} disabled={loading}>
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </section>
  );
}
