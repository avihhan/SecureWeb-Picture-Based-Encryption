import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import SignUpForm from "./components/SignUp";
import axios from "axios";
import exifr from "exifr";

const setCookie = (name, value, minutes) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let encryptedPass;

  const handleSignUp = async (
    username,
    password,
    confirm_password,
    first_name,
    last_name,
    picture
  ) => {
    console.log(picture);
    if (password !== confirm_password) {
      alert("Password and confirm password do not match.");
      return;
    }

    const picture_meta = (picture) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const imageDataUrl = event.target.result;
            const exifData = await exifr.parse(imageDataUrl);
            resolve(exifData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(picture);
      });
    };

    const picture_key = await picture_meta(picture);

    const creationDateTime = picture_key.CreateDate;
    const dimension = {
      x_dim: picture_key.ExifImageHeight,
      y_dim: picture_key.ExifImageWidth,
    };

    const key = `${creationDateTime} - ${dimension.x_dim}x${dimension.y_dim}`;

    // Function to encrypt text using a key
    function encrypt(text, key) {
      let encryptedText = "";
      for (let i = 0; i < text.length; i++) {
        let encryptedCharCode =
          text.charCodeAt(i) + key.charCodeAt(i % key.length);
        encryptedText += String.fromCharCode(encryptedCharCode);
      }
      return encryptedText;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    const encryptedPassword = encrypt(hashedPassword, key);
    const url = "http://localhost:5050/login-auth/register";
    const data = {
      username: username,
      password: encryptedPassword,
      first_name: first_name,
      last_name: last_name,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        navigate("/");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSignUp(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLogin = async (username, password, picture) => {
    // Function to decrypt text using a key
    function decrypt(encryptedText, key) {
      let decryptedText = "";
      for (let i = 0; i < encryptedText.length; i++) {
        let decryptedCharCode =
          encryptedText.charCodeAt(i) - key.charCodeAt(i % key.length);
        decryptedText += String.fromCharCode(decryptedCharCode);
      }
      return decryptedText;
    }

    function encrypt(text, key) {
      let encryptedText = "";
      for (let i = 0; i < text.length; i++) {
        let encryptedCharCode =
          text.charCodeAt(i) + key.charCodeAt(i % key.length);
        encryptedText += String.fromCharCode(encryptedCharCode);
      }
      return encryptedText;
    }

    const picture_meta = (picture) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const imageDataUrl = event.target.result;
            const exifData = await exifr.parse(imageDataUrl);
            resolve(exifData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        try {
          reader.readAsDataURL(picture);
        } catch (error) {
          setMessage(error);
          reject(error);
        }
      });
    };

    const picture_key = await picture_meta(picture);

    const creationDateTime = picture_key.CreateDate;
    const dimension = {
      x_dim: picture_key.ExifImageHeight,
      y_dim: picture_key.ExifImageWidth,
    };

    const key = `${creationDateTime} - ${dimension.x_dim}x${dimension.y_dim}`;

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const encryptedPassword = encrypt(hashedPassword, key);
    const response = await axios
      .post("http://localhost:5050/login-auth/", {
        username: username,
        password: encryptedPassword,
      })
      .then((response) => {
        console.log("server response", response.data);
        if (response.data.success) {
          console.log(decrypt(response.data.user_data.password, key));
          console.log(hashedPassword);
          if (
            hashedPassword === decrypt(response.data.user_data.password, key)
          ) {
            setLoggedIn(true);
            setCookie("loggedIn", true, 5);
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMessage("Password is wrong.");
        } else if (error.response.status === 404) {
          setMessage("User not found. Please signup.");
        } else {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        }
      });
    return response;
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    const isLoggedIn = getCookie("loggedIn");
    console.log(isLoggedIn);
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div className="w-full p-6">
          <Navbar handleLogout={handleLogout} />
          <Outlet />
        </div>
      ) : signUp ? (
        <SignUpForm handleSignUp={handleSignUp} setSignUp={setSignUp} />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          setSignUp={setSignUp}
          message={message}
        />
      )}
    </div>
  );
};
// console.log(getCookie("loggedIn"));
export default App;
