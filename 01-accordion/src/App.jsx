import { useState } from "react";
import "./App.css";

const faqData = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces using reusable components.",
  },
  {
    question: "What is a hook?",
    answer: "Hooks are functions that let you use state and other React features inside functional components.",
  },
  {
    question: "What is useState?",
    answer: "useState is a hook that lets you add local state to a functional component.",
  },
  {
    question: "What is useEffect?",
    answer: "useEffect lets you run side effects like fetching data or updating the DOM after render.",
  },
  {
    question: "Why use an accordion?",
    answer: "Accordions save space by letting users expand only the section they want to read.",
  },
];

function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <h1>FAQ Accordion</h1>
      <div className="accordion">
        {faqData.map((item, index) => (
          <div key={index} className="accordion-item">
            <div
              className="accordion-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="accordion-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;