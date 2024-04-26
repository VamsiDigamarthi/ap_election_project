import React, { useEffect, useState } from "react";
import "./Quize.css";
import { Link } from "react-router-dom";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
const question = [
  {
    text: "What is the capital of America?",
    options: [
      { id: 0, text: "New York City", isCorrect: false },
      { id: 1, text: "Boston", isCorrect: false },
      { id: 2, text: "Santa Fe", isCorrect: false },
      { id: 3, text: "Washington DC", isCorrect: true },
    ],
  },
  {
    text: "What year was the Constitution of America written?",
    options: [
      { id: 0, text: "1787", isCorrect: true },
      { id: 1, text: "1776", isCorrect: false },
      { id: 2, text: "1774", isCorrect: false },
      { id: 3, text: "1826", isCorrect: false },
    ],
  },
  {
    text: "Who was the second president of the US?",
    options: [
      { id: 0, text: "John Adams", isCorrect: true },
      { id: 1, text: "Paul Revere", isCorrect: false },
      { id: 2, text: "Thomas Jefferson", isCorrect: false },
      { id: 3, text: "Benjamin Franklin", isCorrect: false },
    ],
  },
  {
    text: "What is the largest state in the US?",
    options: [
      { id: 0, text: "California", isCorrect: false },
      { id: 1, text: "Alaska", isCorrect: true },
      { id: 2, text: "Texas", isCorrect: false },
      { id: 3, text: "Montana", isCorrect: false },
    ],
  },
  {
    text: "Which of the following countries DO NOT border the US?",
    options: [
      { id: 0, text: "Canada", isCorrect: false },
      { id: 1, text: "Russia", isCorrect: true },
      { id: 2, text: "Cuba", isCorrect: false },
      { id: 3, text: "Mexico", isCorrect: false },
    ],
  },
  {
    text: "What is the largest state in the US?",
    options: [
      { id: 0, text: "California", isCorrect: false },
      { id: 1, text: "Alaska", isCorrect: true },
      { id: 2, text: "Texas", isCorrect: false },
      { id: 3, text: "Montana", isCorrect: false },
    ],
  },
  {
    text: "Which of the following countries DO NOT border the US?",
    options: [
      { id: 0, text: "Canada", isCorrect: false },
      { id: 1, text: "Russia", isCorrect: true },
      { id: 2, text: "Cuba", isCorrect: false },
      { id: 3, text: "Mexico", isCorrect: false },
    ],
  },
  {
    text: "Who was the second president of the US?",
    options: [
      { id: 0, text: "John Adams", isCorrect: true },
      { id: 1, text: "Paul Revere", isCorrect: false },
      { id: 2, text: "Thomas Jefferson", isCorrect: false },
      { id: 3, text: "Benjamin Franklin", isCorrect: false },
    ],
  },
  {
    text: "What is the capital of America?",
    options: [
      { id: 0, text: "New York City", isCorrect: false },
      { id: 1, text: "Boston", isCorrect: false },
      { id: 2, text: "Santa Fe", isCorrect: false },
      { id: 3, text: "Washington DC", isCorrect: true },
    ],
  },
  {
    text: "What year was the Constitution of America written?",
    options: [
      { id: 0, text: "1787", isCorrect: true },
      { id: 1, text: "1776", isCorrect: false },
      { id: 2, text: "1774", isCorrect: false },
      { id: 3, text: "1826", isCorrect: false },
    ],
  },
];

const Quize = ({ setStartQuize }) => {
  const [questions, setQuestions] = useState(question);

  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [questionsNumber, setQuestionsNumber] = useState([1]);

  const UUU = useSelector((state) => state.authReducer.authData);
  const shuffleArray = () => {
    const newArray = [...questions]; // Create a copy of the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    setQuestions(newArray); // Set the shuffled array in state
  };
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    shuffleArray();
    setQuestionsNumber([1]);
  };

  useEffect(() => {
    shuffleArray();
  }, []);

  const onBackToVideo = () => {
    // setSwitchVideoToQuiz(true);
    setStartQuize(true);
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      let newField = [...questionsNumber, currentQuestion + 2];
      // newField[currentQuestion + 1] = currentQuestion + 1;
      setQuestionsNumber(newField);
    } else {
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (showResults) {
      APIS.put(
        `/user/update-score/${UUU?._id}`,
        { score: score },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
          // if (score >= 4) {
          //   navigate("/task", { replace: true });
          // }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      APIS.put(
        `/user/update-score/${UUU?._id}`,
        { score: score },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [showResults]);
  // console.log(questionsNumber);
  // console.log(questionsNumber.includes(2));

  // console.log(score);

  return (
    <>
      {showResults ? (
        <div className="score__main__board">
          {score >= 8 ? (
            <div className="quize__completed__success">
              <h1>Congratulation</h1>
              <span
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  color: "lightslategray",
                }}
              >
                Congratulations to the most decorated person in the work! I'm so
                glad that
                <br /> everyone can see your brilliance.
              </span>
              <span>
                {" "}
                {score} out of {questions.length} correct - (
                {(score / questions.length) * 100}%)
              </span>
              <span>Waiting For Your Task</span>
            </div>
          ) : (
            <div className="score__board">
              <h1>Final Results</h1>
              <h2>
                {score} out of {questions.length} correct - (
                {(score / questions.length) * 100}%)
              </h2>
              <div className="restart__or__back_Video_card">
                <button className="button" onClick={() => restartGame()}>
                  Restart Quiz
                </button>
                <button onClick={onBackToVideo}>Back to Video</button>
              </div>
              <Link to="tasks">
                {score >= questions.length - 2 && <span>Go to Tour Tasks</span>}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="quize__left__quetions">
            <h4>QUIZ QUESTIONS AND ANSWERS</h4>
            <div className="questions__number__card">
              {questions.map((each, key) => (
                <div
                  className={
                    questionsNumber.includes(key + 1)
                      ? "currect__question"
                      : "next__qustion"
                  }
                  key={key}
                >
                  <span>{key + 1}</span>
                </div>
              ))}
            </div>
            <div className="question__card__main">
              <h1>{questions[currentQuestion].text}</h1>
            </div>
          </div>
          <div className="quize__right__answer">
            <div className="quize__answer__card">
              {questions[currentQuestion].options?.map((option, key) => {
                return (
                  <div
                    key={key}
                    onClick={() => optionClicked(option.isCorrect)}
                    className="a_quize_cardssss"
                  >
                    <span>
                      {key === 0
                        ? "A"
                        : key === 1
                        ? "B"
                        : key === 2
                        ? "C"
                        : "D"}
                    </span>
                    <span>{option.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quize;
