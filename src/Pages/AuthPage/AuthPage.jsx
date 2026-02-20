import React, { useState } from "react";
import "./AuthPage.css";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import LoginForm from "../../Components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
  const [showLogin, setShowLogin] = useState();

  return (
    <main className="auth-bg">
      <div className="flex-ctr-ctr flex-col">
        <img className="logo" src="https://i.imgur.com/tPX2MEY.png" alt="" />
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "LOGIN" : "SIGN UP"}
        </h3>
      </div>
      <div className="flex-ctr-ctr">
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
    </main>
  );
};

export default AuthPage;
