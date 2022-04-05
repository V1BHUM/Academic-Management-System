import axios from 'axios';
import react, { useState } from 'react';
import SelectSearch,{fuzzySearch} from 'react-select-search';
import "./login.css"

const Login = () => {
    const [Role,setRole] = useState("Student");

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [prob,setProb] = useState(false);

    const loginOptions = [
        {name:'Student',value:'Student'},
        {name:'Professor',value:'Professor'},
        {name:'Admin',value:'Admin'}
    ]

    const handleSubmit = function(r){
        r.preventDefault();
        if(Role === "Student")
            axios.post("http://localhost:3010/login/student",{username:username})
            .then(res => {
                console.log(res);
                if((res.data.length != 0) && res.data[0].password === password)
                {
                    setProb(false)
                }
                else
                    setProb(true);
            });
    }
    return ( 
        <div className = "login_main_div">
            <h1> Login </h1>
            <form className = "login_form" onSubmit = {handleSubmit}>
            <p className='warn' style = {{visibility:(prob?"visible":"hidden")}}>Username or Password incorrect</p>
            <label className='form-label' htmlFor='username'>Username</label>
            <input type = "text" id = "username" className= 'form-control' placeholder='Enter your username' required onChange={(e) => {
                setUsername(e.target.value);
            }}></input>
            <br></br>
            <label className='form-label' htmlFor='username'>Password</label>
            <input type = "passowrd" id = "password" className='form-control' placeholder='Enter your password' required onChange={(e) => {
                setPassword(e.target.value);
            }}></input>
            <br></br>

            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {Role||"Select Role"}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" onClick={function(){
                    setRole("Student")
                }}>Student</a></li>
                <li><a class="dropdown-item" onClick={function(){
                    setRole("Professor")
                }}>Professor</a></li>
                <li><a class="dropdown-item" onClick={function(){
                    setRole("Admin")
                }}>Admin</a></li>
            </ul>
            </div>
                 
            <button className='button btn btn-primary' type = 'submit'>Sign in</button>
            </form>
        </div>
     );

     function test(obj){
         console.log(obj);
     }
}
 
export default Login;