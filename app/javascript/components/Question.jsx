import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Question = () => {
  const params = useParams();
  const navigate = useNavigate();

  const luckyPrompts = [
    "What is a minimalist entrepreneur?",
    "What is your definition of community?",
    "How do I decide what kind of business I should start?",
  ];

  const [loading, setLoading] = useState(false);
  const promptBox = useRef(null);
  const [question, setQuestion] = useState({
    ask_count: 0,
    prompt: 'What is The Minimalist Entrepreneur about?',
    answer: "",
  });

  const changePrompt = (prompt) => {
    setQuestion({ prompt: prompt });
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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const randomPrompt = () => {
    randomIndex = Math.floor(Math.random() * luckyPrompts.length);
    return luckyPrompts[randomIndex];
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
    <section className="text-center">
      <div className="container py-5">
        <h1 className="display-4">Ask My Book!</h1>
        <p className="lead text-muted">
          This is an experiment in using AI to make <a href="https://www.amazon.com/Minimalist-Entrepreneur-Great-Founders-More/dp/0593192397" target="_blank">The Minimalist Entrepreneur's</a> content more
          accessible.
          <br />
          To view frequently asked questions{" "}
          <Link to="/questions">click here!</Link>
        </p>
      </div>
      <div className="container py-5 w-50">
        <form onSubmit={onSubmit}>
          <div className="">
            <textarea
              type="textarea"
              name="prompt"
              id="questionPrompt"
              className="form-control"
              rows="3"
              value={question.prompt}
              ref={promptBox}
              required
              onChange={(event) => changePrompt(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            {isAnswered() && `Answer: ${promptAnswer()}`}
          </div>
          {loading ? (
            <>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          ) : isAnswered() ? (
            <button
              className="btn btn-dark mt-3 me-3"
              onClick={() =>
                changePrompt(question.prompt) && promptBox.current.focus()
              }
            >
              Ask another
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-dark mt-3 me-3">
                Ask
              </button>
              <button
                type="submit"
                className="btn btn-secondary text-dark mt-3 me-3"
                onClick={() => changePrompt(randomPrompt())}
              >
                I'm feeling lucky
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Question;
