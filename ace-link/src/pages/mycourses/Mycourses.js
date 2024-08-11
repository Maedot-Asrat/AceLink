import { useState } from "react";
import Card from "../../components/card/Card";
import "./mycourses.css"
import {Courses} from "../../data.js"



export default  function Mycourses(){
    const [courses, setcourses] = useState(Courses);


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