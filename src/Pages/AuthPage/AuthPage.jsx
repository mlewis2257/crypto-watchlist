import React from "react";
import "./AuthPage.css";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import LoginForm from "../../Components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
  return (
    <div className="flex-ctr-ctr flex-col">
      <img className="logo" src="https://i.imgur.com/tPX2MEY.png" alt="" />
      <LoginForm setUser={setUser} />
      <SignUpForm setUser={setUser} />
    </div>
  );
};

export default AuthPage;
