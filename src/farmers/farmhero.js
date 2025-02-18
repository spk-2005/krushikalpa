import React from 'react';
import { useNavigate } from 'react-router-dom';
import './farmhero.css';
import Fslideshow from './fslideshow';

export default function Farmhero() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/fpesticides`);
    };

    return (
        <>
        <section className='farmhero-section'>
            <blockquote>
                <h1>Healthy Agriculture Matters</h1>
                <p>Nurture the land, and it will nurture you. Get organic pesticides now!</p>
                <span onClick={handleClick} className="clickable">Click Me</span>
              
            </blockquote>
        </section> 
        </>);
}
