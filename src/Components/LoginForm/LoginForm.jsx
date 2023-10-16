import React, { useState } from "react";
import * as usersService from "../../Utilities/users-service";

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (error) {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <>
      <div className="flex-col form-container">
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <p>{error}</p>
    </>
  );
};

export default LoginForm;
