import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './buyproducts.css';

export default function Buyproducts() {
    const location = useLocation();
    const { product } = location.state || {};  

    const [quantity, setQuantity] = useState('');

    console.log('Product from state:', product);

    if (!product) {
        return <p>No product data available</p>;
    }
    
    const handleBuy = () => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        
        // Format date to match MongoDB format
        const now = new Date();
        const dateTime = now.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', ', ');
    
        const buyData = {
            name,
            email,
            productName: product.name,
            category: product.category,
            sellingPrice: product.sellingPrice,
            quantity: Number(quantity),
            dateTime
        };
    
        fetch('http://localhost:5000/buyedproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(buyData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Purchase data saved:', data);
            alert('Product successfully purchased!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save purchase data');
        });
    };
    return (
        <>
            <h1 id='buhead'>Buy Your Product</h1>
            <div id='buyprod-section'>
                <section className='buy-container'>
                    <div className='buy-product-info'>
                        <span>Category: {product.category}</span>
                        <h2>{product.name}</h2>
                        <img 
                            src={`data:image/jpeg;base64,${product.image}`} 
                            alt={product.name} 
                            style={{ width: '300px', height: 'auto' }}
                        />
                        <p>Price: {product.sellingPrice}₹/{product.per}</p>
                    </div>
                </section>
                
                <section>
                    <div className='buy-input-section'>
                        <input 
                            type='text' 
                            placeholder='Enter Quantity (kg/dozen/liter)'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button onClick={handleBuy}>Buy Now</button>
                    </div>
                </section>
            </div>
        </>
    );
}
