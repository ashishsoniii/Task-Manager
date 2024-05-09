import React from "react";
import Navbar from "../Navbar";
import Tasks from "./Tasks";

const DashBoard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex justify-center">
        <div className="mx-12 my-12">
          <Tasks />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
