import React, { useState } from 'react';
import { Search, ChevronRight, Calendar, User, Clock } from 'lucide-react';
import './articles.css';
const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const articles = [
    {
      id: 1,
      title: "Transitioning to Organic Farming: A Practical Guide",
      excerpt: "Learn how farmers are breaking free from chemical dependencies while increasing profits through organic farming methods.",
      category: "organic",
      author: "Dr. Sarah Chen",
      readTime: "8 min",
      date: "Feb 20, 2025",
      image: "/api/placeholder/800/600"
    },
    {
      id: 2,
      title: "Direct-to-Consumer: Eliminating Intermediary Exploitation",
      excerpt: "Discover how farmers are using digital platforms to connect directly with consumers and secure better prices.",
      category: "market",
      author: "James Miller",
      readTime: "6 min",
      date: "Feb 18, 2025",
      image: "/api/placeholder/800/600"
    },
    {
      id: 3,
      title: "Natural Pest Control Methods That Actually Work",
      excerpt: "Effective alternatives to chemical pesticides that protect both crop yields and human health.",
      category: "sustainable",
      author: "Maria Garcia",
      readTime: "10 min",
      date: "Feb 15, 2025",
      image: "/api/placeholder/800/600"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'organic', name: 'Organic Farming' },
    { id: 'market', name: 'Market Access' },
    { id: 'sustainable', name: 'Sustainable Practices' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);
    return (
        <div className="blog-section">
          <div className="blog-cont">
            <h2>Sustainable Farming Insights</h2>
            <p>Latest articles on sustainable agriculture, organic farming, and fair market practices</p>
            
            <div className="search-container">
              <input type="text" placeholder="Search articles..." />
              <Search />
            </div>
          </div>
      
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
      
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-image"
                />
                <div className="article-content">
                  <div className="article-metadata">
                    <div className="metadata-item">
                      <User />
                      <span>{article.author}</span>
                    </div>
                    <div className="metadata-item">
                      <Calendar />
                      <span>{article.date}</span>
                    </div>
                    <div className="metadata-item">
                      <Clock />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  
                  <button className="read-more">
                    Read More
                    <ChevronRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    
    };

export default Articles;