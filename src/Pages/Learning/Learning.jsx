import React, { useEffect, useState } from "react";
import "./Learning.css";
import ReactPlayer from "react-player/youtube";
import Quize from "../Quize/Quize";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";

const Learning = () => {
  const [startQuize, setStartQuize] = useState(true);

  const [scoreFromApi, setScoreFromApi] = useState(null);

  const [scoreState, setScoreState] = useState(0);

  const [scoreDisplay, setScoreDisplay] = useState(false);

  const UUU = useSelector((state) => state.authReducer.authData);

  const onQuizeChange = () => {
    setStartQuize(false);
  };

  useEffect(() => {
    APIS.get(`/user/only-score/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data[0]?.score);
        // console.log(res.data);

        setScoreFromApi(res.data);
        setScoreState(res.data?.score);
        if (res.data?.score > 0) {
          console.log("score");
          setScoreDisplay(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="learning__main__card">
      {scoreDisplay ? (
        <div className="score__main__board">
          <div className="score__board">
            <h1 className="quize__text__contra">
              {scoreState >= 8 ? "Congratulation ....!" : "Final Results"}
            </h1>
            {scoreState >= 8 && (
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
            )}
            <h4>
              {scoreFromApi?.score} out of 10 correct - (
              {(scoreFromApi?.score / 10) * 100}%)
            </h4>
            {scoreState >= 8 ? (
              <div>
                <span>Waiting For Your Task</span>
              </div>
            ) : (
              <div className="restart__or__back_Video_card">
                <button onClick={() => setScoreDisplay(false)}>
                  Back to Video
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {startQuize && (
            <span className="all__pages__over__view">
              Hi There Welcome Back ....!
            </span>
          )}
          {startQuize ? (
            <div className="video__card">
              <div className="video__player__multi__card">
                <div>
                  <ReactPlayer
                    width="100%"
                    height="300px"
                    url="https://youtu.be/J6-girGi-HM?feature=sharedQ"
                  />
                </div>
                <div>
                  <ReactPlayer
                    width="100%"
                    height="300px"
                    url="https://youtu.be/J6-girGi-HM?feature=sharedQ"
                  />
                </div>
              </div>
              <div className="video__to__quize__div">
                <button onClick={onQuizeChange}>Start Quiz</button>
              </div>
            </div>
          ) : (
            <div className="quize__main__card">
              <Quize setStartQuize={setStartQuize} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Learning;
