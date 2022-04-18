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

                    <li style = {{borderRight:(ind === "View Students")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Students</li>
                    <li style = {{borderRight:(ind === "View Courses")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Courses</li>
                    <li style = {{borderRight:(ind === "View Professors")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Professors</li>
                    <li style = {{borderRight:(ind === "Add Students")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>Add Students</li>
                    <li style = {{borderRight:(ind === "Add Professors")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>Add Professors</li>
                    <li style = {{borderRight:(ind === "Add Course")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>Add Course</li>
                    
                </ul>
            </div>

            <div className="content">
                {(ind === "View Students")?
                    <ViewStudents></ViewStudents>
                :(ind === "View Courses")?
                    <ViewCourses />
                :(ind === "View Professors")?
                    <ViewProfessors /> 
                :(ind === "Add Students")?
                <AddStudent />
                :(ind === "Add Professors")?
                <AddProfessor />
                :(ind === "Add Course")?
                <AddCourse /> : <p></p>
                }
            </div>
        </div>

    </div> 
    );
}
 
export default AdminDash;