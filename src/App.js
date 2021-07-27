import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import{
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
   } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import  React, {useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
   
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const setAuth = (boolean) =>{
     setIsAuthenticated(boolean);
  }
 
 const isAuth = async () =>{
   try{

     const response = await fetch("http://localhost:5000/auth/is-verify",{
       method: "GET",
       headers : {token : localStorage.token }
     });


      const parseRes = await response.json();
       parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
   }catch(err){
     console.error(err.message);
   }
 }

  useEffect(() =>{
     isAuth()
  },[])

   return (
    <div className="App">
      <header className="App-header">
<Router>
  <Switch>
    <Route exact path="/login"      render={props => !isAuthenticated ? 
       <Login  {...props}  setAuth={setAuth}  />
       : 
        <Redirect to="/dashboard"/> 
       
       }/>

   <Route exact path="/signup"      render={props => !isAuthenticated ? 
        <Signup {...props} setAuth={setAuth} />
         : 
          <Redirect to="/login"/> 
        
       }/>


<Route exact path="/dashboard"      render={props => isAuthenticated ? 
        <Dashboard {...props} setAuth={setAuth} />
         : 
          <Redirect to="/login"/> 
        
       }/>
    
    
  
  </Switch>
</Router>
       
       {/* <Login/> */}
       
       
      </header>
    </div>
  );
}

export default App;
