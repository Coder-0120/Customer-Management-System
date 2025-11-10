import React, { useState } from 'react';
import axios from 'axios';
import AddNewCustCard from '../Components/AddNewCustCard';

const RegisterCustomer = () => {
  const [Customer, SetCustomer] = useState({
    name: "",
    address: "",
    phoneNo: "",
    DueAmount: "",
    AdvanceDeposit: "",
    password: ""
  });

  const handleChange = (e) => {
    SetCustomer({ ...Customer, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/customer/register", {
        ...Customer,
        DueAmount: Number(Customer.DueAmount),
        AdvanceDeposit: Number(Customer.AdvanceDeposit)
      });
      alert("New Customer Added Successfully");
      SetCustomer({
        name: "",
        address: "",
        phoneNo: "",
        DueAmount: "",
        AdvanceDeposit: "",
        password: ""
      });
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
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
          .register-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          }
        `}
      </style>
      <AddNewCustCard handleChange={handleChange} handleRegister={handleRegister} Customer={Customer}/>
    </div>
  );
};
export default RegisterCustomer;