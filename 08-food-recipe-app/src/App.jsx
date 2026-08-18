import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.meals || []);
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [category]);

  const fetchMeals = async (searchTerm = search) => {
    setLoading(true);
    setError("");

    try {
      let url;

      if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          category
        )}`;
      } else if (searchTerm.trim()) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          searchTerm
        )}`;
      } else {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!data.meals) {
        setMeals([]);
        setError("No recipes found");
      } else {
        setMeals(data.meals);
      }
    } catch (err) {
      setError("Something went wrong");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCategory("");
    fetchMeals(search);
  };

  const handleCategoryChange = (e) => {
    setSearch("");
    setCategory(e.target.value);
  };

  const openMealDetails = async (idMeal) => {
    setDetailLoading(true);
    setSelectedMeal({ idMeal });

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      setSelectedMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      setSelectedMeal(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  const getIngredients = (meal) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        list.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim());
      }
    }
    return list;
  };

  return (
    <div className="app">
      <h1>Recipe Finder</h1>
      <p className="subtitle">Search recipes or browse by category</p>

      <div className="controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search recipes (e.g. chicken)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <select value={category} onChange={handleCategoryChange}>
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="status">Loading recipes...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="meal-grid">
        {meals.map((meal) => (
          <div
            className="meal-card"
            key={meal.idMeal}
            onClick={() => openMealDetails(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="meal-info">
              <h3>{meal.strMeal}</h3>
              {meal.strCategory && <span className="tag">{meal.strCategory}</span>}
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            {detailLoading || !selectedMeal.strMeal ? (
              <p className="status">Loading details...</p>
            ) : (
              <>
                <img
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                  className="modal-img"
                />
                <h2>{selectedMeal.strMeal}</h2>
                <div className="modal-tags">
                  {selectedMeal.strCategory && (
                    <span className="tag">{selectedMeal.strCategory}</span>
                  )}
                  {selectedMeal.strArea && (
                    <span className="tag tag-alt">{selectedMeal.strArea}</span>
                  )}
                </div>

                <h4>Ingredients</h4>
                <ul className="ingredient-list">
                  {getIngredients(selectedMeal).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <h4>Instructions</h4>
                <p className="instructions">{selectedMeal.strInstructions}</p>

                {selectedMeal.strYoutube && (
                  <a
                    href={selectedMeal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    Watch Video Tutorial
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;