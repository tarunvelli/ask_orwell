import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const url = "/api/v1/questions";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  }, []);

  const Questions = () => {
    if (questions.length > 0) {
      return questions.map((question, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{question.prompt}</h5>
              <Link to={`/questions/${question.id}`} className="btn btn-dark">
                View Question
              </Link>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No questions yet. Why not{" "}
            <Link to="/question">ask a new question!</Link>
          </h4>
        </div>
      );
    }
  };

  return (
    <>
      <section className="text-center">
        <div className="container py-5">
          <h1 className="display-4">F.A.Q.</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular questions
            <br />
            Not answered here? Why not{" "}
            <Link to="/question">ask a new question!</Link>
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {loading ? (
              <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </div>
            ) : (
              Questions()
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Questions;
