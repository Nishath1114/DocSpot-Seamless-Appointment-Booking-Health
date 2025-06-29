import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setMessage("Login successful!");

      // Save token (optional - for protected routes later)
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage("Invalid credentials or server error.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login to DocSpot</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

