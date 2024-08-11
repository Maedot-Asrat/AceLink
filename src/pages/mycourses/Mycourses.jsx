import { useState } from "react";
import Card from "../../components/card/Card";
import "./mycourses.css"

const data = [
    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },    {
        id : "ifuinrfin",
        image : "/cour1.png",
        title : "Learn Python",
        description : "Understanding Basic algorithms and data structures with python, and practices on competative programming sites.",
        enroll : "40+ Enroll",
    },
]

export default  function Mycourses(){
    const [courses, setcourses] = useState(data);


    return(
        <div className="mycourses">
            {
                courses.map( (course)=>(
                    <Card key={course.id} id={course.id} title = {course.title} image = {course.image} desc = {course.description} enroll={course.enroll}/>
                )

                )
            }
        </div>
    )
}