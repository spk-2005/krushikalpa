import React, { useEffect, useState } from 'react';
import './fprices.css';

export default function Fprices() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());

    // Fetch products from the API
    useEffect(() => {
        fetch('http://localhost:5001/fproducts')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    // Update date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className='fprices-section'>
            <h2>Available Products</h2>
            
            {/* Date and Time Display */}
            <div className="date-time">
                <strong>Today Prices</strong> {dateTime.toLocaleDateString()} | 
                <strong> Time:</strong> {dateTime.toLocaleTimeString()}
            </div>

            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Per</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>₹{product.sellingPrice}</td>
                                <td>{product.per}</td>
                                <td>
                                    {product.image ? (
                                        <img
                                            src={`data:image/png;base64,${btoa(
                                                String.fromCharCode(...new Uint8Array(product.image.data))
                                            )}`}
                                            alt={product.name}
                                            width="50"
                                            height="50"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                No products available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
