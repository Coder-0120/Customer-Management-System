import React from 'react';

const Payment = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start", // same as before
      padding: "40px 20px",
      flexWrap: "wrap",
      gap: "40px",
      boxSizing: "border-box",
      width: "100%",
      overflow: "hidden", // remove scroll
      position: "relative"
    }}>
      {/* Floating gold glow */}
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
        top: "-150px",
        right: "-150px",
        filter: "blur(100px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
        bottom: "-100px",
        left: "-100px",
        filter: "blur(80px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* QR Code Section */}
      <div style={{
        flex: "1 1 400px",
        maxWidth: "100%",
        textAlign: "center",
        animation: "fadeInUp 0.8s ease-out",
        zIndex: 1
      }}>
        <h3 style={{
          color: "#D4AF37",
          fontSize: "22px",
          marginBottom: "20px",
          textShadow: "0 2px 6px rgba(0,0,0,0.5)"
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
            boxShadow: "0 10px 30px rgba(212, 175, 55, 0.5)",
            transition: "transform 0.3s ease",
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

      {/* Payment Form Section */}
      <div style={{
        flex: "1 1 400px",
        maxWidth: "100%",
        background: "linear-gradient(135deg, rgba(45,45,45,0.9) 0%, rgba(30,30,30,0.9) 100%)",
        borderRadius: "20px",
        padding: "35px",
        boxShadow: "0 15px 35px rgba(212, 175, 55, 0.5)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        animation: "fadeInUp 1s ease-out",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        zIndex: 1
      }}>
        <h3 style={{
          color: "#D4AF37",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Submit Payment Proof
        </h3>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {["Transaction Amount", "Transaction ID"].map((label, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>{label}</label>
              <input
                type="text"
                placeholder={`Enter ${label.toLowerCase()}`}
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
                onFocus={e => e.target.style.border = "1px solid #FFD700"}
                onBlur={e => e.target.style.border = "1px solid rgba(212, 175, 55,0.5)"}
              />
            </div>
          ))}

          {/* Transaction Type */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>Transaction Type</label>
            <select style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid rgba(212, 175, 55,0.5)",
              background: "#2d2d2d",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
              onFocus={e => e.target.style.border = "1px solid #FFD700"}
              onBlur={e => e.target.style.border = "1px solid rgba(212, 175, 55,0.5)"}
            >
              <option value="">Select Type</option>
              <option value="duePayment">Pay Due Amount</option>
              <option value="advanceDeposit">Add Advance Payment</option>
            </select>
          </div>

          {/* Screenshot Upload */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>Upload Screenshot</label>
            <input type="file" style={{
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid rgba(212, 175, 55,0.5)",
              background: "#2d2d2d",
              color: "#fff",
              fontSize: "14px",
            }} />
          </div>

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>Message to Owner (Optional)</label>
            <textarea
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
              onFocus={e => e.target.style.border = "1px solid #FFD700"}
              onBlur={e => e.target.style.border = "1px solid rgba(212, 175, 55,0.5)"}
            />
          </div>

          {/* Submit Button */}
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 25px rgba(212,175,55,0.6)";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "0 8px 20px rgba(212,175,55,0.4)";
            }}
          >
            Submit Proof
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  )
}

export default Payment;
