import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
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
