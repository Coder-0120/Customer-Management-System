import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustProofCard from '../Components/CustProofCard';

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
  });

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
        {filteredProofs.length > 0 ? (
     <CustProofCard statusColors={statusColors} filteredProofs={filteredProofs}/>
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