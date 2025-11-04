const express = require('express');
const CustomerModel = require('../Models/UserModel');
const bcrypt = require("bcryptjs");
const UserModel = require('../Models/UserModel');
const SellDigitalGoldModel = require('../Models/SellDigitalGold');

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
        const isMatch = await bcrypt.compare(password, existcustomer.password);
        if (!isMatch) {
            return res.status(400).json({ success: "false", message: "Invalid credentials.." });
        }
        res.status(200).json({ success: "true", message: "Login Successful", customer: existcustomer });
    }
    catch (error) {
        return res.status(401).json({ success: "false", message: "Internal server error." });
    }
})

// fetch customer profile
Router.get("/profile/:id",async(req,res)=>{
    try{
        const result=await CustomerModel.findById(req.params.id);
        if(!result){
            return res.status(404).json({success:false,message:'no customer info found..'})
        }
        return res.status(201).json({success:true,message:"Customer info fetched..",data:result})

    }
    catch(error){
        return res.status(400).json({success:false,message:"Customer not found.."});
    }
})


// to get all customers
Router.get("/AllCustomers", async (req, res) => {
    try {
        const AllCustomers = await CustomerModel.find().sort({ createdAt: -1 });
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
// Router.get("/getDetails/:id",async(req,res)=>{
//     const CustomerDetails=await UserModel.findOne(req.params._id);
//     try{

//         if(!userdetails){
//             return res.status(404).json({success:false,message:"no customer exist"});
//         }
//         return res.status(201).json({success:true,message:'all details of customer',customer:CustomerDetails})
//     }
//     catch(error){
//         return res.status(500).json({success:false,message:"internal server error"});
//     }

// })

Router.post("/sellDigitalGold/add",async(req,res)=>{
    const{customerId,weight,amount,upiID,Remarks}=req.body;
    try{
        const newSellDigitalGold=new SellDigitalGoldModel({
            user: customerId,
            SellDigitalGoldWeight: weight,
            SellDigitalGoldAmount: amount,
            upiID,
            Remarks
        });
        await newSellDigitalGold.save();
        return res.status(201).json({success:true,message:"Sell digital gold request submitted successfully."});
    }
    catch(error){
        return res.status(500).json({success:false,message:"Internal server error."});
    }
})
// to show all selldigitalgold requests to admin 
Router.get("/sellDigitalGold/getAll",async(req,res)=>{
    try{
       const allrequests=await SellDigitalGoldModel.find()
       .populate("user","name address phoneNo DueAmount AdvanceDeposit").sort({createdAt:-1});
       if(!allrequests || allrequests===0){
        return res.status(400).json({success:false,message:'no request found..'})
       }
        return res.status(201).json({success:true,message:"Sell digital gold request fetched successfully.",data:allrequests});
    }
    catch(error){
        return res.status(500).json({success:false,message:"Internal server error."});
    }
})

// to show submit selldigitalgold request for particular customer
Router.get('/sellDigitalGold/fetchAll/:id',async(req,res)=>{
    try{
        const allcustrequests=await SellDigitalGoldModel.find({user:req.params.id})
        .populate("user","name address phoneNo DueAmount AdvanceDeposit");
        if(!allcustrequests || allcustrequests===0){
            return res.status(400).json({success:false,message:'no requests found..'});
        }
        return res.status(201).json({success:true,message:"all digital gold requests fetched successfully..",data:allcustrequests});

    }
    catch(error){
        return res.status(500).json({success:false,message:"Internal server error..."});
    }
})
module.exports = Router;