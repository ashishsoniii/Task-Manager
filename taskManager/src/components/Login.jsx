import React, { useState } from "react";
import axios from "axios";
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
        setError("User Registered Please Login!"); // Set error message from server response

        
      }
      const { token,user } = response.data;
      // console.log
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.name);
      localStorage.setItem("userEmail", user.email);
      navigate("/dashboard");

      // Redirect or perform any other action upon successful login/signup
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error); // Set error message from server response
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="bg-on-login ">
        <form
          className="absolute my-20 rounded-3xl flex-row justify-center align-middle w-full sm:w-1/2 lg:w-1/4 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80 shadow-2xl"
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
          <p
            className="my-2 text-white cursor-pointer "
            onClick={handleSignINUP}
          >
            {isSignInForm === "Login"
              ? "New to Task Manager? Sign Up "
              : "Already Registered? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
