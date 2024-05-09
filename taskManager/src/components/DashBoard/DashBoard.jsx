import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Tasks from "./Tasks";

const DashBoard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      // Redirect user to the login page if token is not found
      navigate("/");
    } else {
      setToken(storedToken);
    }
  }, [navigate,token]);

  return (
    <div>
      <Navbar  setToken={setToken}/>
      <div className="flex justify-center">
        <div className="mx-12 my-12">
          <Tasks setToken={setToken} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
