import React from 'react';
import image1 from './farmer-woes.jpg';
import './farmermiddle.css';

export default function Farmermiddle() {
  return (
    <>
      <section>
        <div id="farmermiddle-section">
          <img src={image1} alt="err" />
          <div className="content">
            <h2>We Offer Better Prices for Your Products</h2>
            <p>We are committed to helping farmers get the best prices for their products. Contact us today to learn more about how we can help you maximize your profits through better pricing and sustainable business practices.</p>
            </div>
        </div>
      </section>
    </>
  );
}
