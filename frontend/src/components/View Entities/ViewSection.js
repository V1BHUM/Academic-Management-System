import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router";
import AddTopic from "../Add Entities/AddTopic";
import { UserContext } from "../contexts/UserContext";
import Topic from "../List Items/Topic";

const ViewSection = () => {
    const {courseID, sectionID} = useParams();
    const{user} = useContext(UserContext);

    const [sectionInfo, setSectionInfo] = useState({loading:true});
    const [topics,setTopics] = useState([]);

    const [showTopicForm,setShowTopicForm] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:3010/section/allInfo",{course_id: courseID, section_id: sectionID})
            .then(res => {
                console.log(res);
                setSectionInfo(res.data);
            });

            axios.post("http://localhost:3010/section/topics", {course_id: courseID, section_id: sectionID})
                .then(res => {
                    setTopics(res.data);
                });
    },[courseID,sectionID]);

    return ( 
        <div className="section">
            <div className="section-info">
                <h2>{sectionInfo.courseName} {sectionID}</h2>
                <h3>Professors:</h3>
                {!sectionInfo.loading && sectionInfo.profList.map(p => <p key={p.professor_id}>{p.first_name} {p.last_name}</p>)}
            </div>
            
            <div className="section-topics">
                <h3>Topics:</h3>
                {topics.map(t => {
                    return <Topic key={t.topic_id} topicID={t.topic_id} />
                })}
                {user.role !== "student" && !showTopicForm && <button className="btn btn-primary" onClick={_ => setShowTopicForm(true)}>Add Topic</button>}
                {showTopicForm && <AddTopic toggleFunction={setShowTopicForm} />}
            </div>
        </div>
    );
}
 
export default ViewSection;