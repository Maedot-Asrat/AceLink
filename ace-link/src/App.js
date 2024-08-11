import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from 'react';
import { CartProvider } from "./components/cartcontext/cartcontext";
import "./styles/global.css";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Mycourses from "./pages/mycourses/Mycourses";
import Tutors from "./pages/tutors/Tutors";
import { IoNotificationsSharp } from "react-icons/io5";
import MainApp from './MainApp'; // Import the main app component
import LoginStudent from './pages/loginStudent/login';
import RegisterStudent from './pages/registerStudent/register';
import LoginTutor from './pages/loginTutor/login';
import RegisterTutor from './pages/registerTutor/RegisterTutor';
export default function RouterApp() {
  const Layout = () => {
    return (
      <div className="main">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="contentcontainer">
          <div className="bar">
            <div className="tit">Home</div>
            <IoNotificationsSharp size={"20px"} />
          </div>
          <div className="out">
            <CartProvider>
              <Outlet />
            </CartProvider>
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    { path: "/", element: <MainApp /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/tutors", element: <Tutors /> },
        { path: "/mycourses", element: <Mycourses /> },
        { path: "/studygroups", element: <Tutors /> },
        { path: "/community", element: <Tutors /> },
        { path: "/myschedules", element: <Tutors /> },
        { path: "/messages", element: <Tutors /> },
        { path: "/library", element: <Tutors /> },
        { path: "/profile", element: <Tutors /> },
      ],
    },
     // Set MainApp for the root path
     { path: "/loginStudent", element: <LoginStudent /> },
    { path: "/registerStudent", element: <RegisterStudent /> },
    { path: "/loginTutor", element: <LoginTutor /> },
    { path: "/registerTutor", element: <RegisterTutor /> },
  ]);

  return <RouterProvider router={router} />;
}