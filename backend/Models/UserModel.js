const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    address: {
      type: String,
      trim: true,
      default: "", 
    },
    DueAmount: {
      type: Number,
      default: 0,
      min: 0,
      set: v => v || 0,
    },
    AdvanceDeposit: {
      type: Number,
      default: 0,
      min: 0,
      set: v => v || 0,
    },
    DigitalGoldAmount: {
      type: Number,
      default: 0,
      min: 0,
      set: v => v || 0,
    },
    DigitalGoldWeight:{
      type: Number,
      default:0,
      min:0,
      set: v => v || 0,
    },
    password: {
      type: String,
       minlength: 6,
      // maxlength: 6,
      default: "123456",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
