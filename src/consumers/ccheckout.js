import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ccheckout.css';
export default function CCheckout() {
  const { pesticide, user } = useLocation().state || {}; // Get pesticide and user data passed from Buypesticides
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phone: '',
  });

  const price = pesticide.price || 0;
  const totalPrice = (quantity * price).toFixed(2);

  useEffect(() => {
    // Fetch user details from MongoDB
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getUserDetails/${user.email}`);
        const data = await response.json();
        if (data) {
          setUserDetails(prev => ({
            ...prev,
            address: data.address,
            phone: data.phone,
          }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [user.email]);

  const handleCheckout = async () => {
    setIsLoading(true);

    // Simulate API call to process the order
    setTimeout(async () => {
      setIsLoading(false);
      setOrderConfirmed(true);

      // Send order data to MongoDB
      try {
        const response = await fetch('http://localhost:5000/submitOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userDetails,
            pesticide,
            quantity,
            totalPrice,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Order placed successfully!');
        } else {
          alert('Error placing order: ' + data.message);
        }
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error submitting order.');
      }
    }, 2000);
  };

  return (
    <section id="checkout">
      <h1>Checkout</h1>
      
      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          <li><strong>Product Name:</strong> {pesticide.name}</li>
          <li><strong>Description:</strong> {pesticide.description}</li>
          <li><strong>Price:</strong> ${price}</li>
          <li><strong>Quantity:</strong>
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
            {quantity}
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </li>
          <li><strong>Total:</strong> ${totalPrice}</li>
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <input
          type="text"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={userDetails.address}
          onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
          placeholder="Address"
        />
        <input
          type="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          value={userDetails.phone}
          onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
          placeholder="Phone Number"
        />
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <h2>Payment Method</h2>
        <select>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
          <option value="cash-on-delivery">Cash On Delivery</option>
        </select>
      </div>

      {/* Checkout Button */}
      <div className="checkout-button">
        <button onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {/* Confirmation Message */}
      {orderConfirmed && !isLoading && (
        <div className="confirmation-message">
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order is being processed.</p>
        </div>
      )}
    </section>
  );
}
