import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import './change_password.css';

const ChangePassword = () => {
    const {user} = useContext(UserContext);

    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        if(user.role === "student")
        {
            axios.post("http://localhost:3010/student/updatePassword", {student_id: user.student_id, newPassword: newPassword})
                .then(res => {
                    alert("Password Changed Succesfully!!!");
                });
        }
        else if(user.role === "professor")
        {
            axios.post("http://localhost:3010/professor/updatePassword", {professor_id: user.professor_id, newPassword: newPassword})
                .then(res => {
                    alert("Password Changed Succesfully!!!");
                });
        }
        else
        {
            axios.post("http://localhost:3010/admin/updatePassword", {username: useReducer.username, newPassword: newPassword})
                .then(res => {

                });
        }
    }

    return ( 
        <div className="change-password">
            <form className="change-password-form" onSubmit={changePassword}>
                <h3>Update Password Form</h3>

                <div className="input-field">
                    <label htmlFor="new-password" className="form-label">New Password :</label>
                    <input id="new-password" className="form-control" placeholder="Enter new password" onChange={e => setNewPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
 
export default ChangePassword;