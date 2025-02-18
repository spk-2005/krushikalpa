import React, { useState, useEffect, useRef } from "react";
import "./wastage.css";

export default function Wastage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    specificWaste: "",
    weight: "",
    image: null,
  });

  const organicWaste = [
    { name: "Fruit & Vegetable Peels", price: 5 },
    { name: "Crop Residues", price: 7 },
    { name: "Cow Dung", price: 3 },
    { name: "Neem Leaves", price: 6 },
    { name: "Food Scraps", price: 4 },
  ];

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "specificWaste") {
      const selectedWaste = organicWaste.find((item) => item.name === value);
      if (selectedWaste) {
        setSelectedPrice(selectedWaste.price);
        setTotalPrice(selectedWaste.price * (formData.weight || 0));
      }
    }

    if (name === "weight") {
      setTotalPrice(selectedPrice * value);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1]; // Removes the data URL part
      setCapturedImage(base64Image); // Preview
      setFormData({ ...formData, image: base64Image });
    };
    reader.readAsDataURL(file); // Converts file to Base64
  };
  

  const startCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      setFormData({ ...formData, image: file });
      setCapturedImage(URL.createObjectURL(blob)); // Preview
      stopCamera();
      setCameraOpen(false);
    }, "image/jpeg");
  };
  
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", user.name);
    formDataToSend.append("email", user.email);
    formDataToSend.append("userType", user.userType);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("specificWaste", formData.specificWaste);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("totalPrice", totalPrice || 2000);
  
    // Attach image file
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    } else {
      alert("Please upload a valid image.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/wastage", {
        method: "POST",
        body: formDataToSend,
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        alert(result.message);
        setFormData({ location: "", specificWaste: "", weight: "", image: null });
        setCapturedImage(null);
        setTotalPrice(0);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="wastage-section">
      <div className="wastage-cont">
        <h2>Sell Your Organic Waste</h2>

        {user ? (
          <>
            <p>
              Welcome, <strong>{user.name}</strong> ({user.userType})
            </p>

            <form onSubmit={handleSubmit}>
              <label>
                <span>Location:</span>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </label>

              <label>
                <span>Select Organic Waste Type:</span>
                <select name="specificWaste" value={formData.specificWaste} onChange={handleChange}>
                  <option value="" disabled>Select waste type</option>
                  {organicWaste.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} - ₹{item.price}/kg
                    </option>
                  ))}
                </select>
              </label>

              {formData.specificWaste && <p className="price-info">Price per kg: <strong>₹{selectedPrice}</strong></p>}

              <label>
                <span>Weight (in kgs):</span>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
              </label>

              {formData.weight && <p className="price-info">Total Price: <strong>₹{totalPrice}</strong></p>}

              <label>
                <span>Upload Waste Image:</span>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>

              <button type="button" onClick={startCamera}>Use Camera</button>

              {cameraOpen && (
                <div className="camera-container">
                  <video ref={videoRef} autoPlay></video>
                  <button type="button" onClick={captureImage}>Capture</button>
                  <button type="button" onClick={stopCamera}>Close Camera</button>
                  <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                </div>
              )}

              {capturedImage && (
                <div className="image-preview">
                  <img src={capturedImage} alt="Captured Preview" />
                  <button type="button" onClick={() => setCapturedImage(null)}>Retake</button>
                </div>
              )}

              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <p>Please <a href="/signup">Sign Up</a> to continue.</p>
        )}
      </div>
    </section>
  );
}
