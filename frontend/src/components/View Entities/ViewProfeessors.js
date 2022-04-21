import axios from "axios";
import { useEffect, useState } from "react";
import ProfessorItem from "../List Items/ProfessorsItem";

const ViewProfessors = () => {

    const [professors,setProfessors] = useState([]);
    const [displayProfessors,setDisplayProfessors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                setProfessors(res.data);
                setDisplayProfessors(res.data);
            });
    },[]);

    const searchProfessors = (e) => {
        e.preventDefault();

        let temp = [];
        let value = e.target.value.toLowerCase();
        professors.map(s => {
            if((s.first_name.toString().toLowerCase()).includes(value) || (s.last_name.toString().toLowerCase()).includes(value) || (s.professor_id.toString().toLowerCase()).includes(value))
            {
                temp.push(s);
            }
            return 0;
        });

        setDisplayProfessors(temp);
    }
    
    return ( 
        <div className="professors">
            <div className="search-field" style={{margin:"30px auto 50px auto", width:"30%"}}>
                <input className="form-control" placeholder="Search Professors" onChange={searchProfessors} />
            </div>

            {displayProfessors.map(p => {
                return <ProfessorItem key={p.professor_id} professor={p} />;
            })}
        </div>
     );
}
 
export default ViewProfessors;