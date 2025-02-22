import React from 'react';
import image1 from './farmer-woes.jpg';
import './farmermiddle.css';  

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  useNavigate } from 'react-router-dom';
export default function Farmermiddle() {
    const { ref: farmerMiddleRef, inView: farmerMiddleInView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
const navigate=useNavigate();
    const handlepri = ()=>{
      navigate(`/fprices`);
    }
  return (
    <>
      <section id="farmermiddle-section">
        <motion.div 
          ref={farmerMiddleRef}
          className="farmhero-wrapper"
          initial={{ opacity: 0, x: '-50%'}}
          animate={farmerMiddleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="content">
            <h2>We Offer Better Prices for Your Products</h2>
            <p>We are committed to helping farmers get the best prices for their products. Contact us today to learn more about how we can help you maximize your profits through better pricing and sustainable business practices.</p>
            <button onClick={handlepri}>Check Prices Now</button>
            </div>
            </motion.div>
      </section>
    </>
  );
}
