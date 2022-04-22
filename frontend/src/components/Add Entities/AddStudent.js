import axios from "axios";
import { useState } from "react";

import './add_student.css';

const AddStudent = () => {
    const [studentID,setStudentID] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");

    const addStudent = () => {
        axios.post("http://localhost:3010/student/add",{student_id: studentID, first_name: firstName, last_name: lastName, password: password })
            .then(res => {
                alert("New Student Added");
            });
    }


    return ( 
        <div className="add-student">
            <form className="add-student-form" onSubmit={addStudent}>
                <h3>New Student Form</h3>

                <div className="input-field">
                    <label htmlFor="student-id" className="form-label">Student ID :</label>
                    <input id="student-id" className="form-control" placeholder="Enter Student ID" onChange={e => setStudentID(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input id="password" className="form-control" placeholder="Enter Student Password" onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="first-name" className="form-label">First Name :</label>
                    <input id="first-name" className="form-control" placeholder="Enter Student's First Name" onChange={e => setFirstName(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="last-name" className="form-label">Last Name :</label>
                    <input id="last-name" className="form-control" placeholder="Enter Student's Last Name" onChange={e => setLastName(e.target.value)} required/>
                </div>

                <button type="submit" className="add-btn btn btn-primary">Add Student</button>
            </form>
        </div>
    );
}
 
export default AddStudent;