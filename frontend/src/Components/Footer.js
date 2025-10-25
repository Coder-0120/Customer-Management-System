import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CustNotifications = () => {
  const[allnotifications,setallnotifications]=useState([]);
  const customer=JSON.parse(localStorage.getItem("CustomerDetails"));

  useEffect(()=>{
    const fetchallnotifications=async()=>{
      try{
        const res=await axios.get(`http://localhost:5000/api/customer/paymentproof/getAll/${customer._id}`);
        setallnotifications(res.data.data);

      }
      catch(error){
        console.log(error);
        alert("not able to fetch all notifications..");

      }
    }
    fetchallnotifications();
  },[])
  
  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };

  return (
    <div>
      <h1>All Notifications..</h1>
      {allnotifications.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {allnotifications.map((notification) => (
              <div
                key={notification._id}
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
                  top: "15px",
                  right: "15px",
                  background: statusColors[notification.status] || "#aaa",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}>
                  {notification.status}
                </div>

                <h3 style={{ color: "#D4AF37", fontSize: "18px", marginBottom: "12px", fontWeight: "700" }}>
                  {notification.user.name}
                </h3>

                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "15px" }}>
                  <p style={{ margin: "5px 0" }}>📱 {notification.user.phoneNo}</p>
                  <p style={{ margin: "5px 0" }}>📍 {notification.user.address}</p>
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
                      ₹{notification.transactionAmount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Type</span>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>
                      {notification.transactiontype}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Txn ID</span>
                    <span style={{ color: "#fff", fontSize: "13px" }}>{notification.transactionID}</span>
                  </div>
                </div>

                {notification.message && (
                  <p style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    fontStyle: "italic",
                    marginBottom: "12px",
                    padding: "8px",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "6px"
                  }}>
                    💬 {notification.message}
                  </p>
                )}

                <div style={{ position: "relative" }}>
                  <img
                    src={`http://localhost:5000${notification.proofUrl}`}
                    alt="Payment Proof"
                    // onClick={() => setZoomProof(proof)}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "12px",
                      border: "2px solid rgba(212, 175, 55, 0.3)",
                      cursor: "zoom-in",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "10px",
                    background: "rgba(0,0,0,0.7)",
                    color: "#D4AF37",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "600",
                    pointerEvents: "none"
                  }}>
                    🔍 Click to zoom
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                    {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* <button
                  onClick={() => OpenCustomerModal(proof, proof.user)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
                  }}
                >
                  View Details →
                </button> */}
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
  )
}

export default CustNotifications



    