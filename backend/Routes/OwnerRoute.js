const express = require('express');
const OwnerModel = require('../Models/OwnerModel');

const Router = express.Router();



// to login Owner...

Router.post("/login",async(req,res)=>{
    const {UserName,password}=req.body;
    try{
        const existOwner=await OwnerModel.findOne({UserName});
        if(!existOwner){
            return res.status(400).json({status:"false",message:"Owner don't exist"});
        }
        const isMatch=existOwner.password===password;
        if(!isMatch){
            return  res.status(400).json({success:"false",message:"Invalid credentials.."});
        }
        res.status(200).json({success:"true",message:"Login Successful",Owner:existOwner});
    }
    catch(error){
        return res.status(401).json({success:"false",message:"Internal server error."});
    }
})
module.exports = Router;