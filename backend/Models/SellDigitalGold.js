const mongoose = require('mongoose');
const SellDigitalGoldSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    SellDigitalGoldWeight:{
        type:Number,
        required:true,  
    },
    SellDigitalGoldAmount:{
        type:Number,
        required:true,
    },
    upiID:{
        type:String,
        required:true,
    },
    Remarks:{
        type:String,
        default:"Selling Digital Gold",
    },
     status: {
        type: String,
        enum: ["unverified", "verified", "rejected"],
        default: "unverified",
    },
},{
    timestamps:true,
});
module.exports=mongoose.model("sellDigitalGold",SellDigitalGoldSchema);