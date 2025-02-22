import React, { useState, useEffect } from "react";
import "./cslideshow.css";
import i2 from './image-11.png';
import i1 from './image-6.png';
import i3 from './image-26-1.png';
import i4 from './image-26-2.png';
const images = [
  i1, i2, i3, i4
];

export default function Cslideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slideshow-container">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <div className="slide fade">
        <img src={images[currentIndex]} alt="Slideshow" className="slide-image" />
      </div>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}
