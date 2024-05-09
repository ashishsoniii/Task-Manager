import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignINUP = () => {
    setIsSignInForm(isSignInForm === "Login" ? "Signup" : "Login");
    setError(""); // Clear any previous error message
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignInForm === "Login") {
        response = await axios.post("http://localhost:3001/auth/login", {
          email,
          password,
        });
      } else {
        response = await axios.post("http://localhost:3001/auth/register", {
          name,
          email,
          password,
        });
      }
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");

      // Redirect or perform any other action upon successful login/signup
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error); // Set error message from server response
    }
  };

  return (
    <div>
      <Header />

      <form
        className="absolute rounded-3xl flex-row justify-center align-middle  w-1/4   top-28 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80"
        onSubmit={handleFormSubmit}
      >
        <h1 className="py-4 my-4 font-bold text-3xl  text-white rounded-xl">
          {isSignInForm}
        </h1>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        {isSignInForm === "Signup" && (
          <input
            type="name"
            placeholder="Name"
            className="p-4 my-4 bg-gray-100   w-full rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-4 my-4 bg-gray-100   w-full rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-100  rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-5 my-4 bg-red-600	 w-full text-white rounded-xl"
          type="submit"
        >
          {isSignInForm}
        </button>
        <p className="my-2 text-white cursor-pointer " onClick={handleSignINUP}>
          {isSignInForm === "Login"
            ? "New to Cinema? Sign Up "
            : "Already Registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
