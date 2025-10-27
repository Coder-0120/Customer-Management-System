const express = require('express');
const Router = express.Router();
const TransactionModel = require("../Models/TransactionModel");
const customerModel = require("../Models/UserModel");

// Add a new transaction
Router.post("/add/:id", async (req, res) => {
  try {
    const { transactionType, remarks } = req.body;
    let amount = Number(req.body.amount); 
    const customerId = req.params.id;

    // Fetch customer to update amounts
    const customer = await customerModel.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    if(amount <=0){
      return res.status(400).json({ success: false, message: "Amount must be greater than zero" });
    }

    let updDueAmt = customer.DueAmount;
    let updAdvAmt = customer.AdvanceDeposit;

    //Calculate updated amounts
    switch (transactionType) {
      case "duePayment":
        updDueAmt = Math.max(updDueAmt - amount, 0);
        break;
      case "dueIncrease":
        updDueAmt += amount;
        break;
      case "advanceDeposit":
        updAdvAmt += amount;
        break;
      case "advanceWithdraw":
        updAdvAmt = Math.max(updAdvAmt - amount, 0);
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid transaction type" });
    }

    //  Save the transaction
    const transaction = new TransactionModel({
      customerId,
      transactionType,
      amount,
      remarks,
      updatedDue: updDueAmt,
      updatedAdvance: updAdvAmt,
    });
    await transaction.save();

    //  Update customer's current balances
    customer.DueAmount = updDueAmt;
    customer.AdvanceDeposit = updAdvAmt;
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Transaction added successfully",
      updatedCustomer: customer,
    });
  } catch (error) {
    console.error("Error while adding transaction:", error); 
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error while adding transaction",
    });
  }
});

// Fetch transaction history
Router.get("/history/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const customerTransactionHistory = await TransactionModel.find({ customerId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Fetched transaction history successfully",
      transactions: customerTransactionHistory,
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching transaction history",
    });
  }
});

module.exports = Router;
