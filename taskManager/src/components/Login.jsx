import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State to store error message

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
      // Redirect or perform any other action upon successful login/signup
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error); // Set error message from server response
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg"
        />
      </div>

      <form
        className="absolute flex-row justify-center align-middle  w-1/4   top-80 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80"
        onSubmit={handleFormSubmit}
      >
        <h1 className="py-4 my-4 font-bold text-3xl  text-white rounded-xl">
          {isSignInForm}
        </h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        {isSignInForm === "Signup" && (
          <input
            type="name"
            placeholder="Name"
            className="p-4 my-4 bg-gray-800 w-full rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-4 my-4 bg-gray-800 w-full rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 rounded-lg"
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
