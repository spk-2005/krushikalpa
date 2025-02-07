import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sellproducts() {
    const location = useLocation();
    const { product } = location.state || {};  

    const [kgAvailable, setKgAvailable] = useState('');
    const [receipt, setReceipt] = useState(null);
    
    console.log('Product from state:', product);

    if (!product) {
        return <p>No product data available</p>;
    }
    const handlesell = () => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const dateTime = new Date().toLocaleString();
    
        const saleData = {
            name, 
            email,
            productName: product.name,
            category: product.category,
            price: product.price,
            dateTime,
            kgAvailable,
            receipt,
        };
    
        fetch('http://localhost:5000/selledproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sale data saved:', data);
            alert('Product successfully sold!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save sale data');
        });
    };
    
    return (
        <div>
            <section>
                <div>
                    <span>Category: {product.category}</span>
                    <h2>{product.name}</h2>
                    <img 
                        src={`data:image/jpeg;base64,${product.image}`} 
                        alt={product.name} 
                        style={{ width: '300px', height: 'auto' }}
                    />
                    <p>Price: {product.price}₹/Kg</p>
                </div>
            </section>
            
            <section>
                <div>
                    <input 
                        type='file' 
                        onChange={(e) => setReceipt(e.target.files[0])} // Save the file as receipt
                    />
                    <input 
                        type='text' 
                        placeholder='Enter Number Of Kgs Available'
                        value={kgAvailable}
                        onChange={(e) => setKgAvailable(e.target.value)}
                    />
                    <button onClick={handlesell}>Sell Now</button>
                </div>
            </section>
        </div>
    );
}
