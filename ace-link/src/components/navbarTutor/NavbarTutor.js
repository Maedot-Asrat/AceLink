import "./navbar.css"
import Linkpath from '../linkpath/Linkpath';
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import logo from '../../assets/Logo.png';


const data ={
    userID:"1"
}

export default function NavbarTutor(){
    const [activeTab, setActiveTab] = useState("Dashboard"); 
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        // Set the user's name in state
        if (storedUser && storedUser.email) {
            setUserEmail(storedUser.email);
        }
        if (storedUser && storedUser.role) {
            setUserRole(storedUser.role);
        }
    }, []);
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    return(
        <div className="navbar">
            <div className="lis">
                <div className="content">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                        <span>ACELINK</span> 
                       
                    </div>
                    <Linkpath name="Dashboard" isActive={activeTab === "Dashboard"} onClick={() => handleTabClick("Dashboard")} />
                    <Linkpath name="My Courses" isActive={activeTab === "My Courses"} onClick={() => handleTabClick("My Courses")} />
                    <Linkpath name="My Sessions" isActive={activeTab === "My Sessions"} onClick={() => handleTabClick("My Sessions")} />
                    <Linkpath name="Study Groups" isActive={activeTab === "Study Groups"} onClick={() => handleTabClick("Study Groups")} />
                    <Linkpath name="Community" isActive={activeTab === "Community"} onClick={() => handleTabClick("Community")} />
                    <Linkpath name="My Schedules" isActive={activeTab === "My Schedules"} onClick={() => handleTabClick("My Schedules")} />
                    <Linkpath name="Messages" isActive={activeTab === "Messages"} onClick={() => handleTabClick("Messages")} />
                    <Linkpath name="Library" isActive={activeTab === "Library"} onClick={() => handleTabClick("Library")} />
                </div>

                <Link to="/profile">
                    <div className="profile">
                        <div className="profile-left">
                            <img src="profile.png" alt=""  width="30px"/>
                            <div className="pro">
                                <div className="name">{userEmail}</div>
                                <div className="label">{userRole}</div>
                                
                            </div>
                        </div>
                        <FiSettings size={"25px"}/>
                    </div>
                </Link>
                
            </div>
        </div>
    )
};