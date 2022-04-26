import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import SelectSearch, { fuzzySearch } from "react-select-search";
import './add_topic.css';

const AddTopic = (props) => {
    const navigate = useNavigate();
    const {courseID,sectionID} = useParams();
    const {toggleFunction} = props;

    const [type,setType] = useState(0);
    const [heading,setHeading] = useState("");

    const typeOptions = [
        {name: "Announcement", value: 1},
        {name: "Standard", value: 0},
    ]
    
    const addTopic = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3010/section/topic/add", {type: type, heading: heading, section_id: sectionID, course_id: courseID})
            .then(res => {
                toggleFunction(false);
                navigate(0);
            });
    }

    const closeForm = () => {
        toggleFunction(false);
    }

    return ( 
        <div className="add-topic">
            <form className="add-topic-form" onSubmit={addTopic}>
                <h5>Add Topic</h5>

                <div className="input-dropdown">

                    <label htmlFor="topic-type">Section Type</label>
                    <SelectSearch options={typeOptions} value={type} onChange={setType} />
                </div>

                <div className="input-field">
                    <label htmlFor="heading" className="form-label">Heading</label>
                    <input id="heading" className="form-control" onChange={e => setHeading(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" className="btn btn-danger" style={{marginLeft:"20px"}} onClick={closeForm}>Close</button>
            </form>

            
        </div>
    );
}
 
export default AddTopic;