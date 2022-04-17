import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import "./course_item.css"

const CourseItem = (props) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const delCourse = () => {
        axios.post("http://localhost:3010/course/delete",{course_id: props.course.course_id})
            .then(_ => navigate(0));
    }


    return ( 
        <span className="citem" style = {{display:"flex"}}>
            <h4>{props.course.course_id}</h4>
            <h4>{props.course.course_name}</h4>
            <button className = 'view button btn btn-primary' onClick={_ => navigate("/course/" + props.course.course_id)}>View</button>
            {user.role === "admin" && <button className = 'delete button btn btn-primary' onClick={delCourse}>Delete</button>}
            
            <br></br>
        </span>
     );
}
 
export default CourseItem
