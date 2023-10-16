import React, { useState } from "react";
import { signUp } from "../../Utilities/users-service";

const SignUpForm = ({ setUser }) => {
  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  // function handleChange(evt) {
  //   setSignUp((prevSignUp) => ({
  //     ...prevSignUp,
  //     [evt.target.name]: evt.target.value,
  //     error: "",
  //   }));
  // }
  function handleChange(evt) {
    setSignUp({ ...signup, [evt.target.name]: evt.target.value });
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = signup;
      delete formData.confirm;

      const user = await signUp(formData);
      setUser(user);
    } catch (error) {
      setError("Invalid SignUp - try again");
    }
  }
  const disable = signup.password !== signup.confirm;
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
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default SignUpForm;
