  import React, { useState } from "react";
  import "./fheader.css";
  import logo from "./logo (2).png";
  import {signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
  export default function Fheader() {
    const [menuOpen, setMenuOpen] = useState(false);

    function CustomLink({ href, children }) {
      const path = window.location.pathname;
      return (
        <li className={path === href ? "active" : ""}>
          <a href={href}>{children}</a>
        </li>
      );
    }
const navigate=useNavigate();
const handleLogout = async () => {
  await signOut(auth);
  localStorage.clear();
  navigate("/", { replace: true });
  window.history.replaceState(null, null, "/");
};

  
    return (
      <header className="fheader1">
        <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <ion-icon name={menuOpen ? "close-outline" : "menu-outline"}></ion-icon>
        </button>

        <img src={logo} alt="Logo" id="logo" />
        <nav className={`nav-menu ${menuOpen ? "open" : "closed"}`}>
          <ol>
            <CustomLink href="#">Dashboard</CustomLink>
            <CustomLink href="/products">Products</CustomLink>
            <CustomLink href="/wastage">Recycling Wastage</CustomLink>
            <CustomLink href="#">Pesticides</CustomLink>
            <CustomLink href="#">Prices</CustomLink>
            <CustomLink href="#">Sell Now</CustomLink>
            <CustomLink href="#">Prices</CustomLink>
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
