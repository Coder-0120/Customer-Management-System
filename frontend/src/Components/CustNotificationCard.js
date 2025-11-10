import React from 'react'

const CustNotificationCard = ({filteredNotifications,statusColors}) => {
  return (
     <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {filteredNotifications.map((notification) => (
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
                {/* Status Badge */}
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

                {/* Main Content */}
                <div style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  marginTop: "25px",
                  border: "1px solid rgba(212, 175, 55, 0.3)"
                }}>
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
                </div>

                Gold Icon Visual
                <div style={{
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "12px",
                  border: "1px dashed rgba(212, 175, 55, 0.2)",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>⚖️</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase" }}>
                    Sale Request
                  </div>
                </div>

                {/* Date */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 254, 254, 0.99)" }}>
                    {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(255, 254, 254, 0.7)" }}>
                    {new Date(notification.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
  )
}

export default CustNotificationCard