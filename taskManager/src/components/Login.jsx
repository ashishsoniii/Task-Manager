import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  // fucntion for handleSignINUP
  const handleSignINUP = () => {
    setIsSignInForm(!isSignInForm);
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

      {/* Login form */}

      <form className="absolute flex-row justify-center align-middle  w-1/4   top-80 mx-auto p-10 right-0 left-0 bg-black bg-opacity-80">
        <h1 className="py-4 my-4 font-bold text-3xl  text-white rounded-xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="name"
            placeholder="Name"
            className="p-4 my-4 bg-gray-800 w-full rounded-lg"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="p-4 my-4 bg-gray-800 w-full rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 rounded-lg"
        />
        <button
          className="p-5 my-4 bg-red-600	 w-full text-white rounded-xl"
          type="submit"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="my-2 text-white cursor-pointer " onClick={handleSignINUP}>
          {isSignInForm
            ? "New to Cinema? Sign Up "
            : "Already Registerd? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
