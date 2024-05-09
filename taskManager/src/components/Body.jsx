import React from "react";
import Header from "./Header";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> }, // login page
    { path: "/browse", element: <Browse /> }, // browse page
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      {/* <Header/>
        <Browse/>
        <Login/> */}
    </>
  );
};

export default Body;
