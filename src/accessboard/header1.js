import React, { useState } from "react";
import "./header1.css"; 

export default function Header1() {
  const [menuOpen, setMenuOpen] = useState(false);

  function CustomLink({ href, children }) { 
    const path = window.location.pathname;
    return (
      <li className={path === href ? "active" : ""}>
        <a href={href}>{children}</a>
      </li>
    );
  }

  return (
    <header className="header1">
      <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
  <ion-icon name={menuOpen ? "close-outline" : "menu-outline"}></ion-icon>
</button>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
  
        <ol>
          <CustomLink href="#">Products</CustomLink>
          <CustomLink href="#">Recycling Wastage</CustomLink>
          <CustomLink href="#">Provided Pesticides</CustomLink>
          <CustomLink href="#">Organic Products</CustomLink>
          <CustomLink href="#">Sign in</CustomLink>
        </ol>
      </nav>
    </header>
  );
}