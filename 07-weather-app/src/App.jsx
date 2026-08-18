import { useState, useEffect, useRef } from "react";
import "./App.css";

function WeatherIcon({ condition }) {
  const icons = {
    clear: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <circle cx="50" cy="50" r="24" fill="#FFD65C" />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 32;
          const y1 = 50 + Math.sin(angle) * 32;
          const x2 = 50 + Math.cos(angle) * 42;
          const y2 = 50 + Math.sin(angle) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFD65C"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    ),
    clouds: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <ellipse cx="42" cy="55" rx="26" ry="18" fill="#E8EDF3" />
        <ellipse cx="62" cy="48" rx="20" ry="16" fill="#F5F8FA" />
        <ellipse cx="52" cy="60" rx="22" ry="15" fill="#DCE3EB" />
      </svg>
    ),
    rain: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <ellipse cx="42" cy="42" rx="24" ry="16" fill="#8FA3B8" />
        <ellipse cx="60" cy="38" rx="18" ry="14" fill="#9FB2C4" />
        {[35, 50, 65].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="62"
            x2={x - 6}
            y2="78"
            stroke="#5C9EE8"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </svg>
    ),
    drizzle: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <ellipse cx="42" cy="42" rx="24" ry="16" fill="#A9BBCC" />
        {[35, 50, 65].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="62"
            x2={x - 3}
            y2="72"
            stroke="#7FB4EE"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
    ),
    thunderstorm: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <ellipse cx="45" cy="40" rx="26" ry="17" fill="#5C6773" />
        <polygon points="48,58 38,78 48,78 42,92 62,68 50,68" fill="#FFD65C" />
      </svg>
    ),
    snow: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <ellipse cx="42" cy="42" rx="24" ry="16" fill="#C9D6E3" />
        {[35, 50, 65].map((x, i) => (
          <text key={i} x={x - 6} y="78" fontSize="18" fill="#BFE3FF">
            *
          </text>
        ))}
      </svg>
    ),
    mist: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        {[35, 45, 55, 65].map((y, i) => (
          <line
            key={i}
            x1="15"
            y1={y}
            x2="85"
            y2={y}
            stroke="#B8C4CF"
            strokeWidth="5"
            strokeLinecap="round"
            opacity={1 - i * 0.15}
          />
        ))}
      </svg>
    ),
  };

  return icons[condition] || icons.clear;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error(res.status === 404 ? "City not found" : "Something went wrong");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const conditionGroup = weather?.weather[0]?.main?.toLowerCase() || "default";

  return (
    <div className={`app-bg bg-${conditionGroup}`}>
      <div className="app">
        <h1>Weather</h1>
        <p className="subtitle">Check live conditions for any city</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="location">
              <h2>{weather.name}</h2>
              <span>{weather.sys.country}</span>
            </div>

            <div className="icon-row">
              <WeatherIcon condition={conditionGroup} />
              <div>
                <p className="temp">{Math.round(weather.main.temp)}°C</p>
                <p className="description">{weather.weather[0].description}</p>
              </div>
            </div>

            <div className="details">
              <div className="detail">
                <span className="label">Feels like</span>
                <span className="value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail">
                <span className="label">Humidity</span>
                <span className="value">{weather.main.humidity}%</span>
              </div>
              <div className="detail">
                <span className="label">Wind</span>
                <span className="value">{weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;