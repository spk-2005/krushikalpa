import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './cproducts.css';

export default function CProducts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/fproducts");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                alert('Failed to fetch products: ' + error.message);
            }
        };

        fetchProducts();

        // Update current time every second
        const updateDateTime = () => {
            setCurrentDateTime(new Date().toLocaleString());
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // Filter products based on search input
    const filterProducts = useCallback(() => {
        return posts.filter(post => post.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, posts]);

    useEffect(() => {
        setFilteredPosts(filterProducts());
    }, [searchTerm, filterProducts]);

    // Group products by category
    const groupedPosts = filteredPosts.reduce((acc, post) => {
        if (!acc[post.category]) acc[post.category] = [];
        acc[post.category].push(post);
        return acc;
    }, {});

    const handleProductClick = (product) => {
        console.log('Selected product:', product);
        const productId = product._id;
        if (productId) {
            navigate(`/buyproducts`, { state: { product } });
        } else {
            console.error('Product ID is missing');
        }
    };

    return (
        <section id="fproducts-section">
            <div className="products-container">
                <h1>Get Organic Prodcuts Only!</h1>
                <div id='prod-head'>
                <p>Why You Need To Take Only <a href='/organic'>Organic</a></p>
                <p>See Prices <a href='/cprices'>Now</a></p>
                </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {Object.keys(groupedPosts).length > 0 ? (
                    Object.keys(groupedPosts).map((category, index) => (
                        <div key={index} className="category-section">
                            <h2 className="category-title">{category}</h2>
                            <div className="product-cards">
                                {groupedPosts[category].map((post, index) => (
                                    <div key={index} className="product-card" onClick={() => handleProductClick(post)}>
                                        {post.image ? (
                                            <img 
                                                src={`data:image/jpeg;base64,${post.image}`} 
                                                alt={post.name} 
                                                className="product-image"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                        <div className="product-info">
                                            <h3 className="product-name">{post.name}</h3>
                                            <span className="product-price">
                                            {post.sellingPrice}/<span id='per'>{post.per}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found...</p>
                )}
            </div>
        </section>
    );
}
