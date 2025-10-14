const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    password: {
      type: String,
      default: "1234",
    },
  }
);
module.exports = mongoose.model("Owner", ownerSchema);
