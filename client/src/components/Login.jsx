import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/Login.css"; // Import CSS file

const LoginForm = ({ handleLogin, setSignUp, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="font-bold p-1">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="input"
        />
        {message !== null && <div className="text-red-500">{message}</div>}
        <button
          className="button"
          onClick={() => handleLogin(username, password, picture)}
        >
          Login
        </button>
        <div className="text-center mt-4">
          don't have an account{" "}
          <Link onClick={setSignUp} className="text-blue-500">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
