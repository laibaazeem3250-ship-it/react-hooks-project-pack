import { useState } from "react";
import "./App.css";

const tabsData = [
  {
    title: "About",
    content: "This is a simple Tabs component built using React and the useState hook to track which tab is active.",
  },
  {
    title: "Skills",
    content: "React, JavaScript, HTML, CSS, and version control with Git and GitHub.",
  },
  {
    title: "Projects",
    content: "Built several hook-focused mini apps including an accordion, color generator, star rating, and image slider.",
  },
  {
    title: "Contact",
    content: "Reach out via email or connect on LinkedIn to discuss opportunities or collaboration.",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <h1>Tabs Component</h1>
      <div className="tabs-header">
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <p>{tabsData[activeTab].content}</p>
      </div>
    </div>
  );
}

export default App;