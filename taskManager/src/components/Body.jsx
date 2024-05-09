import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import BGLog from "./BGLog";



const Body = () => {
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/";
//     }
//   }, []);

  const appRouter = createBrowserRouter([
    { path: "/", element: <BGLog /> }, // login page
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
