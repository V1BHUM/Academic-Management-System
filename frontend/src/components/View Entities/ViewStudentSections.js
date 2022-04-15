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
    },[loading]);

    return ( 
        <div className="view-student-sections">
            {sections.map(s => {
                return <SectionItem courseID={s.course_id} sectionID={s.section_id} />
            })}
        </div>
    );
}
 
export default ViewStudentSections;