import React from 'react'
import './header1.css';
export default function Header1() {
  function CustomLink({ href, children, onClick }) {
    const path = window.location.pathname;
    return (
        <li className={path === href ? "active" : ""} onClick={onClick}>
            <a href={href}>{children}</a>
        </li>
    );
}
  return (
    
    <>
    <section className='header1-section'>
        <div id='header1-cont'>
          <ol>
            <CustomLink>Products</CustomLink>
            <CustomLink>Recycling Wastage</CustomLink>
            <CustomLink>Provided Pesticides</CustomLink>
            <CustomLink>Organic Products</CustomLink>
            <CustomLink>Sign in</CustomLink>
            </ol></div>
        
    </section> 
    </>
  )
}
