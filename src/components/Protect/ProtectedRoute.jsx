// import { useNavigate } from "react-router-dom"
// // import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import mainUrl from "../api/configApi";

// const ProtectedRoute = ({children}) => {
// const navigate = useNavigate()
// const checkUser = async()=>{

  
//     const response = await axios.post(
//       `${mainUrl}adminlogin`)
    

//     if (!response.data.message === "OK") {
//       return navigate('/')
     
//     } else {
      
//       console.error("Not a Valid User");
//     }

   
  
// }
// checkUser()

//   return children
// }

// export default ProtectedRoute
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mainUrl from '../../api/configApi';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const checkUser = async () => {
    
      const response = await axios.post(`${mainUrl}adminlogin`);

      if (response.data.message === 'OK') {
        // User is authenticated, redirect to the dashboard
        navigate('/home/dashboard');
      } else {
        // User is not authenticated, redirect to the login page
        navigate('/');
      }
    }

  // Call checkUser when the ProtectedRoute component mounts
  useEffect(() => {
    checkUser();
  }, []);

  return children;
};

export default ProtectedRoute;

