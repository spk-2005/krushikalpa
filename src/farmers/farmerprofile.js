import React, { useState, useEffect } from "react";
import "./farmerprofile.css";
import indiaStates from "../indiastates";

const statesAndDistricts = indiaStates;

export default function Farmerprofile() {const storedName = localStorage.getItem("name") || "";
  const storedEmail = localStorage.getItem("email") || "";
  
  const [formData, setFormData] = useState({
    name: storedName || "",  // Ensure an empty string as fallback
    dob: "",  // Set to an empty string to avoid undefined
    gender: "Male",  // Set default value to avoid undefined
    aadharNumber: "",  // Set default value to avoid undefined
    mobileNumber: "",  // Set default value to avoid undefined
    state: "Andhra Pradesh",  // Set default value to avoid undefined
    district: statesAndDistricts["Andhra Pradesh"][0] || "",  // Default to first district
    mandal: "",  // Set default value to avoid undefined
    townVillage: "",  // Set default value to avoid undefined
    pincode: "",  // Set default value to avoid undefined
    acres: 0,  // Set default value to avoid undefined
    soilType: "Alluvial",  // Default to "Alluvial"
    primaryCrops: "",  // Set default value to avoid undefined
    secondaryCrops: "",  // Set default value to avoid undefined
    previousInvestment: 0,  // Set default value to avoid undefined
    profitLoss: "profit",  // Set default value to avoid undefined
  });
  

  const [districts, setDistricts] = useState(statesAndDistricts["Andhra Pradesh"]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${storedEmail}`);
        const data = await response.json();
        if (data) {
          setFormData((prevFormData) => ({ ...prevFormData, ...data }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [storedEmail]); // Add storedEmail as a dependency
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setFormData({ ...formData, state: newState, district: statesAndDistricts[newState][0] });
    setDistricts(statesAndDistricts[newState]);
  };

  const handleSave = async () => {
    const updatedData = {
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      aadharNumber: formData.aadharNumber,
      mobileNumber: formData.mobileNumber,
      address: {
        state: formData.state,
        district: formData.district,
        mandal: formData.mandal,
        townVillage: formData.townVillage,
        pincode: formData.pincode,
      },
      landDetails: {
        acres: formData.acres,
        soilType: formData.soilType,
        primaryCrops: formData.primaryCrops,
        secondaryCrops: formData.secondaryCrops,
      },
      previousInvestment:formData.previousInvestment,
      profitLoss: formData.profitLoss,

    };

    try {
      const response = await fetch("http://localhost:5000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ storedEmail, updatedData }) // Ensure correct structure
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error updating user:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <section className="farmer-profile">
      <h1>Farmer Profile</h1>
      <form className="profile-form">
        <div className="form-group">
          <h2>Personal Details</h2>
          <label>Name <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
          <label>Date of Birth <input type="date" name="dob" value={formData.dob} onChange={handleChange} /></label>
          <label>Gender 
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>Aadhar Number <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} maxLength="12" /></label>
          <label>Mobile Number <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Enter your mobile number" /></label>
        </div>

        <div className="form-group">
          <h2>Residence/Address</h2>
          <label>State 
            <select name="state" value={formData.state} onChange={handleStateChange}>
              {Object.keys(statesAndDistricts).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <label>District 
            <select name="district" value={formData.district} onChange={handleChange}>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </label>
          <label>Mandal <input type="text" name="mandal" value={formData.mandal} onChange={handleChange} /></label>
          <label>Town/Village <input type="text" name="townVillage" value={formData.townVillage} onChange={handleChange} /></label>
          <label>Pincode <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength="6" /></label>
        </div>

        <div className="form-group">
          <h2>Land Details</h2>
          <label>Acres of Land <input type="number" name="acres" value={formData.acres} onChange={handleChange} /></label>
          <label>Soil Type 
            <select name="soilType" value={formData.soilType} onChange={handleChange}>
              <option>Alluvial</option>
              <option>Black</option>
              <option>Laterite</option>
              <option>Arid</option>
              <option>Saline and Alkaline</option>
            </select>
          </label>
          <label>Primary Crop <input type="text" name="primaryCrops" value={formData.primaryCrops} onChange={handleChange} /></label>
          <label>Secondary Crop <input type="text" name="secondaryCrops" value={formData.secondaryCrops} onChange={handleChange} /></label>
        </div>

        <div className="form-group">
          <h2>Investment & Profit/Loss</h2>
          <label>Investment <input type="number" name="previousInvestment" value={formData.previousInvestment} onChange={handleChange} /></label>
          <label>Profit/Loss
            <label>
              <input type="radio" name="profitLoss" value="Profit" checked={formData.profitLoss === "Profit"} onChange={handleChange} /> Profit
            </label>
            <label>
              <input type="radio" name="profitLoss" value="Loss" checked={formData.profitLoss === "Loss"} onChange={handleChange} /> Loss
            </label>
          </label>
        </div>

        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </section>
  );
}
