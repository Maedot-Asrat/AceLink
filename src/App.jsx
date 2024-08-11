import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/cartcontext/cartcontext";
import Welcome from "./pages/welcome/Welcome";
import "./styles/global.css"
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Mycourses from "./pages/mycourses/Mycourses";
import Tutors from "./pages/tutors/Tutors";


export default function App() {
  const Layout = () => {
    return (
      <div className="main">
          <div className="navbar">
              <Navbar /> 
          </div>
          <div className="contentcontainer">
            <div className="bar">
                <div className="tit">Home</div>
                <div className="not">notif</div>
            </div>
            <div className="out">
              <CartProvider>
                <Outlet/>
              </CartProvider>
            </div>
          </div>
      </div>
    );
  };

  const router = createBrowserRouter([
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
    { path: "/", element: <Welcome /> },
    // { path: "/login", element: <Login /> },
    // { path: "/signup", element: <Signup /> },
    // { path: "/", element: <Welcome /> },
  ]);

  return (
      <RouterProvider router={router} />
  );}