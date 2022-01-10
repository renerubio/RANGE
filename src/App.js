import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Range from "./components/Range";

const App = () => {
  return (
    <div>
      <header>
        <h1>Range React App</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise1" element={<Exercise1 />} />
        <Route path="exercise2" element={<Exercise2 />} />
      </Routes>
    </div>
  );
};

const Home = () => {
  return (
    <nav>
      <div>
        <Link to="/exercise1">exercise1</Link>
      </div>
      <div>
        <Link to="/exercise2">exercise2</Link>
      </div>
    </nav>
  );
};

const Exercise1 = () => {
  return (
    <>
      <header>
        <h2>Exercise 1</h2>
      </header>
      <nav>
        <Link to="/">Back</Link>
      </nav>
      <div className="d-flex flex-row">
        <Range min={1} max={10000} />
      </div>
    </>
  );
};

const Exercise2 = () => {
  return (
    <>
      <header>
        <h2>Exercise 2</h2>
      </header>
      <nav>
        <Link to="/">Back</Link>
      </nav>
      <Range />
    </>
  );
};

export default App;
