import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import "./professor_item.css"



const ProfessorItem = (props) => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const delProfessor = () => {
        axios.post("http://localhost:3010/professor/delete", {professor_id: props.professor.professor_id})
            .then(res => {
                if(res.data.msg === "Delete Courses")
                {
                    alert("Professor is IC of one or more courses. Please delete them first");
                }
                else if(res.data.msg === "Delete Sections")
                {
                    alert("Professor is part of one or more sections. Please delete them first");
                }
                else
                {
                    navigate(0);
                }
            });
    }

    return ( 
        <span className="pitem" style = {{display:"flex"}}>
            <h4>{props.professor.professor_id}</h4>
            <h4>{props.professor.first_name}</h4>
            <h4>{props.professor.last_name}</h4>
            <button className = 'view button btn btn-primary' onClick={_ => navigate("/professor/view/" + props.professor.professor_id)}>View</button>
            {user.role==="admin" && <button className = 'delete button btn btn-primary' onClick={delProfessor}>Delete</button>}
            <br></br>
        </span> 
    );
}
 
export default ProfessorItem;