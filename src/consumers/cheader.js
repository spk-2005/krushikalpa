import React, { useState, useEffect } from "react";
import "./cheader.css";
import logo from "./Krushikalpa-removebg-preview.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Cheader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  
    
      useEffect(() => {
        // Function to initialize Google Translate
        const initializeTranslate = () => {
          if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,te,hi',
                layout: window.google.translate.TranslateElement.InlineLayout.DROPDOWN,
                multilanguagePage: true,
                gaTrack: true
              },
              'google_translate_element'
            );
          } else {
            // If Google Translate hasn't loaded yet, try again in a moment
            setTimeout(initializeTranslate, 100);
          }
        };
    
        // Only add the script if it doesn't exist
        if (!document.querySelector('script[src*="translate.google.com"]')) {
          window.googleTranslateElementInit = initializeTranslate;
    
          const script = document.createElement('script');
          script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          document.body.appendChild(script);
        } else {
          // If script exists but translation hasn't initialized
          initializeTranslate();
        }
    
        return () => {
          // Cleanup
          const script = document.querySelector('script[src*="translate.google.com"]');
          if (script) {
            script.remove();
          }
          if (window.googleTranslateElementInit) {
            window.googleTranslateElementInit = undefined;
          }
        };
      }, []);
    
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/", { replace: true });
    window.history.replaceState(null, null, "/");
  };

  function CustomLink({ href, children }) {
    const path = window.location.pathname;
    return (
      <li className={path === href ? "active" : ""}>
        <a href={href}>{children}</a>
      </li>
    );
  }

  return (
    <header className="fheader1">
      <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <ion-icon name={menuOpen ? "close-outline" : "menu-outline"}></ion-icon>
      </button>

      <a href="/"><img src={logo} alt="Logo" id="logo" /></a>

      {/* Custom Ionicon for Language Selection */}
      <div className="translator-container">
      
        <div id="google_translate_element"></div>
      </div>

      <nav className={`nav-menu ${menuOpen ? "open" : "closed"}`}>
        <ol>
          <CustomLink href="/consumerdashboard">Dashboard</CustomLink>
          <CustomLink href="/cproducts">Products</CustomLink>
          <CustomLink href="/wastage">Recycling Wastage</CustomLink>
          <CustomLink href="/cprices">Prices</CustomLink>
          <CustomLink href="articles">Articles & Blogs</CustomLink>
          <div id="prof-icon">
            <li>
              <ion-icon name="person-circle-outline"></ion-icon>
              <ul>
                <CustomLink href="/farmerprofile">Profile</CustomLink>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </li>
          </div>
        </ol>
      </nav>
    </header>
  );
}
