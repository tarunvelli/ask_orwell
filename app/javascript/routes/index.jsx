import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "../components/Questions";
import Question from "../components/Question";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Question />} />
      <Route path="/question" exact element={<Question />} />
      <Route path="/questions/:id" exact element={<Question />} />
      <Route path="/questions" exact element={<Questions />} />
    </Routes>
  </Router>
);