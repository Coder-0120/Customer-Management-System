import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../Components/LoginCard';

const Login = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (isOwner) {
        // Owner login
        const res = await axios.post("http://localhost:5000/api/owner/login", { UserName: userName, password });
        console.log(res.data);
        alert("Login Successful");
        localStorage.setItem("OwnerDetails", JSON.stringify(res.data.Owner));
        navigate("/");
      } else {
        // Customer login
        const res = await axios.post("http://localhost:5000/api/customer/login", { phoneNo, password });
        console.log(res.data);
        alert("Login Successful");
        localStorage.setItem("CustomerDetails", JSON.stringify(res.data.customer));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <style>
        {`
          .login-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          }
        `}
      </style>
      <LoginCard setIsOwner={setIsOwner} isOwner={isOwner} handleLogin={handleLogin} userName={userName} setUserName={setUserName} phoneNo={phoneNo} setPhoneNo={setPhoneNo} password={password} setPassword={setPassword}/>
    </div>
  );
};

export default Login;