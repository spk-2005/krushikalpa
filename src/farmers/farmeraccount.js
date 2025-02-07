import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Fheader from './fheader';
import './farmeraccount.css';
import Farmhero from './farmhero';
import Farmermiddle from './farmermiddle';

export default function Farmeraccount() {
  // Observe when Farmhero is in view
  const { ref: farmHeroRef, inView: farmHeroInView } = useInView({
    triggerOnce: true, // Animation runs only once when in view
    threshold: 0.2, // Starts animation when 20% of the component is visible
  });

  // Observe when Farmermiddle is in view
  const { ref: farmerMiddleRef, inView: farmerMiddleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
    <section id='far'>
      <div id="gh">
        <Fheader />

        <motion.div
          ref={farmHeroRef} // Attach ref to observe visibility
          className="farmhero-wrapper"
          initial={{ opacity: 0, x: '-50%', rotateY: '-100deg' }}
          animate={farmHeroInView ? { opacity: 1, x: 0, rotateY: '0deg' } : {}}
          transition={{ duration: 1.5 }}
        >
          <Farmhero />
        </motion.div>
      </div>

      <div id="middle-section">
        <motion.div
          ref={farmerMiddleRef}
          className="farmhero-wrapper"
          initial={{ opacity: 0, x: '-50%'}}
          animate={farmerMiddleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Farmermiddle />
        </motion.div>
      </div>
      </section>
    </>
  );
}
