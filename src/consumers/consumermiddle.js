import React from 'react';
import image1 from './farmer-woes.jpg';
import './consumermiddle.css';  
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export default function Consumermiddle() {
    const { ref: farmerMiddleRef, inView: farmerMiddleInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/cprices`);
    };

    return (
        <section id="farmermiddle-section">
            <motion.div 
                ref={farmerMiddleRef}
                className="farmhero-wrapper"
                initial={{ opacity: 0, x: '-50%' }}
                animate={farmerMiddleInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                <div className="content">
                    <h2>Get Fresh Vegetables Straight from Local Farmers</h2>
                    <p>Support farmers and enjoy farm-fresh veggies at the best prices. Say goodbye to middlemen and experience quality like never before.</p>
                    <button onClick={handleNavigate}>See Prices Now</button>
                </div>
            </motion.div>
        </section>
    );
}
