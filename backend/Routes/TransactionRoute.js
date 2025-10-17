const express = require('express');
const Router = express.Router();
const TransactionModel = require("../Models/TransactionModel");
const customerModel=require("../Models/UserModel");

Router.post("/add/:id", async (req, res) => {

    try {
        const { transactionType, amount, remarks } = req.body;
        const customerId = req.params.id;
        const user=customerModel.findById(customerId); // fetch to update in amt 
        if(!user){
            return res.status(404).json({success:false,message:"customer not found.."});
        }
        const transaction = new TransactionModel({
            customerId,
            transactionType,
            amount,
            remarks,
            updatedDue: "",
            updatedAdvance: ""
        })
        await transaction.save();
        return res.status(200).json({ success: true, message: "transaction added successfully.." });

    }
    catch(error){
        return res.status(404).json({success:false,message:"error in adding transaction.."})
    }
   



})
module.exports = Router;