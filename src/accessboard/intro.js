import React, { useEffect, useRef, useState } from 'react';
import vide from './WhatsApp Video 2025-02-21 at 18.08.53_92d63872.mp4';
import './intro.css';

const Intro = () => {
  const videoRef = useRef(null);
  const mainVideoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleLearnMore = () => {
    setShowVideo(true);
  };

  const handleGetStarted = () => {
    // Smooth scroll to the next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      <div className="intro-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="video-element"
          >
            <source
              src={vide}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="intro-content">
          <h1 className="intro-title">Welcome to Krushikalpa</h1>
          <p className="intro-subtitle">
            Empowering farmers with modern solutions for sustainable agriculture
          </p>
          <div className="intro-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
          <div className="scroll-down">
            <svg
              className="scroll-icon"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {showVideo && (
        <div className="video-modal">
          <button className="close-button" onClick={handleCloseVideo}>
            ×
          </button>
          <div className="modal-content">
            <video
              ref={mainVideoRef}
              controls
              className="main-video"
              autoPlay
            >
              <source src={vide} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;