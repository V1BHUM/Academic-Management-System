import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import './add_topic_item.css';

const AddTopicItem = (props) => {
    const {toggleFunction, topicID} = props;
    const navigate = useNavigate();

    const [description,setDescription] = useState("");
    const [fileLink, setFileLink] = useState(null);

    const addTopicItem = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3010/section/topic/item/add",{topic_id: topicID, description: description, fileLink: (fileLink === null || fileLink === "") ? null : fileLink})
            .then(res => {
                toggleFunction(false);
                navigate(0);
            });
    }

    const closeForm = () => toggleFunction(false);

    return ( 
        <div className="add-topic-item">
            <form className="add-topic-item-form" onSubmit={addTopicItem}>
                <h5>Add Item</h5>

                <div className="input-field">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" placeholder="Enter Description" onChange={e => setDescription(e.target.value)} required />
                </div>

                <div className="input-field">
                    <label htmlFor="fileLink" className="form-label">File Link</label>
                    <input id="fileLink" className="form-control" placeholder="Enter link of attachment" onChange={e => setFileLink(e.target.value)} />
                </div>

                <button className="btn btn-primary" style = {{marginLeft:"20px",marginTop:"20px"}} onClick={addTopicItem}>Add</button>
                <button className="btn btn-danger" style = {{marginLeft:"20px",marginTop:"20px"}}onClick={closeForm}>Close</button>
            </form>
        </div>
     );
}
 
export default AddTopicItem;