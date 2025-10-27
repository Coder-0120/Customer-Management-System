const mongoose = require("mongoose");
const paymentProofSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    transactionAmount: {
        type: Number,
        min: 0,
        required: true
    },
    transactionID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    transactiontype: {
        type: String,
        required: true
    },
    proofUrl: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: 'Please Verify Payment and update my account'
    },
    status: {
        type: String,
        enum: ["unverified", "verified", "rejected"],
        default: "unverified",
    }

},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("PaymentProof", paymentProofSchema);