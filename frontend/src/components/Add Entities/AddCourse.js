import axios from "axios";
import { useEffect } from "react";

const AddCourse = () => {
    const [courseID,setCourseID] = useState("");
    const [courseName,setCourseName] = useState("");
    const [ic,setIC] = useState();
    //Used by react select search
    var professorListOptions = [];

    useEffect(() => {
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                setIC(res.data[0].professor_id);

                res.data.map(p => {
                    const prof = {name: p.first_name + " " + p.last_name, value: p.professor_id};
                    professorListOptions.push(prof);
                });
            });
    },[]);

    const addCourse = () => {
        axios.post("http://localhost:3010/course/add",{ic: ic, course_id: courseID, course_name: courseName})
            .then(res => {

            });
    }



    return ( 
        <div className="add-course">
            
        </div>
    );
}
 
export default AddCourse;