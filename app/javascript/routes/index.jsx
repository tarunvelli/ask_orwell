import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "../components/Questions";
import Question from "../components/Question";
import NewQuestion from "../components/NewQuestion";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<NewQuestion />} />
      <Route path="/questions" exact element={<Questions />} />
      <Route path="/questions/:id" exact element={<Question />} />
      <Route path="/question" element={<NewQuestion />} />
    </Routes>
  </Router>
);