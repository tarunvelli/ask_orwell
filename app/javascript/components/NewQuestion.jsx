import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/questions";

    if (prompt.length == 0 || context.length == 0) return;

    const body = {
      prompt,
      context,
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            New question
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group mt-3">
              <label className="mb-3" htmlFor="questionPrompt">Question prompt</label>
              <input
                type="text"
                name="prompt"
                id="questionPrompt"
                className="form-control"
                required
                onChange={(event) => onChange(event, setPrompt)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="mb-3" htmlFor="questionContext">Context</label>
              <textarea
                className="form-control"
                id="questionContext"
                name="context"
                rows="5"
                required
                onChange={(event) => onChange(event, setContext)}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Create Question
            </button>
            <Link to="/questions" className="btn btn-link mt-3">
              Back to questions
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
