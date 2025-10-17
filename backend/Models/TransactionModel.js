// models/Transaction.js
const mongoose=require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["duePayment", "dueIncrease", "advanceDeposit", "advanceWithdraw"],
      required: true,
    },
    amount: { type: Number, required: true },
    remarks: { type: String, default: "" },

    // auto-calculated in backend
    updatedDue: { type: Number },
    updatedAdvance: { type: Number },

   
  },
  { timestamps: true }
);

module.exports=mongoose.model("Transaction",transactionSchema);