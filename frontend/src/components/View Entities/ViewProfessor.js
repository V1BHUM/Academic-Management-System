import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CourseItem from "../List Items/CourseItem";
import SectionItem from "../List Items/SectionItem";
import './view_professor.css';

const ViewProfessor = () => {
    const {professorID} = useParams();

    const [professorInfo,setProfessorInfo] = useState({});
    const [icCourses,setICCourses] = useState([]);
    const [sections,setSections] = useState([]);
    const [professorMobile,setProfessorMobile] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3010/professor/get", {username: professorID})
            .then(res => {
                setProfessorInfo(res.data[0]);
            });

        axios.post("http://localhost:3010/course/ic", {ic: professorID})
            .then(res => {
                setICCourses(res.data);
            });

        axios.post("http://localhost:3010/professor/sections", {professor_id: professorID})
            .then(res => {
                setSections(res.data);
            });

        axios.post("http://localhost:3010/professor/mobile", {professor_id: professorID})
            .then(res => {
                setProfessorMobile(res.data);
            });
    },[]);

    return ( 
        <div className="view-professor">
            <h1>{professorInfo.first_name} {professorInfo.last_name}</h1>

                <p>First Name: {professorInfo.first_name}</p>
                <p>Last Name: {professorInfo.last_name}</p>
                <p>Professor ID: {professorInfo.professor_id}</p>

            <div className="phoneno">

            <h4> Phone no. </h4>
            <ol>
                {professorMobile.map((pm) => {
                    return <li> {pm.mob_no}</li>
                })}
            </ol>
        </div>

            <h4 className="labels">IC Courses</h4>

                {icCourses.map(c => {
                    return <CourseItem key={c.course_id} course={c} />
                })}

            <h4 className="labels">Teaching Sections</h4>

                {sections.length > 0 ? sections.map(s =>{
                    return <SectionItem key={s.course_id+s.section_id} courseID={s.course_id} sectionID={s.section_id} />
                }):<p style={{margin:"auto"}}>nil</p>}
        
        </div>
     );
}
 
export default ViewProfessor;