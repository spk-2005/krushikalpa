import React, { useState, useEffect } from "react";
import './trackorder.css';

export default function TrackOrder({ user }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get email from localStorage
        const email = localStorage.getItem('email');
        if (!email) {
          setError('Please log in to view your orders');
          setIsLoading(false);
          return;
        }

        // Determine the correct endpoint based on user type
        if (!user?.usertype) {
          setError('User type not found');
          setIsLoading(false);
          return;
        }

        const endpoint = user.usertype === "consumer" ? "buyedproducts" : "soldpesticides";
        
        // Make the API call with proper error handling
        const response = await fetch(`http://localhost:5000/${endpoint}/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any auth headers if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch orders (${response.status}: ${response.statusText})`
          );
        }

        const data = await response.json();
        
        // Validate the data structure
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.usertype) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <section id="track-order" className="p-4">
      <h1 className="text-2xl font-bold mb-6">Track Your Orders</h1>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading orders...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No orders found. When you make a purchase, it will appear here.</p>
        </div>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.usertype === "consumer" ? "Product Name" : "Pesticide Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.usertype === "consumer" ? "Category" : "Per Unit"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user?.usertype === "consumer" ? order.productName : order.name}
                  </td>
                  <td className="px-6 py-4">
                    {order.description || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user?.usertype === "consumer" ? order.category : order.per}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.quantity || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(user?.usertype === "consumer" ? order.sellingPrice : order.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(order.dateTime || order.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}