import React, { useEffect } from "react";
import Header from "./Header";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";

const Body = () => {
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/";
//     }
//   }, []);

  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> }, // login page
    { path: "/browse", element: <Browse /> }, // browse page
    { path: "/dashboard", element: <DashBoard /> }, // dashboard page
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Body;
