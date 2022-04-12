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

            });
    }


    return ( 
        <div className="add-student">
            <div className="temp">
                <h6>Enter Name : </h6>
                <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
            }}></input>
            </div>
            <div className="temp">
                <h6>Enter Name Name Name : </h6>
                <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
            }}></input>
            </div>
            <div className="temp">
                <h6>Enter Name : </h6>
                <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
            }}></input>
            </div>
            <div className="temp">
                <h6>EnterName Name : </h6>
                <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
            }}></input>
            </div>
            <div className="temp">
                <h6>Enter Name : </h6>
                <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
            }}></input>
            </div>
            <br/>
            <button className=' button btn btn-primary' >Logout</button>
        </div>
    );
}
 
export default AddStudent;