const mongoose=require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["duePayment", "dueIncrease", "advanceDeposit", "advanceWithdraw", "buydigitalGold","sellDigitalGold"],
      required: true,
    },
    amount: { type: Number, required: true },
    remarks: { type: String, default: "" },

    // auto-calculated in backend
    updatedDue: { type: Number },
    updatedAdvance: { type: Number },
    DigitalGoldAmount: { type: Number, default: 0 },
    DigitalGoldWeight: { type: Number, default: 0 },

   
  },
  { timestamps: true }
);

module.exports=mongoose.model("Transaction",transactionSchema);