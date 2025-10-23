import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const CustomerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
  const [paymentProof, setPaymentProof] = useState({
    transactionAmount: "",
    transactionID: "",
    transactiontype: "",
    image: null,
    message: ""
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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "40px",
      flexWrap: "wrap"
    }}>
      {/* QR Code Section */}
      <div style={{
        flex: "1 1 400px",
        maxWidth: "100%",
        textAlign: "center"
      }}>
        <h3 style={{ 
          color: "#D4AF37", 
          fontSize: "22px", 
          marginBottom: "20px" 
        }}>
          Scan this QR to Pay via UPI
        </h3>
        <img
          src='https://www.bharatupi.com/wp-content/uploads/2024/05/UPI-QR-Code-for-Payments-India.jpg'
          alt="UPI QR Code"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(212, 175, 55, 0.5)"
          }}
        />
        <p style={{ 
          color: "rgba(255,255,255,0.7)", 
          marginTop: "15px", 
          fontSize: "14px" 
        }}>
          Use your UPI app to scan and pay. Then submit your payment proof below.
        </p>
      </div>

      {/* Payment Form */}
      <div style={{
        flex: "1 1 400px",
        maxWidth: "100%",
        background: "linear-gradient(135deg, rgba(45,45,45,0.9) 0%, rgba(30,30,30,0.9) 100%)",
        borderRadius: "20px",
        padding: "35px",
        boxShadow: "0 15px 35px rgba(212, 175, 55, 0.5)",
        border: "1px solid rgba(212, 175, 55, 0.3)"
      }}>
        <h3 style={{ 
          color: "#D4AF37", 
          marginBottom: "20px", 
          textAlign: "center" 
        }}>
          Submit Payment Proof
        </h3>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={handleProof}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
              Transaction Amount
            </label>
            <input
              type="number"
              placeholder="Enter transaction amount"
              name='transactionAmount'
              value={paymentProof.transactionAmount}
              onChange={handleChanges}
              required
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55,0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
              Transaction ID
            </label>
            <input
              type="text"
              placeholder="Enter transaction id"
              name='transactionID'
              value={paymentProof.transactionID}
              onChange={handleChanges}
              required
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55,0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
              Transaction Type
            </label>
            <select   
              name='transactiontype'
              value={paymentProof.transactiontype}
              onChange={handleChanges}
              required
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55,0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                cursor: "pointer"
              }}
            >
              <option value="">Select Type</option>
              <option value="duePayment">Pay Due Amount</option>
              <option value="advanceDeposit">Pay Advance Payment</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
              Upload Screenshot
            </label>
            <input 
              type="file" 
              name="image"
              accept="image/*"
              onChange={handleChanges}
              required
              style={{
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55,0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer"
              }} 
            />
            {paymentProof.image && (
              <p style={{ 
                color: "#D4AF37", 
                fontSize: "12px", 
                marginTop: "5px" 
              }}>
                ✅ {paymentProof.image.name}
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
              Message to Owner (Optional)
            </label>
            <textarea
              name='message'
              value={paymentProof.message}
              onChange={handleChanges}
              placeholder="Write any message..."
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55,0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                minHeight: "60px",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "15px 0",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
              color: "#1a1a1a",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)",
              marginTop: "5px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(212, 175, 55, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.4)";
            }}
          >
            Submit Proof
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;