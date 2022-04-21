import axios from "axios";
import { useEffect,useState } from "react";
import StudentItem from "../List Items/student_item";


const ViewStudents = () => {
    const [students,setStudents] = useState([]);
    const [displayStudents,setDisplayStudents] = useState([]);

    useEffect(function(){
        axios.get("http://localhost:3010/student/all").then((res) =>{
            setStudents(res.data);
            setDisplayStudents(res.data);
        });
    },[]);

    const searchStudents = (e) => {
        e.preventDefault();

        let temp = [];
        let value = e.target.value.toLowerCase();
        students.map(s => {
            if((s.first_name.toString().toLowerCase()).includes(value) || (s.last_name.toString().toLowerCase()).includes(value) || (s.student_id.toString().toLowerCase()).includes(value))
            {
                temp.push(s);
            }
            return 0;
        });

        setDisplayStudents(temp);
    }


    return ( 
        <div className="students">
            <div className="search-field" style={{margin:"30px auto 50px auto", width:"30%"}}>
                <input className="form-control" placeholder="Search Students" onChange={searchStudents} />
            </div>

            {displayStudents.map((s) => {
                return <StudentItem key={s.student_id} user = {s}></StudentItem>
            })}
        </div>
     );
}
 
export default ViewStudents;