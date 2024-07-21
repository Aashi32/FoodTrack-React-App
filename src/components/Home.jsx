
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      text: 'We serve incomparable delicacies',
      subtext: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
    },
    {
      text: 'Discover New Flavors',
      subtext: "Experience a culinary adventure with dishes from around the world, delivered right to your doorstep.",
    },
    {
      text: 'Easy and Convenient',
      subtext: "Order your favorite meals with just a few clicks and enjoy fast, reliable delivery every time.",
      final: true,
    },
  ];
  

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home">
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>{slides[currentSlide].text}</h1>
        <p style={{ textAlign: 'center' }}>{slides[currentSlide].subtext}</p>

        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`bar ${index === currentSlide ? 'active' : ''}`}
            ></div>
          ))}
        </div>


        <div className="buttons">
          {!slides[currentSlide].final && (
            <>
              <button className="skip-button" onClick={() => navigate('/login')}>
                Skip
              </button>
              <button className="next-button" onClick={nextSlide}>
                Next →
              </button>
            </>
          )}
          {slides[currentSlide].final && (
            <button3 className="circle-button" onClick={() => navigate('/login')}>
              <svg width="24" height="24" viewBox="0 0 24 24" >
                <path
                  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  
                />
              </svg>
            </button3>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
