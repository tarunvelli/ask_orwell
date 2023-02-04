import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome";
import Questions from "../components/Questions";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Welcome />} />
      <Route path="/questions" element={<Questions />} />
    </Routes>
  </Router>
);