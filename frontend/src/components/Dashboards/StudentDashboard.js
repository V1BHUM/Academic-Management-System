import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import ChangePassword from "../Update Entities/ChangePassword";
import ViewCourses from "../View Entities/ViewCourses";
import ViewProfessors from "../View Entities/ViewProfeessors";
import ViewStudentSections from "../View Entities/ViewStudentSections";

const StudentDashboard = () => {
    const {user, loading, logoutUser} = useContext(UserContext);
    const navigate = useNavigate();


    const [menu,setMenu] = useState(true);
    const [ind,setInd] = useState(sessionStorage.getItem("index"));

    return (
        <div className="student">
            <div className="header"> 
                <button  className='menu' onClick={()=>{
                    setMenu(!menu);
                }}></button>

                <h2>Hello, {loading && user.first_name} </h2> 

                <button className='logout button btn btn-primary' onClick={function(){
                    logoutUser();
                    navigate("/");
                }}>Logout</button>

            </div>

            <div className="en">
                <div className="navbar" style = {{display:(menu?"flex":"none")}}>
                    <ul className='list-group' onClick={(e)=>{
                        setInd(e.target.innerHTML);
                        sessionStorage.setItem("index",e.target.innerHTML);
                    }}>

                        <li style = {{borderLeft:(ind === "View Courses")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Courses</li>
                        <li style = {{borderLeft:(ind === "Your Sections")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Your Sections</li>
                        <li style = {{borderLeft:(ind === "View Professors")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Professors</li>
                        <li style = {{borderLeft:(ind === "Update Password")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Update Password</li>
                        
                    </ul>
                </div>

                <div className="content">
                    {(ind === "View Courses") ?
                        <ViewCourses /> : 
                        (ind === "Your Sections") ?
                        <ViewStudentSections /> 
                        :(ind === "View Professors")?
                    <   ViewProfessors /> :
                        (ind === "Update Password") ?
                        <ChangePassword /> : <p></p>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default StudentDashboard;