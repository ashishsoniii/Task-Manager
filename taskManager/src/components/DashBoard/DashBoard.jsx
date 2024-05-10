import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Tasks from "./Tasks";

const DashBoard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [naam, setNaam] = useState(localStorage.getItem("None"));
  const [emaill, setEmaill] = useState(localStorage.getItem("None"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedToken) {
      // Redirect user to the login page if token is not found
      navigate("/");
    } else {
      setToken(storedToken);
      setNaam(storedUser);
      setEmaill(storedEmail);
    }
  }, [navigate, token]);

  return (
    <div>
      <Navbar setToken={setToken} />
      <div className="flex justify-center">
        <div className="mx-12 my-12">
          <div className="">
            <p className="text-lg">
              Welcome
              <span className="text-xl font-bold font-mono "> {naam}</span>
              <span className="text-lg font-bold"> ({emaill})!</span>
            </p>
          </div>{" "}
          <Tasks setToken={setToken} emaill={emaill} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
