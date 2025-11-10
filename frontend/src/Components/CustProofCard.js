import React from 'react'

const CustProofCard = ({filteredProofs,statusColors}) => {
  return (
         <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {filteredProofs.map((proof) => (
              <div
                key={proof._id}
                className="proof-card"
                style={{
                  background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  background: statusColors[proof.status] || "#aaa",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}>
                  {proof.status}
                </div>
                <div style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.3)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Amount</span>
                    <span style={{ color: "#D4AF37", fontSize: "16px", fontWeight: "700" }}>
                      ₹{proof.transactionAmount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Type</span>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>
                      {proof.transactiontype}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between",marginBottom: "8px"  }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Txn ID</span>
                    <span style={{ color: "#fff", fontSize: "13px" }}>{proof.transactionID}</span>
                  </div>
                  {proof.DigitalGoldAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>DigitalGold</span>
                      <span style={{ color: "#fff", fontSize: "13px" }}>{proof.DigitalGoldWeight} gm</span>
                    </div>
                  )}
                </div>
                {proof.message && (
                  <p style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    fontStyle: "italic",
                    marginBottom: "12px",
                    padding: "8px",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "6px"
                  }}>
                    💬 {proof.message}
                  </p>
                )}
                <div style={{ position: "relative" }}>
                  <img
                    src={`http://localhost:5000${proof.proofUrl}`}
                    alt="Payment Proof"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "12px",
                      border: "2px solid rgba(212, 175, 55, 0.3)",
                    }}
                    // onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    // onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 254, 254, 0.99)" }}>
                    {new Date(proof.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
  )
}

export default CustProofCard