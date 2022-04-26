import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import SectionItem from "../List Items/SectionItem";

const ViewStudentSections = () => {
    const {user, loading} = useContext(UserContext);
    
    const [sections,setSections] = useState([]);

    useEffect(() => {
        if(loading)
        {
            axios.post("http://localhost:3010/student/sections", {student_id: user.student_id})
                .then(res => {
                    setSections(res.data);
                });
        }
    },[loading, user.student_id]);

    return ( 
        <div className="view-student-sections" style={{marginBottom:"40px"}}>
            {sections.map(s => {
                return <SectionItem key={s.course_id+s.section_id} courseID={s.course_id} sectionID={s.section_id} displayRegister={false} />
            })}
        </div>
    );
}
 
export default ViewStudentSections;