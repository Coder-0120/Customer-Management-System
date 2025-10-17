const express = require('express');
const Router = express.Router();
const TransactionModel = require("../Models/TransactionModel");
const customerModel=require("../Models/UserModel");

Router.post("/add/:id", async (req, res) => {

    const { transactionType, remarks } = req.body;
    let amount = Number(req.body.amount);
    const customerId = req.params.id;
    const customer=await customerModel.findById(customerId); // fetch to update in amt 
    try {
        if(!customer){
            return res.status(404).json({success:false,message:"customer not found.."});
        }
        let updDueAmt=customer.DueAmount;
        let updAdvAmt=customer.AdvanceDeposit;

        // calculate updated amount as per transaction..
        switch(transactionType){
            case "duePayment":
               updDueAmt=Math.max(updDueAmt-amount,0);
               break;
            case "dueIncrease":
               updDueAmt+=amount;
               break;
            case "advanceDeposit":
                updAdvAmt+=amount;
               break;
            case "advanceWithdraw":
               updAdvAmt=Math.max(updAdvAmt-amount,0);
               break;
            default:
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        const transaction = new TransactionModel({
            customerId,
            transactionType,
            amount,
            remarks,
            updatedDue:updDueAmt,
            updatedAdvance: updAdvAmt
        })
        await transaction.save();

        // now update customer balance also to show updated amount...
        customer.DueAmount=updDueAmt;
        customer.AdvanceDeposit=updAdvAmt;
        await customer.save();
        return res.status(200).json({ success: true, message: "transaction added successfully.." });

    }
    catch(error){
        return res.status(404).json({success:false,message:"error in adding transaction.."})
    }
   



})
module.exports = Router;