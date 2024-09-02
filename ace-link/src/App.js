

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
import ProfilePage from "./pages/polishPage/ProfilePage";
import PolishProfile from "./pages/polishPage/GettingToKnowYouPage";
import JitsiMeet from "./pages/meet/JitsiMeeting";
import RecordingsPage from './pages/recordings/RecordingsPage';
import StudyGroup from './pages/studygroup/addmodal';
import FlashCards from './pages/flashCards/flashcards';
import Chatbot from './pages/chatbot/chatbot';
// Tutors
import NavbarTutor from './components/navbarTutor/NavbarTutor';
import MySessions from './tutorPages/sessions/ScheduleSessionPage';
import MyStudents from './tutorPages/mystudents/MyStudents';
import MyEarnings from './tutorPages/earnings/MyEarnings';
import Meeting from './tutorPages/meet/JitsiMeeting';
import MySession from './tutorPages/components/MySessions/MySessions';
import UpdateTutor from './tutorPages/updateProfile/profile';

export default function RouterApp() {
  const Layout = () => {
    const location = useLocation();
    const userRole = localStorage.getItem('role'); 
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
      '/recordings': 'Recordings',
      '/profile': 'Profile',
      '/tutorProfile': 'Tutor Profile',
      "/dashboardTutor":'Tutor Dashboard'
    };

    // Default to 'Home' if no matching pathname is found
    const title = pageTitles[location.pathname] || 'Home';

    return (
      <div className="main">
        <div className="navbar">
        {userRole === 'Student' ? <Navbar /> : <NavbarTutor />}
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
      element:<PrivateRoute><Layout /></PrivateRoute>,
      children: [
        { 
          path: "/dashboard", 
          element: (
            <PrivateRoute role="Student">
              <Dashboard />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/tutors", 
          element: (
            <PrivateRoute role="Student">
              <Tutors />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/mycourses", 
          element: (
            <PrivateRoute role="Student">
              <Mycourses />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/studygroups", 
          element: (
            <PrivateRoute role="Student">
              <StudyGroup />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/community", 
          element: (
            <PrivateRoute role="Student">
              <Community />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/myschedules", 
          element: (
            <PrivateRoute role="Student">
              <SchedulePage />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/messages", 
          element: (
            <PrivateRoute role="Student">
              <Community />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/library", 
          element: (
            <PrivateRoute role="Student">
              <Library />
            </PrivateRoute>
          ) 
        },
        { 
          path: "/meeting", 
          element: (
            <PrivateRoute role="Student">
              <JitsiMeet />
             
              </PrivateRoute>
          ) 
        },
        { 
          path: "/recordings", 
          element: (
            <PrivateRoute role="Student">
              <RecordingsPage />
             
              </PrivateRoute>
          ) 
        },
   
        { 
          path: "/profile", 
          element: (
            <PrivateRoute role="Student">
              <Tutors />
            </PrivateRoute>
          ) 
        },
        {
          path: "/tutorProfile/:id", 
          element: 
            <PrivateRoute role="Student">
              <TutorProfilePage />
            </PrivateRoute>
        },



        {
          path: "/dashboardTutor",
          element: (
            <PrivateRoute role="Tutor">
              <DashboardTutor />
            </PrivateRoute>
          ),
        },
        { 
          path: "/meetings", 
          element: (
            <PrivateRoute role="Tutor">
              <Meeting />
              
              </PrivateRoute>
          ) 
        },
        {
          path: "/sessions",
          element: (
            <PrivateRoute role="Tutor">
              <MySession />
            </PrivateRoute>
          ),
        },
        {
          path: "/mystudents",
          element: (
            <PrivateRoute role="Tutor">
              <MyStudents />
            </PrivateRoute>
          ),
        },
        {
          path: "/earnings",
          element: (
            <PrivateRoute role="Tutor">
              <MyEarnings />
            </PrivateRoute>
          ),
        },
        
       
      ],
    },
    { path: "/loginStudent", element: <LoginStudent /> },
    { path: "/registerStudent", element: <RegisterStudent /> },
    { path: "/loginTutor", element: <LoginTutor /> },
    { path: "/registerTutor", element: <RegisterTutor /> },
    { path: "/forgotPass", element: <ForgotPass /> },
    { path: "/meeting", element: <JitsiMeet /> },
    { 
      path: "/polishProfile", 
      element: (
       
          <ProfilePage/>
       
      ) 
    },
    { 
      path: "/getting-to-know-you", 
      element: (
        
          <PolishProfile/>
        
      ) 
    },
    {
      path: "/updatetutor",
      element: (
   
          <UpdateTutor />
      
      ),
    }
   
  ]);

  return <RouterProvider router={router} />;
}
// Temporarily render JitsiMeeting to check if it works outside routing
// export default function App() {
//   return <JitsiMeeting />;
// }
