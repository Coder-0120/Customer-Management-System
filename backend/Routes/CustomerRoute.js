const express = require('express');
const CustomerModel = require('../Models/UserModel');
const bcrypt = require("bcryptjs");

const Router = express.Router();


// to add new customer..
Router.post("/register", async (req, res) => {
    const { name, address, phoneNo, DueAmount, AdvanceDeposit, password } = req.body;
    try {
        const existcustomer = await CustomerModel.findOne({ phoneNo });
        if (existcustomer) {
            return res.status(400).json({ success: "false", message: "Customer already registered with this phoneNo" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newCustomer = new CustomerModel({
            name,
            address,
            phoneNo,
            DueAmount,
            AdvanceDeposit,
            password: hashedPassword
        })
        await newCustomer.save();
        return res.status(201).json({ success: "true", message: "New Customer Added" });
    }
    catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

// to login customer...

Router.post("/login", async (req, res) => {
    const { phoneNo, password } = req.body;
    try {
        const existcustomer = await CustomerModel.findOne({ phoneNo });
        if (!existcustomer) {
            return res.status(400).json({ status: "false", message: "Customer don't exist" });
        }
        const isMatch = bcrypt.compare(password, existcustomer.password);
        if (!isMatch) {
            return res.status(400).json({ success: "false", message: "Invalid credentials.." });
        }
        res.status(200).json({ success: "true", message: "Login Successful", customer: existcustomer });
    }
    catch (error) {
        return res.status(401).json({ success: "false", message: "Internal server error." });
    }
})


// to get all customers
Router.get("/AllCustomers", async (req, res) => {
    try {
        const AllCustomers = await CustomerModel.find();
        if (!AllCustomers || AllCustomers.length === 0) {
            return res.status(404).json({ success: false, message: "No Customers exist" });
        }
        return res.status(201).json({ success: true, message: "All customers fetched..", data: AllCustomers })
    }
    catch(error){
        return res.status(400).json({success:false,message:"error in fetching all customers.."});
    }
})

// to delete customer..
Router.delete("/delete/:id",async(req,res)=>{
   try{
     await CustomerModel.findByIdAndDelete(req.params.id);
     return res.status(201).json({success:false,message:"Customer deleted successfully.."})
   }
   catch(error){
    return res.status(404).json({success:false,message:'failed to delete'})
   }
})

// to edit any customer details..

Router.put("/update/:id",async(req,res)=>{
    try{
        const customer=await CustomerModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).json({success:true,message:"Customers details updated successfully"});
    }
    catch(error){
        return res.status(404).json({success:false,message:"failed to update.."});
    }
})
module.exports = Router;