import React, { useState } from "react";
import "./Register.css";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

const Register = () => {
  const [switchRegisterPage, setSwitchRegisterPage] = useState(0);
  // pass login data

  const [phoneAndName, setPhoneAndName] = useState("");
  const onSwitchRegistor = (data) => {
    setSwitchRegisterPage(1);
    setPhoneAndName(data);
  };

  return (
    <div className="register__main__card">
      <div className="sigup__inner__card">
        <div
          className="signup__left__side"
          style={{
            flex: switchRegisterPage === 1 && "1.5",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="signup__text__card">
              <span className="signup__welcome__text">Welcome</span>
              <span>Register new account</span>
            </div>

            <div className="signup__tabs__card">
              <span
                style={{
                  borderBottom: switchRegisterPage === 0 && "2px solid #8cba7d",
                }}
                onClick={() => setSwitchRegisterPage(0)}
              >
                Sign Up
              </span>
              <span
                style={{
                  borderBottom: switchRegisterPage === 1 && "2px solid #8cba7d",
                }}
                onClick={() => setSwitchRegisterPage(1)}
              >
                Log In
              </span>
            </div>
          </div>
          {/* tabs carsd */}
          {switchRegisterPage === 0 ? (
            <SignUp onSwitchRegistor={onSwitchRegistor} />
          ) : (
            <Login phoneAndName={phoneAndName} />
          )}
        </div>
        {/* image card */}

        <div className="signup__image__card">
          <img
            src="https://images.moneycontrol.com/static-mcnews/2024/03/voteimg.png"
            alt=""
          />
          {/* <img src="Images/cam-signup.png" alt="" /> */}
          {/* <h2>Student </h2>
          <h4>Back</h4> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
