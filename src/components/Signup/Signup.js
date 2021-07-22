import React from 'react'
import "./Signup.css";
import image from '../img/cyf.png';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const userschema = yup.object().shape({
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required("Last Name is required"),
   city: yup.string().required(),
   select: yup.string().required(),
   email: yup.string().email("Email is not valid").required(),
   password: yup.string().min(8).max(15).required(),
   confirmPassword: yup.string().oneOf([yup.ref("password"),null],'Passwords must match')
  
});


function Signup() {

   const HandelClassMenu = (value) => {
      alert(value);
    };

    const HandelRoleMenu =(value) =>{
       alert(value);
    }

    // bind usefrom and yup with yupresolver
   const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(userschema)
    });

    const onSubmit = data => {
      console.log(data); 
    }


    return (
        <div>

         <div className="Signup-container">
         <img src={image} alt="cyf-logo" />
             <form    onSubmit={handleSubmit(onSubmit)}>


            
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
                       {...register("select")} 
                       onChange={(e) => HandelClassMenu(e.target.value)}
                      >
                       <option value="">--Please choose your Class--</option>
                       <option value="class7">Class7</option>
                       <option value="class6">Class6</option>
                       <option value="class5">Class5</option>
                    </select>
               </div>

               <div className="input-box">
                  <span className="details">Role</span>
                  <select  className="role" name="role" id="role" required 
                   {...register("role")} 
                   onChange={(e) => HandelRoleMenu(e.target.value)}  
                   >
                       <option value="">--Please choose your Role--</option>
                       <option value="graduat">Graduate</option>
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
