import React from "react";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import LoginForm from "../../Components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
  return (
    <div className="flex-ctr-ctr flex-col">
      <h3>AuthPage</h3>

      <LoginForm setUser={setUser} />
      <SignUpForm setUser={setUser} />
    </div>
  );
};

export default AuthPage;
