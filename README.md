# React Hooks Project Pack

A collection of 8 React mini-apps built to practice core React hooks — `useState`, `useEffect`, and `useRef` — through real, hands-on projects. Built as part of the Pathment React mentorship program.

## Overview

| # | App | What it does | Hooks Used | 
|---|-----|---------------|------------|
| 01 | [Accordion](./01-accordion) | Expandable FAQ-style accordion | `useState` | 
| 02 | [Random Color Generator](./02-random-color-generator) | Generates random hex colors with a recent-colors history | `useState`, `useEffect` |
| 03 | [Star Rating](./03-star-rating) | Interactive 5-star rating widget | `useState` | 
| 04 | [Image Slider](./04-image-slider) | Image carousel with navigation and progress dots | `useState`, `useEffect` | 
| 05 | [Tabs Component](./05-tabs) | Tabbed content switcher | `useState` | 
| 06 | [Modal Popup](./06-modal-popup) | Modal that closes on outside click, tracked via ref | `useState`, `useRef` | 
| 07 | [Weather App](./07-weather-app) | Live weather lookup by city (OpenWeatherMap API) with dynamic, condition-based UI | `useState`, `useEffect`, `useRef` |
| 08 | [Food Recipe App](./08-food-recipe-app) | Recipe search and category filter (TheMealDB API), with a full recipe detail view | `useState`, `useEffect`, `useRef` | 


## What this project demonstrates

- Practical use of React's three core hooks across 8 different UI patterns
- Two apps (07, 08) integrate real third-party REST APIs with live data, loading states, and error handling
- Component-level state management without external libraries
- Responsive, condition-aware UI (e.g. the weather app's background and icon change based on live weather data)
- Clean project structure — each app is fully self-contained in its own folder

## Tech Stack

- **React** (Vite)
- **Vanilla CSS** — no UI libraries, all custom-styled
- **Public REST APIs** — OpenWeatherMap, TheMealDB

## Running any project locally

Each app is a self-contained Vite project.

```bash
cd <project-folder>
npm install
npm run dev
```

The weather app additionally needs a `.env` file inside `07-weather-app` (not included in this repo for security):

```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

Get a free key at [openweathermap.org/api](https://openweathermap.org/api).

## Author
Laiba Azeem 