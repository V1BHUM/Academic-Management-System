import axios from "axios";
import { useEffect, useState } from "react";
import CourseItem from "../List Items/CourseItem";

const ViewCourses = () => {
    const [courses,setCourses] = useState([]);
    const [displayCourses, setDisplayCourses] = useState([]);

    const [query,setQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3010/course/all")
            .then(res => {
                setCourses(res.data);
                setDisplayCourses(res.data);
            });
    },[]);

    // const searchCourses = (e) => {
    //     e.preventDefault();

    //     let temp = [];
    //     let value = e.target.value;

    //     courses.map(c => {
    //         if(c.course_id.toLowerCase().includes(value) || c.course_name.toLowerCase().includes(value))
    //         {
    //            temp.push(c);
    //         }     
    //         return 0;
    //     });

    //     setDisplayCourses(temp);
    // }

    const searchCourses = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3010/course/search", {query: '%' + query + '%'})
            .then(res => {
                setDisplayCourses(res.data);
            });
    }

    return ( 
        <div className="courses" style={{marginBottom:"40px"}}>
            <div className="search-field" style={{margin:"30px auto 50px auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <input className="form-control" style={{width: "30%", marginRight:"30px"}} placeholder="Search Students" onChange={e => setQuery(e.target.value)}/>
                <button className="btn btn-primary" onClick={searchCourses}>Search</button>
            </div>

            {displayCourses.map(c => {
                return <CourseItem key={c.course_id} course={c} />
            })}
        </div>
     );
}
 
export default ViewCourses;