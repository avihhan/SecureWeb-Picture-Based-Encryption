import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/Login.css"; // Import CSS file

const SignUpForm = ({ handleSignUp, setSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [picture, setPicture] = useState(null);

  const switch2login = () => {
    // Call setSignUp with false to set the state to false
    setSignUp(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  return (
    <div className="container">
      <div className="card">
        <div>
          <h2>Sign Up</h2>
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
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="input"
          />
          <button
            className="button"
            onClick={() =>
              handleSignUp(
                username,
                password,
                confirm_password,
                first_name,
                last_name,
                picture
              )
            }
          >
            Register
          </button>
          <div className="text-center mt-4">
            <Link onClick={switch2login} className="text-blue-500">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
