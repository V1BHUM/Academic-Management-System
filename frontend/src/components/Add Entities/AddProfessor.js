import axios from "axios";
import { useState } from "react";
import './add_professor.css';

const AddProfessor = () => {
    const [professorID,setProfessorID] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const addProfessor = () => {
        axios.post("http://localhost:3010/professor/add",{professor_id: professorID, password: password, email: email, last_name: lastName, first_name: firstName})
            .then(res => {
                alert("New Professor Added");
            });
    }

    return ( 
        <div className="add-professor">
            <form className="add-professor-form" onSubmit={addProfessor}>
                <h3>New Professor Form</h3>

                <div className="input-field">
                    <label htmlFor="professor-id" className="form-label">Professor ID :</label>
                    <input id="professor-id" className="form-control" placeholder="Enter Professor ID" onChange={e => setProfessorID(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input id="password" className="form-control" placeholder="Enter Professor's Password" onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="first-name" className="form-label">First Name :</label>
                    <input id="first-name" className="form-control" placeholder="Enter Professor's First Name" onChange={e => setFirstName(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="last-name" className="form-label">Last Name :</label>
                    <input id="last-name" className="form-control" placeholder="Enter Professor's Last Name" onChange={e => setLastName(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="email" className="form-label">E-Mail :</label>
                    <input id="email" className="form-control" placeholder="Enter Professor's E-Mail" onChange={e => setEmail(e.target.value)} required/>
                </div>

                <button type="submit" className="add-btn btn btn-primary">Add Professor</button>
            </form>
        </div>
    );
}
 
export default AddProfessor;