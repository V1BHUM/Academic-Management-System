import axios from "axios";
import { useEffect, useState } from "react";
import ProfessorItem from "../List Items/ProfessorsItem";

const ViewProfessors = () => {

    const [professors,setProfessors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                setProfessors(res.data);
            });
    });
    
    return ( 
        <div className="professors">
            {professors.map(p => {
                return <ProfessorItem key={p.professor_id} professor={p} />;
            })}
        </div>
     );
}
 
export default ViewProfessors;