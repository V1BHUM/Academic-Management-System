import axios from "axios";
import { useEffect,useState } from "react";
import StudentItem from "../List Items/student_item";


const ViewStudents = () => {
    const [students,setStudents] = useState([]);
    useEffect(function(){
        axios.get("http://localhost:3010/student/all").then((res) =>{
            setStudents(res.data);
        });
    },[]);
    return ( 
        <div className="students">
            {students.map((s) => {
                return <StudentItem key={s.student_id} user = {s}></StudentItem>
            })}
        </div>
     );
}
 
export default ViewStudents;