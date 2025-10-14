const express = require('express');
const CustomerModel = require('../Models/UserModel');
const bcrypt=require("bcryptjs");

const Router = express.Router();


// to add new customer..
Router.post("/register",async(req,res)=>{
    const{name,address,phoneNo,DueAmount,AdvanceDeposit,password}=req.body;
    try{
        const existcustomer=await CustomerModel.findOne({phoneNo});
        if(existcustomer){
            return res.status(400).json({success:"false",message:"Customer already registered with this phoneNo"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newCustomer=new CustomerModel({
            name,
            address,
            phoneNo,
            DueAmount,
            AdvanceDeposit,
            password:hashedPassword
        })
        await newCustomer.save();
        return res.status(201).json({success:"true",message:"New Customer Added"});
    }
    catch(error){
        console.error("Registration error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

// to login customer...

Router.post("/login",async(req,res)=>{
    const {phoneNo,password}=req.body;
    try{
        const existcustomer=await CustomerModel.findOne({phoneNo});
        if(!existcustomer){
            return res.status(400).json({status:"false",message:"Customer don't exist"});
        }
        const isMatch=bcrypt.compare(password,existcustomer.password);
        if(!isMatch){
            return  res.status(400).json({success:"false",message:"Invalid credentials.."});
        }
        res.status(200).json({success:"true",message:"Login Successful",customer:existcustomer});
    }
    catch(error){
        return res.status(401).json({success:"false",message:"Internal server error."});
    }
})
module.exports = Router;