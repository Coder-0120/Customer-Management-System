import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProofSection = () => {
  const [AllProofs, setAllProofs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const customer=JSON.parse(localStorage.getItem("CustomerDetails"));

  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer/paymentproof/getAll/${customer._id}`);
        setAllProofs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProofs();
  }, []);

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };
  const filteredProofs = filterStatus === "all"
    ? AllProofs
    : AllProofs.filter(p => p.status === filterStatus);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "30px 20px"
    }}>
      <style>
        {`
          .proof-card { transition: all 0.3s ease; }
          .proof-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3); }
          .input-focus:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2); }
        `}
      </style>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "30px",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <h2 style={{ color: "#D4AF37", fontSize: "28px", fontWeight: "700", margin: 0 }}>
            💳 Payment Proofs
          </h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "rgba(45, 45, 45, 0.8)",
              color: "#D4AF37",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <option value="all">All Proofs</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {/* Proof Cards */}
        {filteredProofs.length > 0 ? (
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
                      // cursor: "zoom-in",
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
        ) : (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(45,45,45,0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>📭</div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              No payment proofs found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProofSection;