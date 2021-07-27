import React, {useState,useEffect} from 'react'
import {toast} from "react-toastify";
import './dashboard.css';
const Dashboard = ({setAuth}) =>{
    const [name, setName] = useState("");

    async function getName() {
        try{
         const response = await fetch("http://localhost:5000/dashboard/",{
             method: "GET",
             headers : {token : localStorage.token }
         });
         
         const parseRes = await response.json();
        // console.log("this is some id",parseRes);
         setName(parseRes.first_name);
        }catch(err){
            console.error(err.message)
        }
     }



const logout = (e) =>{
e.preventDefault()
localStorage.removeItem("token");
setAuth(false);
toast.success("Logged out successfully");
}

useEffect( () =>{
    getName();
},[]);

    return (
        <div>
            <h1>Dashboard  </h1>
            <h2>Welcome {name}</h2>
         
            <button onClick={e =>logout(e)} className="btn-logout">Logout</button>
            
        </div>
    )
}

export default Dashboard
