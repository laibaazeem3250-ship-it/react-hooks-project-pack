import { useState, useEffect } from "react";
import "./App.css";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [color, setColor] = useState(getRandomColor());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.title = `Color: ${color}`;
  }, [color]);

  const generateColor = () => {
    const newColor = getRandomColor();
    setHistory((prev) => [color, ...prev].slice(0, 5));
    setColor(newColor);
  };

  return (
    <div className="app" style={{ backgroundColor: color }}>
      <div className="card">
        <h1>Random Color Generator</h1>
        <div className="color-box" style={{ backgroundColor: color }}>
          <span className="color-code">{color}</span>
        </div>
        <button onClick={generateColor}>Generate New Color</button>

        {history.length > 0 && (
          <div className="history">
            <p className="history-label">Recent colors</p>
            <div className="history-swatches">
              {history.map((c, i) => (
                <div
                  key={i}
                  className="swatch"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;