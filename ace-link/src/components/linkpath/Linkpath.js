import "./linkpath.css"
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { TiHome } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { FaListAlt,FaBookReader,FaPenSquare   } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { PiBooksBold } from "react-icons/pi";

import { FiHome } from "react-icons/fi";


const iconMap = {
    'Dashboard': FiHome,
    'Tutor' : TiHome,
    'My Courses':FaPenSquare ,
    'Study Groups':FaBookReader ,
    'Community':IoIosPeople,
    "My Schedules":FaListAlt,
    "Messages":AiFillMessage,
    "Library":PiBooksBold
}

const pathMap = {
    'Dashboard': "/dashboard",
    'Tutor' : "/tutors",
    'My Courses':"/mycourses" ,
    'Study Groups':"/studygroups" ,
    'Community':"/community",
    "My Schedules":"/myschedules",
    "Messages":"/messages",
    "Library":"/library"
}

export default function Linkpath({name, isActive, onClick}){
    const IconComponent = iconMap[name];

    return(
        <div className={`linkpath ${isActive ? 'active' : ''}`} onClick={onClick}>
            <Link to={pathMap[name]}>
            <div className="home">
                {IconComponent && <IconComponent className={`icon ${isActive ? 'active' : ''}`}  size={"20px"} />}
                <span className="name">{name}</span>
            </div> 
            </Link>  
        </div>
    )
}