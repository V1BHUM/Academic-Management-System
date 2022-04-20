import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import './topic_item.css';

const TopicItem = (props) => {
    const {item} = props;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    const deleteItem = () => {
        axios.post("http://localhost:3010/section/topic/item/delete", {item_id: item.item_id})
            .then(res => {
                navigate(0);
            });
    }

    return (
        <div className="topic-item">
                <p>{item.description}</p>
                {item.file_link !== null && <a target = "_blank" href={((item.file_link.substr(0,4) === "http")?"":"http://") + item.file_link}>Attachment</a>}
           
            {user.role === "professor" && <button className="btn btn-danger" onClick={deleteItem}>Delete Item</button>}
        </div>
     );
}
 
export default TopicItem;