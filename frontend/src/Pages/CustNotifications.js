import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustNotificationCard from '../Components/CustNotificationCard';

const CustNotifications = () => {
  const [notifications, setNotfications] = useState([]);
  const customer = JSON.parse(localStorage.getItem("CustomerDetails"));
  const [filterStatus, setFilterStatus] = useState("all");
  
  useEffect(() => {
    const fetchallNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer/sellDigitalGold/fetchAll/${customer._id}`);
        setNotfications(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchallNotifications();
  });

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };

  const filteredNotifications = filterStatus === "all"
    ? notifications
    : notifications.filter(n => n.status === filterStatus);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "30px 20px"
    }}>
      <style>
        {`
          .notification-card { transition: all 0.3s ease; }
          .notification-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3); }
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
            💰 Digital Gold Sale Requests
          </h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "#2d2d2d",
              color: "#D4AF37",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <option value="all">All Requests</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredNotifications.length > 0 ? (
         <CustNotificationCard filteredNotifications={filteredNotifications} statusColors={statusColors}/>
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
              No sale requests found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default CustNotifications