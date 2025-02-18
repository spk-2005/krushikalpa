import React from 'react';
import './farmerwaste.css';
import { useNavigate } from 'react-router-dom';
export default function Farmerwaste() {
    const navigate=useNavigate();
    const handlewaste = ()=>{
        navigate(`/wastage`);
    }
  return (
    <>
      <section id='farmerwaste-section'>
        <div className="farmerwaste-container">
          <h2>Earn by Selling Your Waste!</h2>
          <p>
            As a farmer, you can now earn extra income by selling your agricultural waste to us. 
            We collect and process agricultural by-products, giving you a sustainable way to dispose of your waste and earn money.
          </p>
          <p>
            Join us in turning waste into valuable resources, helping the environment while boosting your income!
          </p>
          <button onClick={handlewaste}>Contact Us to Learn More</button>
        </div>
      </section>
    </>
  );
}
