import axios from "axios";
import { useEffect, useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import '../Misc/SelectSearch.css';
import './add_course.css'

const AddCourse = () => {
    const [courseID,setCourseID] = useState("");
    const [courseName,setCourseName] = useState("");
    const [ic,setIC] = useState();
    //Used by react select search
    const [selectSearchOptions, setOptions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                setIC(res.data[0].professor_id);
                var professorListOptions = [];

                res.data.map(p => {
                    const prof = {name: p.first_name + " " + p.last_name, value: p.professor_id};
                    professorListOptions.push(prof);

                    return 0;
                });

                setOptions(professorListOptions);
            });
    },[]);

    const addCourse = () => {
        axios.post("http://localhost:3010/course/add",{ic: ic, course_id: courseID, course_name: courseName})
            .then(res => {
                alert("New Course Added!!!");
            });
    }



    return ( 
        <div className="add-course">
            <form className="add-course-form" onSubmit={addCourse}>
                <h3>New Course Form</h3>

                <div className="input-field">
                    <label htmlFor="course-id" className="form-label">Course ID :</label>
                    <input id="course-id" className="form-control" placeholder="Enter Course ID" onChange={e => setCourseID(e.target.value)} required/>
                </div>

                <div className="input-field">
                    <label htmlFor="course-name" className="form-label">Course Name :</label>
                    <input id="course-name" className="form-control" placeholder="Enter Course Name" onChange={e => setCourseName(e.target.value)} required/>
                </div>

                <div className="ic input-field"><label>Instructor In Charge (IC) : </label><SelectSearch options={selectSearchOptions} search filterOptions={fuzzySearch} value={ic} onChange={selectedValue => setIC(selectedValue)} />
                </div>
                <button type="submit" className="add-btn btn btn-primary">Add Course</button>
            </form>
        </div>
    );
}
 
export default AddCourse;