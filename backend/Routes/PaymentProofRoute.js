const express = require("express");
const Router = express.Router();
const PaymentProofModel = require("../Models/PaymentProof");
const multer = require("multer");
const path = require("path");

//  Multer Storage Configuration 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// to add Payment Proof 
Router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { user, transactionAmount, transactionID, transactiontype, message } = req.body;

    // File path from multer
    const proofUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!proofUrl) {
      return res.status(400).json({ success: false, message: "Proof image is required" });
    }

    const newProof = await PaymentProofModel.create({
      user,
      transactionAmount,
      transactionID,
      transactiontype,
      message,
      proofUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Payment proof saved successfully",
      data: newProof,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save payment proof",
      error: error.message,
    });
  }
});
// to get all proofs for owner sections..
Router.get("/getAll",async(req,res)=>{
  try{
    const allProofs=await PaymentProofModel.find()
    .populate("user","name address phoneNo DueAmount AdvanceDeposit").sort({createdAt:-1});;
    if(!allProofs || allProofs.length===0){
      return res.status(400).json({success:false,message:"no proofs found"});
    }
    return res.status(201).json({success:true,message:"all proofs fetched",data:allProofs});

  }
  catch(error){
    return res.status(500).json({success:false,message:"failed to fetch all proofs"});

  }
})
// to get particular customer proofs ..
Router.get("/getAll/:id",async(req,res)=>{
  
  try{
    const allProofs=await PaymentProofModel.find({user:req.params.id})
    .populate("user","name address phoneNo DueAmount AdvanceDeposit").sort({createdAt:-1});
    if(!allProofs || allProofs.length===0){
      return res.status(400).json({success:false,message:"no proofs found related to customer"});
    }
    return res.status(201).json({success:true,message:"all proofs fetched related to customer",data:allProofs});

  }
  catch(error){
    return res.status(500).json({success:false,message:"failed to fetch all proofs related to customer"});

  }
})

// to update payment proofs
Router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await PaymentProofModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// to delete customer paymentproofs if cutsomer is deleted
Router.delete("/deleteByCustomer/:id",async(req,res)=>{
  const customerId=req.params.id;
  try{
    await PaymentProofModel.deleteMany({user:customerId});
    return res.status(201).json({success:true,message:'successfully deleted payment proofs'});
  }
  catch(error){
    return res.status(500).json({success:false,message:"failed to delete payment proofs"});
    
  }
})


module.exports = Router;
 