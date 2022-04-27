import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AddMobileNumber from "../Add Entities/AddMobileNumber";
import { UserContext } from "../contexts/UserContext";
import ViewProfessorSections from "../List Items/ViewProfessorSections";
import ChangePassword from "../Update Entities/ChangePassword";
import ViewICCourses from "../View Entities/ViewICCourses";
import ViewStudents from "../View Entities/view_students";
import './admin_dash.css';

const ProfessorDashboard = () => {
    const navigate = useNavigate();
    const {user, loading, logoutUser} = useContext(UserContext);

    const [menu,setMenu] = useState(true);
    const [ind,setInd] = useState(sessionStorage.getItem("index"));

    return ( 
        <div className="professor">
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

                        <li style = {{borderLeft:(ind === "IC Courses")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>IC Courses</li>
                        <li style = {{borderLeft:(ind === "Your Sections")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Your Sections</li>
                        <li style = {{borderLeft:(ind === "View Students")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Students</li>
                        <li style = {{borderLeft:(ind === "Update Password")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Update Password</li>
                        <li style = {{borderLeft:(ind === "Add Mobile Number")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Add Mobile Number</li>
                        
                    </ul>
                </div>

                <div className="content">
                    {(ind === "View Students")?
                    <ViewStudents></ViewStudents>
                :(ind === "IC Courses")? 
                        <ViewICCourses /> : 
                        (ind === "Your Sections") ? 
                        <ViewProfessorSections /> :
                        (ind === "Update Password") ?
                        <ChangePassword /> :
                        (ind === "Add Mobile Number") ?
                        <AddMobileNumber /> : <p></p>
                    }
                </div>
            </div>

        </div>

        
     );
}
 
export default ProfessorDashboard;