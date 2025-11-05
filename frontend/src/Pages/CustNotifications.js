import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CustNotifications = () => {
  const[notifications,setNotfications]=useState([]);
  const customerinfo=JSON.parse(localStorage.getItem("CustomerDetails"));
  
  useEffect(()=>{
    const fetchallNotifications=async()=>{
      try{
        const res=await axios.get(`http://localhost:5000/api/customer/sellDigitalGold/fetchAll/${customerinfo._id}`);
        setNotfications(res.data.data);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchallNotifications();
  })

  const getStatusInfo = (status) => {
    const statusMap = {
      verified: { bg: 'rgba(76, 175, 80, 0.2)', border: '#4CAF50', text: '#66bb6a', icon: '✓' },
      unverified: { bg: 'rgba(255, 165, 0, 0.2)', border: '#FFA500', text: '#FFD700', icon: '⏳' },
      rejected: { bg: 'rgba(244, 67, 54, 0.2)', border: '#f44336', text: '#ff6b6b', icon: '✗' }
    };
    return statusMap[status?.toLowerCase()] || statusMap.unverified;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>💎</div>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "10px"
          }}>
            Your Sale Requests
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>
            Track your digital gold sale requests and their status
          </p>
        </div>

        {notifications.length > 0 ? (
          <>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px"
          }}>
            {notifications.map((notification) => {
              const statusInfo = getStatusInfo(notification.status);
              return (
                <div 
                  key={notification._id} 
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    transition: "all 0.3s ease",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(212, 175, 55, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
                  }}
                >
                  {/* Status Badge - Top Right */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: statusInfo.bg,
                    border: `1.5px solid ${statusInfo.border}`,
                    fontSize: "12px",
                    fontWeight: "700",
                    color: statusInfo.text,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    zIndex: 1
                  }}>
                    {statusInfo.icon} {notification.status}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "25px", paddingTop: "60px" }}>
                    {/* Weight and Amount */}
                    <div style={{
                      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "20px",
                      border: "1px solid rgba(212, 175, 55, 0.3)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                        <div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "5px", textTransform: "uppercase" }}>
                            Weight
                          </div>
                          <div style={{ fontSize: "28px", fontWeight: "700", color: "#D4AF37" }}>
                            {notification.SellDigitalGoldWeight}g
                          </div>
                        </div>
                        <div style={{ fontSize: "36px", color: "rgba(212, 175, 55, 0.3)" }}>⚖️</div>
                      </div>
                      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)", margin: "15px 0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "5px", textTransform: "uppercase" }}>
                            Amount
                          </div>
                          <div style={{ fontSize: "28px", fontWeight: "700", color: "#FFD700" }}>
                            ₹{notification.SellDigitalGoldAmount.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{ fontSize: "36px", color: "rgba(255, 215, 0, 0.3)" }}>💵</div>
                      </div>
                    </div>

                    {/* Date */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                      <span>📅</span>
                      {new Date(notification.createdAt).toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </>
        ) : (
          <div style={{
            background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "20px",
            padding: "80px 40px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}>
            <div style={{ fontSize: "72px", marginBottom: "20px", opacity: "0.6" }}>📭</div>
            <h3 style={{ fontSize: "28px", color: "#D4AF37", marginBottom: "12px", fontWeight: "700" }}>
              No Requests Yet
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}>
              You haven't made any digital gold sale requests. Your requests will appear here once submitted.
            </p>
          </div>
        )}
      
      </div>
    </div>
  )
}

export default CustNotifications