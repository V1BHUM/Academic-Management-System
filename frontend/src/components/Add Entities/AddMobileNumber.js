import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import './add_mobile_number.css';

const AddMobileNumber = () => {
    const {user} = useContext(UserContext);

    const [mobileNumber,setMobileNumber] = useState("");

    const addMobileNumber = () => {
        axios.post("http://localhost:3010/professor/mobile/add", {professor_id: user.professor_id, mobile_number: mobileNumber})
            .then(res => {
                // alert("New Mobile Number Added");
            })
    }

    return ( 
        <div className="add-mobile-number">
            <h3>Add Mobile Number</h3>

            <form className="add-mobile-number-form" onSubmit={addMobileNumber}>
                <div className="input-field">
                    <label htmlFor="mobile-number" className="form-label">Mobile Number :</label>
                    <input id="mobile-number" className="form-control" placeholder="Enter Mobile Number" onChange={e => setMobileNumber(e.target.value)} required/>
                </div>

                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
     );
}
 
export default AddMobileNumber;