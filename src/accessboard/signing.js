import axios from "axios";
import { auth, provider } from "../firebase"; // Correct import path
import { signInWithPopup } from "firebase/auth";
import '../accessboard/signing.css';

export default function Signing() {
  const handleSignUpOrLoginWithGoogle = async (userType, actionType) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (actionType === "signup") {
        
        await axios.post("http://localhost:5000/signup", {
          email: user.email,
          name: user.displayName,
          userType: userType,
        });

        alert(`User signed up successfully as ${userType}`);
      } else if (actionType === "login") {
        // Check if the user exists in MongoDB
        const response = await axios.post("http://localhost:5000/login", {
          email: user.email,
        });

        if (response.data.message === "User found") {
          alert("Login successful!");
        } else {
          alert("User not found, please sign up first.");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <section className="signing-section">
      <div>
        <h1>For <span id="specf">Farmers</span></h1>
        <p>Empowering farmers with better resources.</p>
        <button className="login-btn" onClick={() => handleSignUpOrLoginWithGoogle("Farmer", "login")}>
          Login 
        </button> 
        <span id="dontacc">Don't Have an account</span>
        <span id="signup-btn">
        <button className='signup-btn'onClick={() => handleSignUpOrLoginWithGoogle("Farmer", "signup")}>
          Sign Up  
        </button>as Farmer 
        </span>
      </div>

      <div>
        <h1>For <span id="specc">Consumers</span></h1>
        <p>Support sustainable food practices.</p>
        <button className="login-btn"onClick={() => handleSignUpOrLoginWithGoogle("Consumer", "login")}>
          Login 
        </button>
        <span id="dontacc">Don't Have an account</span>
        <span id="signup-btn">
         <button className='signup-btn'onClick={() => handleSignUpOrLoginWithGoogle("Consumer", "signup")}>
          Sign Up
        </button>as Consumer </span>
       
      </div>
    </section>
  );
}
