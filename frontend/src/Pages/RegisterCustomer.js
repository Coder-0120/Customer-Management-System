import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const RegisterCustomer = () => {
    const [Customer,SetCustomer]=useState({
        name:"",
        address:"",
        phoneNo:"",
        DueAmount:"",
        AdvanceDeposit:"",
        password:""
    })
    const handleChange=(e)=>{
        SetCustomer({...Customer,[e.target.name]:e.target.value})
    }
  
  const handleRegister = async (e) => {
      e.preventDefault();

      try{
        const res=await axios.post("http://localhost:5000/api/customer/register",{
            ...Customer,
            DueAmount:Number(Customer.DueAmount),
            AdvanceDeposit:Number(Customer.AdvanceDeposit)
        });
        console.log(res.data);
        alert("New Customer Added Successful");
        // navigate("/dashboard");
      }catch(err){
        console.log(err);
        alert("Registeration Failed");
      }
  }


  return (
   

    <div className="container mt-2 borderradius" >
      <h2 className="mb-4 text-center">Add Customer</h2>
      <div className="row justify-content-center" >
        <div className="col-md-6" >
          <form onSubmit={handleRegister} className="border p-3 shadow-sm" style={{backgroundImage: "linear-gradient(to right, #f0f4f8, #e0e7ee)"}}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name='name'
                value={Customer.name}
                onChange={handleChange}
               
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">PhoneNo</label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                name='phoneNo'
                value={Customer.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name='address'
                value={Customer.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DueAmount" className="form-label">DueAmount</label>
              <input
                type="text"
                className="form-control"
                id="DueAmount"
                name='DueAmount'
                value={Customer.DueAmount}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="AdvanceDeposit" className="form-label">AdvanceDeposit</label>
              <input
                type="text"
                className="form-control"
                id="AdvanceDeposit"
                name='AdvanceDeposit'
                value={Customer.AdvanceDeposit}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name='password'
                value={Customer.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 ">Add</button>
           
          </form>
        </div>
      </div>
    </div>

  );
};

export default RegisterCustomer;