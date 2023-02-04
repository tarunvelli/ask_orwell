import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/questions";

    if (prompt.length == 0) return;

    const body = {
      prompt
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
      .then((response) => navigate(`/questions/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Ask Orwell!</h1>
          <p className="lead">This is an experiment in using AI to make Animal farm's content more accessible.</p>
          <form onSubmit={onSubmit}>
            <div className="form-group mt-3">
              <input
                type="textarea"
                name="prompt"
                id="questionPrompt"
                className="form-control"
                defaultValue={'What happened to boxer?'}
                required
                onChange={(event) => onChange(event, setPrompt)}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3 me-3">
              Ask
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

export default NewQuestion;
