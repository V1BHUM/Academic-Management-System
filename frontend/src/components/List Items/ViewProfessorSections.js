import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import SectionItem from "./SectionItem";

const ViewProfessorSections = () => {
    const {user,loading} = useContext(UserContext);

    const [sections,setSections] = useState([]);

    useEffect(() => {
        if(loading)
        {
            axios.post("http://localhost:3010/professor/sections",{professor_id: user.professor_id})
                .then(res => {
                    setSections(res.data);
                });
        }
    },[loading]);

    return ( 
        <div className="view-professor-sections">
            {sections.map(s => {
                return <SectionItem courseID={s.course_id} sectionID={s.section_id} />
            })}
        </div>
    );
}
 
export default ViewProfessorSections;