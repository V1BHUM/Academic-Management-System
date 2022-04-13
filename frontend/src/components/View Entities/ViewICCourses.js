import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CourseItem from "../List Items/CourseItem";

const ViewICCourses = () => {
    const {user, loading} =  useContext(UserContext);

    const [courses,setCourses] = useState([]);

    useEffect(() => {
        if(loading)
        {
            axios.post("http://localhost:3010/course/ic",{ic: user.professor_id})
            .then(res => {
                setCourses(res.data);
            });
        }
    },[loading, user.professor_id]);

    return ( 
        <div className="courses">
            {courses.map(c => {
                return <CourseItem key={c.course_id} course={c} />
            })}
        </div>
     );
}
 
export default ViewICCourses;