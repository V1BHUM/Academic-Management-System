import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import "./admin_dash.css"
import { UserContext } from '../contexts/UserContext';
import ViewStudents from '../View Entities/view_students';
import ViewCourses from '../View Entities/ViewCourses';
import ViewProfessors from '../View Entities/ViewProfeessors';
import AddStudent from '../Add Entities/AddStudent';
import AddProfessor from '../Add Entities/AddProfessor';
import AddCourse from '../Add Entities/AddCourse';
import ChangePassword from '../Update Entities/ChangePassword';


const AdminDash = () => {
    const [ind,setInd] = useState(sessionStorage.getItem("index"));
    const navigate = useNavigate();
    const {user,logoutUser, loading} = useContext(UserContext);
    const [menu,setMenu] = useState(true);

    return ( 
    <div className="admin">
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

                    <li style = {{borderLeft:(ind === "View Students")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Students</li>
                    <li style = {{borderLeft:(ind === "View Professors")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Professors</li>
                    <li style = {{borderLeft:(ind === "View Courses")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>View Courses</li>
                    <li style = {{borderLeft:(ind === "Add Students")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Add Students</li>
                    <li style = {{borderLeft:(ind === "Add Professors")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Add Professors</li>
                    <li style = {{borderLeft:(ind === "Add Courses")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Add Courses</li>
                    <li style = {{borderLeft:(ind === "Update Password")?"5px solid rgba(255,255,255,0.9)":"5px solid rgba(0,0,0,0)"}}>Update Password</li>
                    
                </ul>
            </div>

            <div className="content">
                {(ind === "View Students")?
                    <ViewStudents></ViewStudents>
                :(ind === "View Professors")?
                <ViewProfessors />
                : (ind === "View Courses")?
                <ViewCourses />
                :(ind === "Add Students")?
                <AddStudent />
                :(ind === "Add Professors")?
                <AddProfessor />
                :(ind === "Add Courses")?
                <AddCourse />
                :(ind === "Update Password")?
                <ChangePassword /> : <p></p>
                }
            </div>
        </div>

    </div> 
    );
}
 
export default AdminDash;