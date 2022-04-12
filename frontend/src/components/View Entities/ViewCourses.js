import axios from "axios";
import { useEffect, useState } from "react";
import CourseItem from "../List Items/CourseItem";

const ViewCourses = () => {
    const [courses,setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3010/course/all")
            .then(res => {
                setCourses(res.data);
            })
    },[]);

    return ( 
        <div className="courses">
            {courses.map(c => {
                return <CourseItem key={c.course_id} course={c} />
            })}
        </div>
     );
}
 
export default ViewCourses;