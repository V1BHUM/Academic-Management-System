import axios from "axios";
import { useEffect,useState } from "react";
import StudentItem from "./student_item";


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
                return <StudentItem user = {s}></StudentItem>
            })}
        </div>
     );
}
 
export default ViewStudents;