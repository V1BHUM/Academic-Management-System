import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SectionItem from "../List Items/SectionItem";
import './view_student.css';

const ViewStudent = () => {
    const {studentID} = useParams();

    const [studentInfo, setStudentInfo] = useState({});
    const [sections, setSections] = useState([]);

    const [studentEmail, setStudentEmail] = useState("");
    const [studentBatch, setStudentBatch] = useState("");

    useEffect(() => {
        axios.post("http://localhost:3010/student/get", {username: studentID})
            .then(res => {
                setStudentInfo(res.data[0]);

                let email = 'f' +  res.data[0].student_id.substr(0,4) + res.data[0].student_id.substr(8,4) + ((res.data[0].student_id[12] === "H") ? '@hyderabad.bits-pilani.ac.in' : ((res.data[0].student_id[12] === "G") ? '@goa.bits-pilani.ac.in' : '@pilani.bits-pilani.ac.in'));
                setStudentEmail(email); 

                let batch = res.data[0].student_id.substr(0,4);
                setStudentBatch(batch);
            });

        axios.post("http://localhost:3010/student/sections", {student_id: studentID})
            .then(res => {
                setSections(res.data);
            });
    },[studentID]);

    return ( 
        <div className="view-student">
            <h1>{studentInfo.first_name} {studentInfo.last_name}</h1>

            <div className="student-info">
                <p>First Name: {studentInfo.first_name}</p>
                <p>Last Name: {studentInfo.last_name}</p>
                <p>Student ID: {studentInfo.student_id}</p>
                <p>E-mail: {studentEmail}</p>
                <p>Batch: {studentBatch}</p>
            </div>

            <h4>Registered Sections</h4>
            
            <div className="view-student-sections">
                {sections.length > 0?sections.map(s =>{
                    return <SectionItem key={s.course_id+s.section_id} courseID={s.course_id} sectionID={s.section_id} />
                }):<p style={{margin:"auto"}}>nil</p>}
            </div>
        </div>
     );
}
 
export default ViewStudent;