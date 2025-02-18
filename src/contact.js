import React from 'react';
import './contact.css';
export default function Contact() {
  return (
    <section id="contact-section">
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
    </section>
  );
}
