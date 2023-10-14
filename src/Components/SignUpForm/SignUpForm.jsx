import React, { useState } from "react";
import { signUp } from "../../Utilities/users-service";

const SignUpForm = ({ setUser }) => {
  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });
  function handleChange(evt) {
    setSignUp((prevSignUp) => ({
      ...prevSignUp,
      [evt.target.name]: evt.target.value,
      error: "",
    }));
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = { ...signup };
      delete formData.error;
      delete formData.confirm;

      const user = await signUp(formData);
      setUser(user);
    } catch (error) {
      setSignUp({ ...signup, error: "Invalid SignUp - try again" });
    }
  }
  const disable = setSignUp.password !== setSignUp.confirm;
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={signup.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={signup.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={signup.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={signup.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{signup.error}</p>
    </div>
  );
};

export default SignUpForm;
