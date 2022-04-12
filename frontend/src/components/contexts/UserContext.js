import React, { useEffect,createContext,useState } from 'react';


export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user,setUser] = useState({});
    const [auth,setAuth] = useState(false);
    const [loading,setLoading] = useState(false);

    const loginUser = function(newUser){
        setUser(newUser);setAuth(true);
        sessionStorage.setItem("user",JSON.stringify(newUser));
        sessionStorage.setItem("auth",true);
    }

    const logoutUser = function(){
        setUser({});setAuth(false);
        sessionStorage.clear();
    }

    useEffect(function(){
        setUser(JSON.parse(sessionStorage.getItem("user")));
        setAuth(sessionStorage.getItem("auth"));
        setLoading(true);
    },[]);

    return ( 
        <UserContext.Provider value = {{user:user,auth:auth,loading:loading,loginUser:loginUser,logoutUser:logoutUser}}>
        {
            props.children 
        }
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;