import React, { useState, useEffect } from "react";
import './wastage.css';
export default function Wastage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    specificWaste: "",
    weight: "",  // New: weight in kgs
    image: null, // New: image file
  });

  // Waste categories
  const wasteCategories = {
    "Organic Waste": ["Fruit & Vegetable Peels", "Crop Residues", "Cow Dung", "Neem Leaves", "Food Scraps"],
    "Recyclable Waste": ["Paper", "Glass", "Metals", "Cardboard"],
    "Hazardous Waste": ["Plastic", "Chemical Waste", "Batteries", "E-Waste"],
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");
    const storedType = localStorage.getItem("acctype");

    if (storedEmail && storedName && storedType) {
      setUser({
        name: storedName,
        email: storedEmail,
        userType: storedType,
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", user.name);
    formDataToSend.append("email", user.email);
    formDataToSend.append("userType", user.userType);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("specificWaste", formData.specificWaste);
    formDataToSend.append("weight", formData.weight);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/wastage", {
        method: "POST",
        body: formDataToSend, // Send as FormData
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ location: "", wasteType: "Organic Waste", specificWaste: "", weight: "", image: null });
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Server error. Please try again later.");
    }
  };
  

  return (
    <section className="wastage-section">
      <div className="wastage-cont">
        <h2>Sell Your Wastage</h2>

        {user ? (
          <>
            <p>
              Welcome, <strong>{user.name}</strong> ({user.userType})
            </p>

            <form onSubmit={handleSubmit}>
              <label >
                <span >Location:</span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
            

              <label>
                <span>Select Specific Waste Type:</span>
                <select
                  name="specificWaste"
                  value={formData.specificWaste}
                  onChange={handleChange}
                  
                >
                  {wasteCategories[formData.wasteType]?.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Weight (in kgs):</span>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  
                  required
                />
              </label>

              {/* Image Upload */}
              <label>
                <span>Upload Waste Image:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  
                  required
                />
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                
 onClick={handleSubmit}             >
                Submit
              </button>
            </form>
          </>
        ) : (
          <p >
            Please <a href="/signup" >Sign Up</a> to continue.
          </p>
        )}
      </div>
    </section>
  );
}
