import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "../Styles/login.css";
import { Link } from 'react-router-dom';

const Custlogin = () => {
  const [phoneNo, setphoneNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
      e.preventDefault();

      try{
        const res=await axios.post("http://localhost:5000/api/customer/login",{phoneNo,password});
        console.log(res.data);
        alert("Login Successful");
        localStorage.setItem("CustomerDetails",JSON.stringify(res.data.customer));
        navigate("/");
      }catch(err){
        console.log(err);
        alert("Login Failed");
      }
  }
  return (
    <div className="container mt-5 borderradius" >
      <h2 className="mb-4 text-center">Customer Login</h2>
      <div className="row justify-content-center" >
        <div className="col-md-6" >
          <form onSubmit={handleLogin} className="border p-3 shadow-sm" style={{backgroundImage: "linear-gradient(to right, #f0f4f8, #e0e7ee)"}}>
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">PhoneNo</label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 ">Login</button>
            <Link to="/ownerLogin" className="btn btn-link w-100 mt-2">Owner? Login Here</Link>
           
          </form>
        </div>
      </div>
    </div>

  );
};

export default Custlogin;