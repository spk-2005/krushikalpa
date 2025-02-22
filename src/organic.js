import React from 'react';
import './organic.css';
export default function Organic() {
  return (
    <div className="organic-section">
      <div className="organic-header">
        <h1>Why Choose Organic?</h1>
        <p className="organic-intro">
          Discover why organic farming practices and food choices are crucial for your health, 
          the environment, and future generations. Our commitment to organic principles ensures 
          you get the best nature has to offer.
        </p>
      </div>

      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon">🌿</div>
          <h3>No Harmful Chemicals</h3>
          <p>Organic farming eliminates toxic pesticides and synthetic fertilizers, 
            protecting your health and the environment. Natural pest control methods 
            ensure food safety without compromising quality.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🍎</div>
          <h3>Higher Nutritional Value</h3>
          <p>Organic foods often contain higher levels of antioxidants, vitamins, 
            and minerals. Studies show that organic produce can have up to 69% more 
            key antioxidants than conventional alternatives.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🌍</div>
          <h3>Environmental Sustainability</h3>
          <p>Organic farming practices promote soil health, biodiversity, and water 
            conservation. This sustainable approach helps combat climate change and 
            preserves ecosystems for future generations.</p>
        </div>
      </div>

      <div className="comparison-section">
        <h2>Organic vs. Conventional Farming</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Organic Farming</th>
              <th>Conventional Farming</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pesticides</td>
              <td>Natural pest control methods</td>
              <td>Synthetic chemical pesticides</td>
            </tr>
            <tr>
              <td>Fertilizers</td>
              <td>Compost and natural minerals</td>
              <td>Synthetic fertilizers</td>
            </tr>
            <tr>
              <td>Soil Health</td>
              <td>Promotes soil biodiversity</td>
              <td>Can deplete soil quality</td>
            </tr>
            <tr>
              <td>Environmental Impact</td>
              <td>Environmentally sustainable</td>
              <td>Higher environmental impact</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon">👨‍👩‍👧‍👦</div>
          <h3>Better for Families</h3>
          <p>Choosing organic means protecting your family from harmful pesticide 
            residues and supporting their long-term health through nutrient-rich foods.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🌱</div>
          <h3>Natural Growth</h3>
          <p>Organic crops grow naturally without genetic modification or growth 
            hormones, ensuring you get pure, unaltered nutrition as nature intended.</p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">🦋</div>
          <h3>Biodiversity</h3>
          <p>Organic farming practices support local wildlife, beneficial insects, 
            and maintain the delicate balance of our ecosystems.</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Make the Switch to Organic Today</h2>
        <p>Join us in building a healthier future through organic farming practices.</p>
        <a href="#" className="cta-button">Learn More About Our Organic Products</a>
      </div>
    </div>
  );
}