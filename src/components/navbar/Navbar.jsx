import "./navbar.css"
import Linkpath from './../linkpath/Linkpath';
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';

const data ={
    userID:"1"
}

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="lis">
                <div className="content">
                    <div className="logo">ACELINK</div>
                    <Linkpath name="Tutor"/>
                    <Linkpath name="My Courses"/>
                    <Linkpath name="Study Groups"/>
                    <Linkpath name="My Schedules"/>
                    <Linkpath name="Messages"/>
                    <Linkpath name="Library"/>

                </div>

                <Link to="/profile">
                    <div className="profile">
                        <img src="ppp.png" alt=""  width="30px"/>
                        <div className="pro">
                            <div>Daniel Ababu</div>
                            <div>Student</div>
                        </div>
                        <FiSettings size={"25px"}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}