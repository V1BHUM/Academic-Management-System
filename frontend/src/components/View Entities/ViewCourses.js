import axios from "axios";
import { useEffect, useState } from "react";
import CourseItem from "../List Items/CourseItem";

const ViewCourses = () => {
    const [courses,setCourses] = useState([]);
    const [displayCourses, setDisplayCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3010/course/all")
            .then(res => {
                setCourses(res.data);
                setDisplayCourses(res.data);
            });
    },[]);

    const searchCourses = (e) => {
        e.preventDefault();

        let temp = [];
        let value = e.target.value;

        courses.map(c => {
            if(c.course_id.toLowerCase().includes(value) || c.course_name.toLowerCase().includes(value))
            {
               temp.push(c);
            }     
            return 0;
        });

        setDisplayCourses(temp);
    }

    return ( 
        <div className="courses">
            <div className="search-field" style={{margin:"30px auto 50px auto", width:"30%"}}>
                <input className="form-control" placeholder="Search Courses" onChange={searchCourses} />
            </div>

            {displayCourses.map(c => {
                return <CourseItem key={c.course_id} course={c} />
            })}
        </div>
     );
}
 
export default ViewCourses;