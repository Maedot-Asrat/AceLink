import { Link } from "react-router-dom";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FaListAlt, FaBookReader, FaPenSquare, FaRegUser, FaRegCalendarAlt, FaRegCommentDots, FaRegBuilding, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiFileList3Line } from "react-icons/ri";

const iconMap = {
    'Dashboard': AiFillHome,
    'Tutor': FaRegUser,
    'My Courses': FaRegCalendarAlt,
    'My Sessions': FaRegCalendarAlt,
    'My Students': FaRegUser,
    'Study Groups': FaBookReader,
    'Community': IoIosPeople,
    'My Schedules': FaRegCalendarAlt,
    'Messages': FaRegCommentDots,
    'Library': FaRegBuilding,
    'Recordings': RiFileList3Line,
    'Earnings': FaRegMoneyBillAlt
};

const pathMap = {
    'Dashboard': "/dashboard",
    'Tutor': "/tutors",
    'My Courses': "/mycourses",
    'My Sessions': "/sessions",
    'My Students': "/mystudents",
    'Study Groups': "/studygroups",
    'Community': "/community",
    'My Schedules': "/myschedules",
    'Messages': "/messages",
    'Library': "/library",
    'Recordings': "/recordings",
    'Earnings': "/earnings"
};

export default function Linkpath({ name, isActive, onClick }) {
    const IconComponent = iconMap[name];

    return (
        <div className={`linkpath ${isActive ? 'active' : ''}`} onClick={onClick}>
            <Link to={pathMap[name]}>
                <div className="home">
                    {IconComponent && <IconComponent className={`icon ${isActive ? 'active' : ''}`} size={"20px"} />}
                    <span className="name">{name}</span>
                </div>
            </Link>
        </div>
    );
}