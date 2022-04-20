import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddTopicItem from "../Add Entities/AddTopicItem";
import { UserContext } from "../contexts/UserContext";
import TopicItem from "./TopicItem";
import './topic.css';

const Topic = (props) => {
    const {topicID} = props;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [topicInfo, setTopicInfo] = useState({});
    const [items,setItems] = useState([]);

    const [showItemForm,setShowItemForm] = useState(false);

    useEffect(() => {
        
        axios.post("http://localhost:3010/section/topicInfo", {topic_id: topicID})
            .then(res => {
                setTopicInfo(res.data);
                console.log(res.data);
            });

        axios.post("http://localhost:3010/section/topics/item", {topic_id: topicID})
            .then(res => {
                setItems(res.data);
            });
    },[topicID]);

    const deleteTopic = () => {
        axios.post("http://localhost:3010/section/topic/delete", {topic_id: topicID})
            .then(res => {
                navigate(0);
            });
    }

    return ( 
        <div className={(topicInfo.type) ?"topic-announcement topic" : "topic" }>
            <div className="topic-heading">
                <h4>{topicInfo.heading} </h4>
                {!showItemForm&&user.role === "professor" && <button className="btn btn-danger" onClick={deleteTopic}>Delete Topic</button>}
                {user.role === "professor" && !showItemForm && <button className="btn btn-primary" onClick={_ => setShowItemForm(true)}>Add Item</button>}
                {showItemForm && <AddTopicItem toggleFunction={setShowItemForm} topicID={topicInfo.topic_id} />}
            </div>
            <div className="topic-items">
                {items.map(i => {
                    return(
                        <TopicItem key={i.item_id} item={i} />
                    );
                })}
            </div>
            
        </div>
     );
}
 
export default Topic;