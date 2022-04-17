import axios from "axios";
import { useNavigate } from "react-router";
import "./student_item.css"


const StudentItem = (props) => {
    const navigate = useNavigate();

    
    const delStudent = function(){
        axios.post("http://localhost:3010/student/delete",{student_id:props.user.student_id}).then(()=>navigate(0));
    }

    return ( 
        <span className="sitem" style = {{display:"flex"}}>
            <h4>{props.user.student_id}</h4>
            <h4>{props.user.first_name}</h4>
            <h4>{props.user.last_name}</h4>
            <button className = 'view button btn btn-primary'>View</button>
            <button className = 'delete button btn btn-primary' onClick={delStudent}>Delete</button>
            <br></br>
        </span>
     );
}
 
export default StudentItem;