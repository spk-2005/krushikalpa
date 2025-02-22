import React from 'react';
import './contact.css';

export default function Contact() {
  return (
    <section id="contact-section">
      {/* Background Wave */}
      <div className="wave-background">
        {/* Insert the SVG content here */}
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-address">
          <h3>Address:</h3>
          <ol>
            <li>Guntur, Chowdawaram, 522019</li>
            <li>Andhra Pradesh</li>
            <li>India</li>
          </ol>
        </div>

        <div className="contact-social">
          <h3>Our Social</h3>
          <ol>
            <li><a href="#"><ion-icon name="logo-whatsapp"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
          </ol>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile Apps</a></li>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">Consulting</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}