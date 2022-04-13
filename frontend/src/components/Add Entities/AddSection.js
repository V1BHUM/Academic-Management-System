import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import SelectSearch from "react-select-search";
import './add_section.css';

const AddSection = () => {
    const navigate = useNavigate();
    const {courseID} = useParams();

    const [isRoot, setRoot] = useState(false);
    const [type,setType] = useState("L");
    const [number,setNumber] = useState(1);

    const typeOptions = [
        {name:'L', value: 'L'},
        {name:'P', value: 'P'},
        {name:'T', value: 'T'}
    ]

    const addSection = (e) => {
        e.preventDefault();

        var sectionID = "";
        if(isRoot)
        {
            sectionID = "L";
        }
        else
        {
            sectionID = type + number;
        }

        axios.post("http://localhost:3010/course/section/add",{section_id: sectionID, course_id: courseID})
            .then(res => {
                navigate(-1);
            });
    }


    return ( 
        <div className="add-section" onSubmit={addSection}>
            <form className="add-section-form">
                <h3>New Section Form</h3>
                <div className="form-check">
                    <input id="is-root" className="form-check-input" type={"checkbox"} onChange={e => setRoot(e.target.checked)}/>
                    <label htmlFor="is-root" className="form-check-label">Root Section</label>
                </div>

                {!isRoot &&
                    <div className="additional-options">
                        <div className="input-dropdown">
                            <div>
                                <label htmlFor="section-type">Section Type :</label>
                                <SelectSearch options={typeOptions} id='section-type' value={type} onChange={selectedValue => setType(selectedValue)} /> 
                            </div>
                        </div>

                        <div className="input-field">
                            <label htmlFor="number" className="form-label">Section Number :</label>
                            <input id="number" className="form-control" placeholder="Enter Section's Number" onChange={e => setNumber(e.target.value)} />
                        </div>
                    </div>
                }

                <button type='submit' className="btn btn-primary">Add Section</button>

            </form>
        </div>
     );
}
 
export default AddSection;