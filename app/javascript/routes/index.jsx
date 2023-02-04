import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
    </Routes>
  </Router>
);