import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PaymentCard from '../Components/PaymentCard';

const Payment = () => {
  const CustomerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
  const { state } = useLocation(); // <-- to get the passed state
  const DigitalGoldAmount = state?.DigitalGoldAmount || 0;
  const DigitalGoldWeight = state?.DigitalGoldWeight || 0;
  const [paymentProof, setPaymentProof] = useState({
    transactionAmount: state?.DigitalGoldAmount || "",
    transactionID: "",
    transactiontype: state?.DigitalGoldAmount ? "buydigitalGold" : "",
    image: null,
    message: `Please Verify Payment and update my account`
  });

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    setPaymentProof({ ...paymentProof, [name]: files ? files[0] : value });
  };

  const handleProof = async (e) => {
    e.preventDefault();

    try {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append("user", CustomerInfo?._id);
      formData.append("transactionAmount", paymentProof.transactionAmount);
      formData.append("transactionID", paymentProof.transactionID);
      formData.append("transactiontype", paymentProof.transactiontype);
      formData.append("message", paymentProof.message || "Please Verify Payment and update my account");
      formData.append("image", paymentProof.image);
      formData.append("DigitalGoldAmount", DigitalGoldAmount);
      formData.append("DigitalGoldWeight", DigitalGoldWeight);

      //  Must include correct Content-Type
      const res = await axios.post(
        "http://localhost:5000/api/customer/paymentproof/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(" Proof submitted successfully!");
      console.log("Server response:", res.data);

      // Clear form after submission
      setPaymentProof({
        transactionAmount: "",
        transactionID: "",
        transactiontype: "",
        image: null,
        message: ""
      });

      // Clear file input
      e.target.reset();

    } catch (error) {
      console.error(" Error submitting proof:", error);
      alert("Failed to submit payment proof. Please try again.");
    }
  };

  return (
   <PaymentCard paymentProof={paymentProof} handleChanges={handleChanges} handleProof={handleProof}/>
  );
};

export default Payment;