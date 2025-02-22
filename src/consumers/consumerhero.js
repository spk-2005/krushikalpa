import React from 'react';
import { useNavigate } from 'react-router-dom';
import './consumerhero.css';
import Fslideshow from './cslideshow';

export default function Consumerhero() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/cproducts`);
    };

    return (
        <>
        <section className='farmhero-section'>
            <blockquote>
                <h1>Fresh from Farm to Your Home!</h1>
                <p>Buy safe, healthy organic products while supporting hardworking farmers!</p>
                <span onClick={handleClick} className="clickable">Click Me</span>
              
            </blockquote>
        </section> 
        </>);
}
