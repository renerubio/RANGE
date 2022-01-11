import React from "react";
import { Routes, Route } from "react-router-dom";

import { Exercise1 } from "./Exercise1";
import { Exercise2 } from "./Exercise2";
import { Home } from "./Home";


export const App = () => {
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




