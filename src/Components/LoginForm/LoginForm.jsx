import React, { useState } from "react";

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
    } catch (error) {}
  }

  return (
    <>
      <div className="flex-col form-container">
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Password</label>
          <input
            type="text"
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
