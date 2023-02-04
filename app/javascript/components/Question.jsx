import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Question = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ answer: "", context: "" });

  useEffect(() => {
    const url = `/api/v1/questions/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuestion(response))
      .catch(() => navigate("/questions"));
  }, [params.id]);

  const promptAnswer = () => {
    let promptAnswer = "No answer available";

    if (question.answer.length > 0) {
      promptAnswer = question.answer;
    }

    return promptAnswer;
  };

  const promptContext = () => {
    let promptContext = "No context available";

    if (question.context.length > 0) {
      promptContext = question.context;
    }

    return promptContext;
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {question.prompt}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Answer</h5>
              {promptAnswer()}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Context</h5>
            <div>{promptContext()}</div>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger">
              Delete Question
            </button>
          </div>
        </div>
        <Link to="/questions" className="btn btn-link">
          Back to questions
        </Link>
      </div>
    </div>
  );
};

export default Question;
