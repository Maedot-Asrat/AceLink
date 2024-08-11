import "./navbar.css"
import Linkpath from '../linkpath/Linkpath';
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState } from "react";

const data ={
    userID:"1"
}

export default function Navbar(){
    const [activeTab, setActiveTab] = useState("Tutor"); 

    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    return(
        <div className="navbar">
            <div className="lis">
                <div className="content">
                    <div className="logo">
                        <img src="/logo.png" alt="" width={"30px"} height={"30px"}/>
                        <span>ACELINK</span>
                        
                    </div>
                    <Linkpath name="Tutor" isActive={activeTab === "Tutor"} onClick={() => handleTabClick("Tutor")} />
                    <Linkpath name="My Courses" isActive={activeTab === "My Courses"} onClick={() => handleTabClick("My Courses")} />
                    <Linkpath name="Study Groups" isActive={activeTab === "Study Groups"} onClick={() => handleTabClick("Study Groups")} />
                    <Linkpath name="My Schedules" isActive={activeTab === "My Schedules"} onClick={() => handleTabClick("My Schedules")} />
                    <Linkpath name="Messages" isActive={activeTab === "Messages"} onClick={() => handleTabClick("Messages")} />
                    <Linkpath name="Library" isActive={activeTab === "Library"} onClick={() => handleTabClick("Library")} />
                </div>

                <Link to="/profile">
                    <div className="profile">
                        <img src="profile.png" alt=""  width="30px"/>
                        <div className="pro">
                            <div className="name"> Daniel Ababu</div>
                            <div className="label">Student</div>
                        </div>
                        <FiSettings size={"25px"}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}