import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './products.css';

export default function Products() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = "http://localhost:5000/fproducts";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch((err) => console.error('Error fetching:', err));

        const updateDateTime = () => {
            const date = new Date();
            const formattedDateTime = date.toLocaleString();
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post =>
            post.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    const groupedPosts = filteredPosts.reduce((acc, post) => {
        if (!acc[post.category]) {
            acc[post.category] = [];
        }
        acc[post.category].push(post);
        return acc;
    }, {});

    const handleProductClick = (product) => {
        console.log('Selected product:', product);
        const productId = product._id;
        if (productId) {
            navigate(`/sellproducts`, { state: { product } });
        } else {
            console.error('Product ID is missing');
        }
    };

    return (
        <section id="cproducts-section">
            <div className="products-container">
                <h1>Sell Your Products Now</h1>
                <div className="date-time">
                    <p>{currentDateTime}</p>
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
                                        <img 
                                            src={`data:image/jpeg;base64,${post.image}`} 
                                            alt={post.name} 
                                            className="product-image"
                                        />
                                        <div className="product-info">
                                            <h3 className="product-name">{post.name}</h3>
                                            <span className="product-price">{post.buyingPrice}/<span id='per'>{post.per}</span></span>
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
