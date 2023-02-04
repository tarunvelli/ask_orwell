import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Question = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    ask_count: 0,
    prompt: "What happened to boxer?",
    answer: "",
  });

  const changePrompt = (event) => {
    setQuestion({ prompt: event.target.value });
  };

  useEffect(() => {
    if (params.id) {
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
    }
  }, [params.id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/questions";

    if (question.prompt.length == 0) return;

    const body = {
      prompt: question.prompt,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        if (response.id != params.id) {
          navigate(`/questions/${response.id}`);
        } else {
          setQuestion(response);
        }
      })
      .catch((error) => console.log(error.message));
  };

  const promptAnswer = () => {
    let promptAnswer = "No answer available";

    if (question.answer?.length > 0) {
      promptAnswer = question.answer;
    }

    return promptAnswer;
  };

  const isAnswered = () => {
    return question.ask_count > 0;
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Ask Orwell!</h1>
          <p className="lead">
            This is an experiment in using AI to make Animal farm's content more
            accessible.
          </p>
          <form onSubmit={onSubmit}>
            <div className="form-group mt-3">
              <label className="mb-3" htmlFor="questionPrompt">
                Question prompt
              </label>
              <input
                type="textarea"
                name="prompt"
                id="questionPrompt"
                className="form-control"
                value={question.prompt}
                required
                onChange={(event) => changePrompt(event)}
              />
            </div>
            <div className="form-group mt-3">
              {isAnswered() && `Answer: ${promptAnswer()}`}
            </div>
            {!isAnswered() && (
              <button type="submit" className="btn btn-dark mt-3 me-3">
                Ask
              </button>
            )}
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
