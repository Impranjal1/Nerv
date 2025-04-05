import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import Login from "./component/Login";
import "./index.css";
import Dashboard from "./component/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Updated to /dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
