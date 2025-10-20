import React from 'react'

const CustomerDashboard = () => {
  const customerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "30px",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          Customer Dashboard
        </h1>

        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          marginBottom: "24px"
        }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "20px"
          }}>
            Account Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#7f8c8d", fontWeight: "600", marginBottom: "5px" }}>NAME</div>
              <div style={{ fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>{customerInfo.name}</div>
            </div>

            <div>
              <div style={{ fontSize: "12px", color: "#7f8c8d", fontWeight: "600", marginBottom: "5px" }}>PHONE</div>
              <div style={{ fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>{customerInfo.phoneNo}</div>
            </div>

            <div>
              <div style={{ fontSize: "12px", color: "#7f8c8d", fontWeight: "600", marginBottom: "5px" }}>ADDRESS</div>
              <div style={{ fontSize: "16px", fontWeight: "500", color: "#2c3e50" }}>{customerInfo.address}</div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #fca5a5"
            }}>
              <div style={{ fontSize: "11px", color: "#991b1b", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase" }}>
                Due Amount
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#dc2626" }}>
                ₹{customerInfo.DueAmount.toLocaleString()}
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #6ee7b7"
            }}>
              <div style={{ fontSize: "11px", color: "#065f46", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase" }}>
                Advance
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#059669" }}>
                ₹{customerInfo.AdvanceDeposit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Add more sections here in future */}
      </div>
    </div>
  )
}

export default CustomerDashboard