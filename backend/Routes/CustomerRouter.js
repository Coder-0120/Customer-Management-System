const express = require('express');
const CustomerModel = require('../Models/UserModel');

const Router = express.Router();

Router.post("/register",async(req,res)=>{
    const{name,address,phoneNo,DueAmount,AdvanceDeposit,password}=req.body;
    try{
        const existcustomer=await CustomerModel.findOne({phoneNo});
        if(existcustomer){
            return res.status(400).json({success:"false",message:"Customer already registered with this phoneNo"});
        }
        const newCustomer=new CustomerModel({
            name,
            address,
            phoneNo,
            DueAmount,
            AdvanceDeposit,
            password
        })
        await newCustomer.save();
        return res.status(201).json({success:"true",message:"New Customer Added"});
    }
    catch(error){
        console.error("Registration error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

module.exports = Router;