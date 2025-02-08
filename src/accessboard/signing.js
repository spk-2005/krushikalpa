import axios from "axios";
import { auth, provider } from "../firebase"; 
import { signInWithPopup } from "firebase/auth";
import '../accessboard/signing.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Signing() {
  const navigate = useNavigate();

  useEffect(() => {
    const accountType = localStorage.getItem("acctype");
    if (accountType === "farmer") {
      navigate("/farmeraccount");
    } else if (accountType === "consumer") {
      navigate("/consumeraccount");
    }
  }, [navigate]);

  const handleSignUpOrLoginWithGoogle = async (userType, actionType) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (actionType === "signup") {
        await axios.post("https://krushikalpa-backend.onrender.com/signup", {
          email: user.email,
          name: user.displayName,
          userType: userType,
        });

        alert(`User signed up successfully as ${userType}`);
      }

      // Login logic (executed for both login and after signup)
      const response = await axios.post("https://krushikalpa-backend.onrender.com/login", {
        email: user.email,
      });

      if (response.data.message === "User found") {
        localStorage.setItem("acctype", userType.toLowerCase());
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("email", user.email);

        if (userType === "Farmer") {
          navigate("/farmeraccount");
        } else if (userType === "Consumer") {
          navigate("/consumeraccount");
        }
      } else {
        alert("User not found, please sign up first.");
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
          <button className='signup-btn' onClick={() => handleSignUpOrLoginWithGoogle("Farmer", "signup")}>
            Sign Up  
          </button>as Farmer 
        </span>
      </div>

      <div>
        <h1>For <span id="specc">Consumers</span></h1>
        <p>Support sustainable food practices.</p>
        <button className="login-btn" onClick={() => handleSignUpOrLoginWithGoogle("Consumer", "login")}>
          Login 
        </button>
        <span id="dontacc">Don't Have an account</span>
        <span id="signup-btn">
          <button className='signup-btn' onClick={() => handleSignUpOrLoginWithGoogle("Consumer", "signup")}>
            Sign Up
          </button>as Consumer 
        </span>
      </div>

    </section>
  );
}
