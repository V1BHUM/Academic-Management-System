import axios from "axios";
import { useState } from "react";

const AddProfessor = () => {
    const [professorID,setProfessorID] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const addProfessor = () => {
        axios.post("http://localhost:3010/professor/add",{professor_id: professorID, password: password, email: email, last_name: lastName, first_name: firstName})
            .then(res => {

            });
    }

    return ( 
        <div className="add-professor">

        </div>
    );
}
 
export default AddProfessor;