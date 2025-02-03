import React from 'react'

import './signing.css';

export default function Signing() {
  const handlelogin =()=>{

  };
  
  return (
    <>
    <section className="signing-section">
      <div>
        <h1>For Farmers</h1>
        <p>We understand the struggles you face every day. This platform is dedicated to empowering farmers like you by providing better resources.</p>
        <button className="login-btn" onClick={handlelogin}> Login</button>
        <span>Don't have an account?</span>
        <button className="signup-btn">Sign Up Now</button>
      </div>

      <div>
        <h1>For Consumers</h1>
        <p>Know what you're consuming! Join us in our mission to promote healthy and sustainable food practices. By supporting local farmers.</p>
        <button className="login-btn" onClick={handlelogin}>Login</button>
        <span>Don't have an account?</span>
        <button className="signup-btn">Sign Up Now</button>
      </div>
    </section>
    </>
  )
}
