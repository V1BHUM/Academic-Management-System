import axios from "axios";
import { useEffect, useState } from "react";
import ProfessorItem from "../List Items/ProfessorsItem";

const ViewProfessors = () => {

    const [professors,setProfessors] = useState([]);
    const [displayProfessors,setDisplayProfessors] = useState([]);

    const [query,setQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                setProfessors(res.data);
                setDisplayProfessors(res.data);
            });
    },[]);

    // const searchProfessors = (e) => {
    //     e.preventDefault();

    //     let temp = [];
    //     let value = e.target.value.toLowerCase();
    //     professors.map(s => {
    //         if((s.first_name.toString().toLowerCase()).includes(value) || (s.last_name.toString().toLowerCase()).includes(value) || (s.professor_id.toString().toLowerCase()).includes(value))
    //         {
    //             temp.push(s);
    //         }
    //         return 0;
    //     });

    //     setDisplayProfessors(temp);
    // }
    
    const searchProfessors = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3010/professor/search", {query: '%' + query + '%'})
            .then(res => {
                setDisplayProfessors(res.data);
            });
    }

    return ( 
        <div className="professors" style={{marginBottom:"40px"}}>
            <div className="search-field" style={{margin:"30px auto 50px auto", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <input className="form-control" style={{width: "30%", marginRight:"30px"}} placeholder="Search Students" onChange={e => setQuery(e.target.value)}/>
                <button className="btn btn-primary" onClick={searchProfessors}>Search</button>
            </div>

            {displayProfessors.map(p => {
                return <ProfessorItem key={p.professor_id} professor={p} />;
            })}
        </div>
     );
}
 
export default ViewProfessors;