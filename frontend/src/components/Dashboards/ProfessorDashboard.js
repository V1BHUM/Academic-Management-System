import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import ViewICCourses from "../View Entities/ViewICCourses";

const ProfessorDashboard = () => {
    const navigate = useNavigate();
    const {user, loading, logoutUser} = useContext(UserContext);

    const [menu,setMenu] = useState(true);
    const [ind,setInd] = useState("");

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

                        <li style = {{borderRight:(ind === "View Students")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>IC Courses</li>
                        
                    </ul>
                </div>

                <div className="content">
                    {(ind === "IC Courses")? 
                        <ViewICCourses /> : <p></p>
                    }
                </div>
            </div>

        </div>

        
     );
}
 
export default ProfessorDashboard;