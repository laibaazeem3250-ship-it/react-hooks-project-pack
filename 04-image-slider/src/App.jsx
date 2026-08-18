import { useState, useEffect } from "react";
import "./App.css";

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
];

function App() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="slider-container">
      <h1>Image Slider</h1>
      <div className="slider">
        <button className="nav-btn left" onClick={goToPrev}>
          ‹
        </button>
        <img src={images[current]} alt={`Slide ${current + 1}`} />
        <button className="nav-btn right" onClick={goToNext}>
          ›
        </button>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default App;