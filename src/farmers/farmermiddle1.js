import React from 'react'
import was from './a-Sustainable-Way-to-Manage-Organic-Waste.jpg'
import { useNavigate } from 'react-router-dom'
import './farmermiddle1.css';
export default function Farmermiddle1() {
    const navigate=useNavigate();
   const  handlenow = ()=>{
        navigate(`/wastage`);
    }
  return (
    <>  
    <section className='farmermiddle1-section'>
        <div> 
            <div className='farmermiddle1-cont'>
                <p>Don't Waste Your Wastage</p>
        <span>Sell Your Waste <button onClick={handlenow}>Now</button></span>
        </div>
        <img src={was} alt='err'/>
         </div>    

    </section> 
    </>
  )
}
