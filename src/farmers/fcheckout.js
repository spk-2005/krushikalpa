import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './fcheckout.css';

export default function Checkout() {
  const { pesticide, user } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    phone: '',
  });

  const price = pesticide?.price || 0;
  const totalPrice = (quantity * price).toFixed(2);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getUserDetails/${user.email}`);
        if (!response.ok) throw new Error('Failed to fetch user details');

        const data = await response.json();
        if (data) {
          setUserDetails((prev) => ({
            ...prev,
            address: data.address || '',
            phone: data.phone || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (user?.email) fetchUserDetails();
  }, [user?.email]);



  const handleCheckout = async () => {
    if (!quantity || quantity < 1) {
      alert('Please select a valid quantity');
      return;
    }

    setIsLoading(true);

    // Create the order object with all required fields
    const orderData = {
      user: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
      },
      pesticide: {
        name: pesticide.name,
        description: pesticide.description,
        price: pesticide.price,
        image: pesticide.image,
        per: pesticide.per,
      },
      quantity: Number(quantity), // Ensure it's converted to a number
      totalPrice: Number(totalPrice), // Ensure it's converted to a number
    };

    try {
      console.log('Sending order data:', orderData); // Debug log to check quantity

      const response = await fetch('http://localhost:5000/buydpesticides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setOrderConfirmed(true);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`Order submission failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
};
  const navigate = useNavigate();
  const handletrack = () => {
    navigate(`/trackorder`);
  };

  // Validation before rendering
  if (!pesticide || !user) {
    return <Navigate to="/" />;
  }

  return (
    <section id="checkout">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          <li><strong>Product Name:</strong> {pesticide?.name}</li>
          <li><strong>Description:</strong> {pesticide?.description}</li>
          <li><strong>Price:</strong> ${price}</li>
          <li>
            <strong>Quantity:</strong>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                disabled={quantity <= 1}
                className="quantity-btn"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="quantity-input"
              />
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </li>
          <li><strong>Total:</strong> ${totalPrice}</li>
        </ul>
      </div>

      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <input
          type="text"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          value={userDetails.address}
          onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
          placeholder="Address"
          required
        />
        <input
          type="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={userDetails.phone}
          onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="payment-method">
        <h2>Payment Method</h2>
        <select>
          <option value="cash-on-delivery">Cash On Delivery</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="checkout-button">
        <button 
          onClick={handleCheckout} 
          disabled={isLoading || !userDetails.name || !userDetails.address || !userDetails.phone}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {orderConfirmed && !isLoading && (
        <div className="confirmation-message">
          <h2>Order Confirmed!</h2>
          <p>
            Thank you for your purchase. Your order is being processed.
            <span onClick={handletrack} className="track-link">Track Now</span>
          </p>
        </div>
      )}
    </section>
  );
}