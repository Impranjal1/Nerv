import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import Login from "./component/Login";
import "./index.css";
import Dashboard from "./component/dashboard";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Updated to /dashboard */}
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />

      </Routes>
    </Router>
  );
}

export default App;
