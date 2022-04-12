import axios from "axios";
import { useNavigate } from "react-router";
import "./course_item.css"

const CourseItem = (props) => {
    const navigate = useNavigate();

    const delCourse = () => {
        axios.post("http://localhost:3010/course/delete",{course_id: props.course.course_id})
            .then(_ => navigate(0));
    }

    return ( 
        <span className="citem" style = {{display:"flex"}}>
            <h4>{props.course.course_id}</h4>
            <h4>{props.course.course_name}</h4>
            <button className = 'view button btn btn-primary'>View</button>
            <button className = 'delete button btn btn-primary' onClick={delCourse}>Delete</button>
            <br></br>
        </span>
     );
}
 
export default CourseItem
