import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Question = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ prompt: "", answer: "" });

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

    if (question.answer?.length > 0) {
      promptAnswer = question.answer;
    }

    return promptAnswer;
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Ask Orwell!</h1>
          <p className="lead">This is an experiment in using AI to make Animal farm's content more accessible.</p>
          <form >
            <div className="form-group mt-3">
              <label className="mb-3" htmlFor="questionPrompt">
                Question prompt
              </label>
              <input
                type="textarea"
                name="prompt"
                id="questionPrompt"
                className="form-control"
                defaultValue={question.prompt}
                required
                onChange={(event) => onChange(event, setPrompt)}
              />
            </div>
            <div className="form-group mt-3">
              Answer: {promptAnswer()}
            </div>
            <button type="submit" className="btn btn-dark mt-3 me-3">
              Ask Again
            </button>
            <Link to="/questions" className="btn btn-dark mt-3 me-3">
              Frequently asked
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Question;
