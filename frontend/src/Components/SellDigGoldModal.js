import React from 'react'

const SellDigGoldModal = ({upiID,setUpiID,remarks,setRemarks,setShowModal,handleSellSubmit}) => {
  return (
     <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <div
      style={{
        background: "#222",
        padding: "30px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        color: "#fff",
        border: "2px solid #D4AF37",
      }}
    >
      <h2 style={{ color: "#D4AF37", marginBottom: "20px", textAlign: "center" }}>
        💰 Confirm Sell
      </h2>

      <label style={{ display: "block", marginBottom: "8px" }}>UPI ID</label>
      <input
        className="gold-input"
        type="text"
        placeholder="Enter your UPI ID"
        value={upiID}
        onChange={(e) => setUpiID(e.target.value)}
      />

      <br />
      <br />

      <label style={{ display: "block", marginBottom: "8px" }}>Remarks</label>
      <input
        className="gold-input"
        type="text"
        placeholder="Any remarks (optional)"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setShowModal(false)}
          style={{
            background: "#555",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleSellSubmit}
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
  )
}

export default SellDigGoldModal