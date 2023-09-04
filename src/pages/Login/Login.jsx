import  InputGroup  from "react-bootstrap/InputGroup";
import visible from "../../assets/visible.svg";
import notvisible from "../../assets/hidden.svg"
import Navbar from 'react-bootstrap/Navbar';
import { Image } from "react-bootstrap";
import logo from '../../assets/logo.png' 

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./Login.css"; // Import your CSS file for styling

import { useState } from "react";
import mainUrl from "../../api/configApi";

function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;
    const data = { userid: username, passwd: password };
    setLoading(true);

    try {
      const response = await axios.post(
        `${mainUrl}adminlogin`,
        data
      );

      if (response.data.message === "OK") {
        console.log("Login Success:", response.data.message);
        toast.success("success");
        localStorage.setItem("username", JSON.stringify(username));
          localStorage.setItem("password", password);
        setTimeout(() => {
          navigate("/home/dashboard");
        }, 3000);
      } else {
        
        toast.error("Invalid Details");
      }

      setLoading(false);
    } catch (err) {
      // Handle login failure
      toast.error("Login error:", err);
      // setError('Login failed. Please try again.');
      setLoading(false);
    }

  };
  return (<>
     <Navbar bg="light" variant="dark" fixed='top' className='justify-content-between' >
        <div className="ml-3 px-5">
        
        <Navbar.Brand href="#">
            <Image src={logo} width={90} height={40}/>
        </Navbar.Brand>
        </div>
   
       
      </Navbar>
  <div className="login-container">
      <ToastContainer />
      <div className="centered-content">
        <h3 style={{marginBottom:'1rem'}}>Login</h3>
        <form onSubmit={handleSubmit} method="post">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
                onChange={handleChange}
              className="bottom-border"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="bottom-border"
                value={formData.password}
                onChange={handleChange}
                required
              /> <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer',border:'none',background:'none' }}
            >
              {showPassword ? (
                <img src={notvisible} alt="Hide" width="20" height="20" />
              ) : (
                <img src={visible} alt="Show" width="20" height="20" />
              )}
            </InputGroup.Text>
            
            </div>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {" "}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  </>
  
  );
}

export default Login;
