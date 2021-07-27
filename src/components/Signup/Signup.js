import React,{ useState } from 'react'
import "./Signup.css";
import image from '../img/cyf.png';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {toast} from "react-toastify";


const userschema = yup.object().shape({
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required("Last Name is required"),
   city: yup.string().required(),
   classCode: yup.string().required(),
   email: yup.string().email("Email is not valid").required(),
   password: yup.string().min(8).max(15).required(),
   confirmPassword: yup.string().oneOf([yup.ref("password"),null],'Passwords must match')
  
});


const  Signup = ({setAuth})=> {
    const [role, setRole] = useState("");
   const [status, setStatus] = useState(true);
  

   const handelClassMenu = (value) => {
      console.log(value);
    };

   

    const handleRoleMenu = (value) => {
       value === "graduate" ? setStatus(false) : setStatus(true)
       setRole(value);
      console.log(status);
  }

    // bind usefrom and yup with yupresolver
   const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(userschema)
    });

    const onSubmitForm =  async (data) => {
      console.log(data)
      try{
         //const body = {data} 

        const response = await fetch(`http://localhost:5000/auth/register`, {
           method: "POST",
           headers : {"Content-Type": "application/json" },
           body: JSON.stringify(data)
        });

        const parseRes = await response.json();
        if(parseRes.token){
            localStorage.setItem("token", parseRes.token)
            setAuth(true);
            toast.success("You Are Registerd Successfully")
        }else{
           setAuth(false);
           toast.error(parseRes)
        }
        
        //console.log("test",parseRes);
        
      }catch(err){
         console.error(err.message);
      }
         
    }





    return (
        <div>

         <div className="Signup-container">
         <img src={image} alt="cyf-logo" />
             <form    onSubmit={handleSubmit(onSubmitForm)}>


            
           <div className="user-details">
              
               <div className="input-box">
                  <span className="details">First Name</span>
                  <input type="text"   {...register("firstName")} />
                  
                     <p>{errors.firstName?.message}</p>
                        
               </div>
               
               <div className="input-box">
                  <span className="details">Last Name</span>
                  <input type="text"   {...register("lastName")} />
                   
                     <p>{errors.lastName?.message}</p>
               </div>

               <div className="input-box">
                  <span className="details">Class</span>
                    
                    <select className="role"  name="studentClass" id="studentClass" required
                       {...register("classCode")} 
                       onChange={(e) => handelClassMenu(e.target.value)} disabled={status}
                      >
                       <option value="">--Please choose your Class--</option>
                           <option value="WMS01">WMS01</option>
                           <option value="WMS02">WMS02</option>
                           <option value="LDN06">LDN06</option>
                           <option value="LDN07">LDN07</option>
                    </select>
               </div>

               <div className="input-box">
                  <span className="details">Role</span>
                  <select  className="role" name="role" id="role" required 
                   {...register("role")} 
                   onChange={(e) => handleRoleMenu(e.target.value)}  
                   >
                       <option value="">--Please choose your Role--</option>
                       <option value="graduate">Graduate</option>
                       <option value="mentor">Mentor</option>
                    
                    </select>
                    
               </div>

               <div className="input-box">
                  <span className="details">City</span>
                  <input type="text"   {...register("city")} />
                  
                     <p>{errors.city?.message}</p>
               </div>

               <div className="input-box">
                  <span className="details">Email</span>
                  <input type="email"   {...register("email")} />
               
                     <p>{errors.email?.message}</p>
               </div>

               <div className="input-box">
                  <span className="details">Password</span>
                  <input type="password"    {...register("password")} />
                     
                     <p>{errors.password?.message}</p>
               </div>

               <div className="input-box">
                  <span className="details">Confirm Password</span>
                     
                     <input type="password"   {...register("confirmPassword")} />
                     <p>{errors.confirmPassword?.message}</p>
               </div>
            
           </div>
           <div className="btn-holder">
              <button className="btn-signup">Sign up</button>
           </div>
          </form>
         </div>

         


        </div>
    )
}

export default Signup
