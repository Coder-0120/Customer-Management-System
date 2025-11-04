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

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'verified':
        return { bg: 'rgba(76, 175, 80, 0.2)', border: '#4CAF50', text: '#4CAF50', icon: '✓' };
      case 'unverified':
        return { bg: 'rgba(255, 165, 0, 0.2)', border: '#FFA500', text: '#FFD700', icon: '⏳' };
      case 'rejected':
        return { bg: 'rgba(244, 67, 54, 0.2)', border: '#f44336', text: '#ff6b6b', icon: '✗' };
      default:
        return { bg: 'rgba(158, 158, 158, 0.2)', border: '#9e9e9e', text: '#bdbdbd', icon: '◯' };
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "40px 20px"
    }}>
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .notification-card {
            animation: slideIn 0.5s ease-out;
          }
          .status-badge {
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔔</div>
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
          <p style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)"
          }}>
            Track your digital gold sale requests and their status
          </p>
        </div>

        {notifications.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px"
          }}>
            {notifications.map((notification, index) => {
              const statusInfo = getStatusColor(notification.status);
              return (
                <div 
                  key={notification._id} 
                  className="notification-card"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "20px",
                    padding: "0",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(212, 175, 55, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
                  }}
                >
                  {/* Header with Status */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
                    padding: "20px",
                    borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    
                    <div 
                      className="status-badge"
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        background: statusInfo.bg,
                        border: `1.5px solid ${statusInfo.border}`,
                        fontSize: "12px",
                        fontWeight: "700",
                        color: statusInfo.text,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {statusInfo.icon} {notification.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "25px" }}>
                    {/* Weight and Amount - Highlighted */}
                    <div style={{
                      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "20px",
                      border: "1px solid rgba(212, 175, 55, 0.3)"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.6)",
                            marginBottom: "5px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          }}>
                            Weight
                          </div>
                          <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#D4AF37"
                          }}>
                            {notification.SellDigitalGoldWeight}g
                          </div>
                        </div>
                        <div style={{
                          fontSize: "36px",
                          color: "rgba(212, 175, 55, 0.3)"
                        }}>
                          ⚖️
                        </div>
                      </div>
                      <div style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)",
                        margin: "15px 0"
                      }} />
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.6)",
                            marginBottom: "5px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          }}>
                            Amount
                          </div>
                          <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#FFD700"
                          }}>
                            ₹{notification.SellDigitalGoldAmount.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{
                          fontSize: "36px",
                          color: "rgba(255, 215, 0, 0.3)"
                        }}>
                          💵
                        </div>
                      </div>
                    </div>

                 

                   

                    {/* Date */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)"
                    }}>
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
        ) : (
          <div style={{
            background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "20px",
            padding: "80px 40px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}>
            <div style={{fontSize: "72px", marginBottom: "20px", opacity: "0.6"}}>📭</div>
            <h3 style={{
              fontSize: "28px",
              color: "#D4AF37",
              marginBottom: "12px",
              fontWeight: "700"
            }}>
              No Requests Yet
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              You haven't made any digital gold sale requests. Your requests will appear here once submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustNotifications