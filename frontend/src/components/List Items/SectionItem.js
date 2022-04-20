import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import './section_item.css';

const SectionItem = (props) => {
    const {courseID, sectionID} = props;
    const displayRegister = (props.displayRegister !== undefined) ? props.displayRegister : true;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [professors,setProfessors] = useState([]);
    const [courseInfo,setCourseInfo] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3010/section/item", {section_id: sectionID, course_id: courseID})
            .then(res => {
                setProfessors(res.data.profList);
                setCourseInfo(res.data.courseInfo);
            });
    },[]);

    const deleteSection = () => {
        axios.post("http://localhost:3010/section/delete", {section_id: sectionID, course_id: courseID})
            .then(res => {
                navigate(0);
            });
    }

    const registerSection = () => {
        axios.post("http://localhost:3010/student/registerSection", {section_id: sectionID, student_id: user.student_id, course_id: courseID})
            .then(res => {
                navigate(-1);
            });
    }

    const unerolSection = () => {
        axios.post("http://localhost:3010/student/section/unenrol", {student_id: user.student_id, section_id: sectionID, course_id: courseID})
            .then(res => {
                navigate(0);
            });
    }

    return ( 
        <div className='section-item'>
            <div className="section-info">
                <h3>{courseInfo.course_id} {courseInfo.course_name} {sectionID}</h3>
                <h5>Professors:</h5>
                <div className="section-prof-list">
                    {professors.map(p => {
                        return <p key={p.professor_id}>{p.first_name} {p.last_name}</p>
                    })}
                </div>
            </div>
            <div className="section-btns">
                <button className="btn btn-primary" onClick={() => navigate("/course/" + courseID + "/" + sectionID)}>View</button>
                <button className="btn btn-primary" style = {{visibility:(user.professor_id === courseInfo.ic?"visible":"hidden")}}onClick={deleteSection}>Delete</button>
                {displayRegister && user.role === "student" && <button className="btn btn-primary" onClick={registerSection} >Enrol</button>}
                {!displayRegister && user.role === "student" && <button className="btn btn-danger" onClick={unerolSection}>Unenrol</button>}
            </div>

        </div>
    );
}
 
export default SectionItem;