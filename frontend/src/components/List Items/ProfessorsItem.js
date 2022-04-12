import axios from "axios";
import { useNavigate } from "react-router";
import "./professor_item.css"

const ProfessorItem = (props) => {
    const navigate = useNavigate();

    const delProfessor = () => {
        axios.post("http://localhost:3010/professor/delete")
            .then(_ => navigate(0));
    }

    return ( 
        <span className="pitem" style = {{display:"flex"}}>
            <h4>{props.professor.professor_id}</h4>
            <h4>{props.professor.first_name}</h4>
            <h4>{props.professor.last_name}</h4>
            <button className = 'view button btn btn-primary'>View</button>
            <button className = 'delete button btn btn-primary' onClick={delProfessor}>Delete</button>
            <br></br>
        </span> 
    );
}
 
export default ProfessorItem;