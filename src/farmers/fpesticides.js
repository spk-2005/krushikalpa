import React, { useState, useEffect } from 'react';
import './fpesticides.css';
import { useNavigate } from 'react-router-dom';

export default function Pesticides() {
  const [pesticides, setPesticides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const response = await fetch('http://localhost:5000/pesticides');
        if (!response.ok) {
          throw new Error('Error fetching pesticides');
        }
        const data = await response.json();
        setPesticides(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPesticides();
  }, []);

  // Filter pesticides based on search term
  const filteredPesticides = pesticides.filter((pesticide) =>
    pesticide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate=useNavigate();
  const handleAddToCart = (pesticide) => {
    navigate('/buypesticides', { state: { pesticide } });
  };

  return (
    <div id="pesticides-section">
      <h1>Pesticides List</h1>

      {/* Search Bar */}
      <div id="search-container">
        <input
          type="text"
          placeholder="Search for pesticides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading & Error Handling */}
      {loading ? (
        <p>Loading pesticides...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : filteredPesticides.length === 0 ? (
        <p>No pesticides found.</p>
      ) : (
        <ul>
          {filteredPesticides.map((pesticide) => (
            <li key={pesticide._id} className="pesticide-item">
              <h3>{pesticide.name}</h3>
              <p>{pesticide.description}</p>
              <p>{pesticide.organic ? 'Organic' : 'Non-Organic'}</p>
              {pesticide.image && (
                <img
                  src={`data:image/jpeg;base64,${pesticide.image}`}
                  alt={pesticide.name}
                  className="pesticide-image"
                />
              )}
              <p><strong>Price:</strong> $ {pesticide.price || 'N/A'}/{pesticide.per}</p>
              <button onClick={() => handleAddToCart(pesticide)}>Add to Cart</button>
          
            </li>
          ))}
        </ul>
      )}  
    </div>
  );
}
