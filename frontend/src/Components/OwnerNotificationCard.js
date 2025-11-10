import React from 'react'

const OwnerNotificationCard = ({filteredProofs,handleAddTransaction,statusColors}) => {
  return (
      <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {filteredProofs.map((notification) => (
              <div
                key={notification._id}
                className="notification-card"
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

                <div style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.3)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Customer</span>
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>
                      {notification.user.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Phone</span>
                    <span style={{ color: "#fff", fontSize: "13px" }}>
                      {notification.user.phoneNo}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Weight</span>
                    <span style={{ color: "#D4AF37", fontSize: "16px", fontWeight: "700" }}>
                      {notification.SellDigitalGoldWeight} gm
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Amount</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      ₹{notification.SellDigitalGoldAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>UPI-ID</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      {notification.upiID}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Remarks</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      {notification.Remarks || "N/A"}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 254, 254, 0.99)" }}>
                    {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <button 
                  onClick={() => handleAddTransaction(notification)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#1a1a1a",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.4)";
                  }}
                >
                  Manage Request
                </button>
              </div>
            ))}
          </div>
  )
}

export default OwnerNotificationCard