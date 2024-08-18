// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import React from 'react';
// import { CartProvider } from "./components/cartcontext/cartcontext";
// import "./styles/global.css";
// import "./App.css";
// import Navbar from "./components/navbar/Navbar";
// import Mycourses from "./pages/mycourses/Mycourses";
// import Tutors from "./pages/tutors/Tutors";
// import Community from "./pages/community/community";
// import { IoNotificationsSharp } from "react-icons/io5";
// import MainApp from './MainApp';
// import LoginStudent from './pages/loginStudent/login';
// import RegisterStudent from './pages/registerStudent/register';
// import LoginTutor from './pages/loginTutor/login';
// import ForgotPass from './pages/forgotpassword/forgotpassword';
// import RegisterTutor from './pages/registerTutor/RegisterTutor';
// import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
// import LogoutButton from './components/LogoutButton';
// import TutorProfilePage from './pages/TutorProfile/TutorProfile';
// import Dashboard from './pages/dashboard/dashboard';
// import SchedulePage from "./pages/schedule/SchedulePage";
// export default function RouterApp() {
//   const Layout = () => {
//     return (
//       <div className="main">
//         <div className="navbar">
//         <PrivateRoute>
//           <Navbar />
//         </PrivateRoute>
//         </div>
//         <div className="contentcontainer">
//           <div className="bar">
//             <div className="tit">Home</div>
//             <div>
//               <IoNotificationsSharp size={"20px"} />
//               <LogoutButton />
//             </div>
//           </div>
//           <div className="out">
//             <CartProvider>
//               <Outlet />
//             </CartProvider>
//           </div>
          
//         </div>
//       </div>
//     );
//   };

//   const router = createBrowserRouter([
//     { path: "/", element: <MainApp /> },
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         { 
//           path: "/dashboard", 
//           element: (
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/tutors", 
//           element: (
//             <PrivateRoute>
//               <Tutors />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/mycourses", 
//           element: (
//             <PrivateRoute>
//               <Mycourses />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/studygroups", 
//           element: (
//             <PrivateRoute>
//               <Community />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/community", 
//           element: (
//             <PrivateRoute>
//               <Community />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/myschedules", 
//           element: (
//             <PrivateRoute>
//               <SchedulePage />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/messages", 
//           element: (
//             <PrivateRoute>
//               <Tutors />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/library", 
//           element: (
//             <PrivateRoute>
//               <Tutors />
//             </PrivateRoute>
//           ) 
//         },
//         { 
//           path: "/profile", 
//           element: (
//             <PrivateRoute>
//               <Tutors />
//             </PrivateRoute>
//           ) 
//         },
//         {
//           path: "/tutorProfile/:id", 
//           element: 
//             <PrivateRoute>
//               <TutorProfilePage />
//             </PrivateRoute>
//         }
//       ],
//     },
//     { path: "/loginStudent", element: <LoginStudent /> },
//     { path: "/registerStudent", element: <RegisterStudent /> },
//     { path: "/loginTutor", element: <LoginTutor /> },
//     { path: "/registerTutor", element: <RegisterTutor /> },
//     { path: "/forgotPass", element: <ForgotPass /> },
   
//   ]);

//   return <RouterProvider router={router} />;
// }



import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import React from 'react';
import { CartProvider } from "./components/cartcontext/cartcontext";
import "./styles/global.css";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Mycourses from "./pages/mycourses/Mycourses";
import Tutors from "./pages/tutors/Tutors";
// import Tutor from "./pages/tutor/tutors";
import Community from "./pages/community/community";
import { IoNotificationsSharp } from "react-icons/io5";
import MainApp from './MainApp';
import LoginStudent from './pages/loginStudent/login';
import RegisterStudent from './pages/registerStudent/register';
import LoginTutor from './pages/loginTutor/login';
import ForgotPass from './pages/forgotpassword/forgotpassword';
import RegisterTutor from './pages/registerTutor/RegisterTutor';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import LogoutButton from './components/LogoutButton';
import TutorProfilePage from './pages/TutorProfile/TutorProfile';
import Dashboard from './pages/dashboard/dashboard';
import SchedulePage from "./pages/schedule/SchedulePage";
import Library from "./pages/library/library";
import DashboardTutor from "./tutorPages/dashboard/Dashboard";
import { FiLogOut } from 'react-icons/fi';
import JitsiMeeting from "./pages/meet/JitsiMeeting";

export default function RouterApp() {
  const Layout = () => {
    const location = useLocation();

    // Map the pathname to the page name
    const pageTitles = {
      '/dashboard': 'Dashboard',
      '/tutors': 'Tutor Recommendations For You',
      '/mycourses': 'My Courses',
      '/studygroups': 'Study Groups',
      '/community': 'Community',
      '/myschedules': 'My Schedules',
      '/messages': 'Messages',
      '/library': 'Library',
      '/profile': 'Profile',
      '/tutorProfile': 'Tutor Profile'
    };

    // Default to 'Home' if no matching pathname is found
    const title = pageTitles[location.pathname] || 'Home';

    return (
      <div className="main">
        <div className="navbar">
        <PrivateRoute>
          <Navbar />
        </PrivateRoute>
        </div>
        <div className="contentcontainer">
          <div className="bar">
            <div className="tit">{title}</div>
            <div>
              <IoNotificationsSharp size={"20px"} />
     
              <LogoutButton />
            </div>
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
        { 
          path: "/dashboard", 
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/tutors", 
          element: (
            <PrivateRoute>
              <Tutors />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/mycourses", 
          element: (
            <PrivateRoute>
              <Mycourses />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/studygroups", 
          element: (
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/community", 
          element: (
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/myschedules", 
          element: (
            <PrivateRoute>
              <SchedulePage />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/messages", 
          element: (
            <PrivateRoute>
              <Tutors />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/library", 
          element: (
            <PrivateRoute>
              <Library />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/meet", 
          element: (
            <PrivateRoute>
              <JitsiMeeting />
              </PrivateRoute>
          ) 
        },
        { 
          path: "/profile", 
          element: (
            <PrivateRoute>
              <Tutors />
            </PrivateRoute>
          ) 
        },
        {
          path: "/tutorProfile/:id", 
          element: 
            <PrivateRoute>
              <TutorProfilePage />
            </PrivateRoute>
        }
      ],
    },
    { path: "/loginStudent", element: <LoginStudent /> },
    { path: "/registerStudent", element: <RegisterStudent /> },
    { path: "/loginTutor", element: <LoginTutor /> },
    { path: "/registerTutor", element: <RegisterTutor /> },
    { path: "/forgotPass", element: <ForgotPass /> },

   
  ]);

  return <RouterProvider router={router} />;
}
// Temporarily render JitsiMeeting to check if it works outside routing
// export default function App() {
//   return <JitsiMeeting />;
// }
