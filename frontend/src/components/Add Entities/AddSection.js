import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { UserContext } from "../contexts/UserContext";
import './add_section.css';

const AddSection = () => {
    const navigate = useNavigate();
    const {courseID} = useParams();
    const {user} = useContext(UserContext);

    const [isRoot, setRoot] = useState(false);
    const [type,setType] = useState("L");
    const [number,setNumber] = useState(1);
    const [profList,setProfList] = useState([]);

    const [professorListOptions,setProfessorOptions] = useState([]);

    const typeOptions = [
        {name:'L', value: 'L'},
        {name:'P', value: 'P'},
        {name:'T', value: 'T'}
    ]

    useEffect(() => {
        var tempList = [];
        axios.get("http://localhost:3010/professor/all")
            .then(res => {
                res.data.map(p => {
                    const tempProf = {name: p.first_name + " " + p.last_name, value: p.professor_id};
                    tempList.push(tempProf);

                    return 0;
                });
                setProfessorOptions(tempList);
            });
    },[])

    const addSection = (e) => {
        e.preventDefault();

        var sectionID = "";
        if(isRoot)
        {
            sectionID = "L";
            axios.post("http://localhost:3010/course/section/add",{section_id: sectionID, course_id: courseID, profList: [user.professor_id]})
            .then(res => {
                navigate(-1);
            });
        }
        else
        {
            sectionID = type + number;

            axios.post("http://localhost:3010/course/section/add",{section_id: sectionID, course_id: courseID, profList: profList})
            .then(res => {
                // alert("New Section Added");
                navigate(-1);
            });
        }

        
    }


    return ( 
        <div className="add-section" onSubmit={addSection}>
            <form className="add-section-form">
                <h2>New Section Form</h2>
                <div className="form-check">
                    <div className="input-field">
                    <input id="is-root" className="form-check-input" type={"checkbox"} onChange={e => setRoot(e.target.checked)}/>
                    <label htmlFor="is-root" className="form-check-label">Root Section</label>
                    </div>
                </div>

                {!isRoot &&
                    <div className="additional-options">
                        <div className="input-field">

                                <label htmlFor="section-type">Section Type :   </label>
                                <SelectSearch options={typeOptions} id='section-type' value={type} onChange={selectedValue => setType(selectedValue)} /> 

                        </div>

                        <div className="input-field">
                            <label htmlFor="number" className="form-label">Section Number :</label>
                            <input id="number" type = "text" className="form-control" placeholder="Enter Section's Number" onChange={e => setNumber(e.target.value)} />
                        </div>

                        <div className="input-field">

                                <label htmlFor="professor-list">Select Professors :   </label>
                                <SelectSearch options={professorListOptions} id='professor-list' search filterOptions={fuzzySearch} closeOnSelect={false} placeholder="Select the Professors"  multiple="true" printOptions="on-focus" value={profList} onChange={selectedValue => setProfList(selectedValue)} /> 

                        </div>
                    </div>
                }

                <button type='submit' className="btn btn-primary">Add Section</button>

            </form>
        </div>
     );
}
 
export default AddSection;