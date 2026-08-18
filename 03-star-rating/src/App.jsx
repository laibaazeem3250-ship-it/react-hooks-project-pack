import { useState } from "react";
import "./App.css";

function App() {
  const totalStars = 5;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="app">
      <div className="card">
        <h1>Rate Your Experience</h1>
        <div className="stars">
          {Array.from({ length: totalStars }, (_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${
                  starValue <= (hoverRating || rating) ? "filled" : ""
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            );
          })}
        </div>
        <p className="rating-text">
          {rating > 0 ? `You rated: ${rating} / ${totalStars}` : "Click to rate"}
        </p>
      </div>
    </div>
  );
}

export default App;