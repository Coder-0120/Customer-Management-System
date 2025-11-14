import React from 'react'

const CusDasAccountCard = ({profile}) => {
  return (
     <div style={{
          background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          marginBottom: "30px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)"
          }} />

          <h2 style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#D4AF37",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "2px solid rgba(212, 175, 55, 0.2)"
          }}>
            Account Summary
          </h2>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "20px", 
            marginBottom: "25px" 
          }}>
            <div>
              <div style={{ 
                fontSize: "11px", 
                color: "rgba(212, 175, 55, 0.7)", 
                fontWeight: "600", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Name
              </div>
              <div style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>
                {profile.name}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: "11px", 
                color: "rgba(212, 175, 55, 0.7)", 
                fontWeight: "600", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Phone
              </div>
              <div style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>
                {profile.phoneNo}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: "11px", 
                color: "rgba(212, 175, 55, 0.7)", 
                fontWeight: "600", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Address
              </div>
              <div style={{ fontSize: "17px", fontWeight: "500", color: "rgba(255,255,255,0.9)" }}>
                {profile.address}
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: "11px", 
                color: "rgba(212, 175, 55, 0.7)", 
                fontWeight: "600", 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Digital Gold Weight (grams)
              </div>
              <div style={{ fontSize: "17px", fontWeight: "500", color: "rgba(255,255,255,0.9)" }}>
                {profile.DigitalGoldWeight} g
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "25px"
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)",
              padding: "25px",
              borderRadius: "16px",
              border: "1px solid rgba(239, 68, 68, 0.3)"
            }}>
              <div style={{ 
                fontSize: "11px", 
                color: "#fca5a5", 
                fontWeight: "700", 
                marginBottom: "10px", 
                textTransform: "uppercase",
                letterSpacing: "1.5px"
              }}>
                Due Amount
              </div>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#ef4444" }}>
                ₹{profile.DueAmount}
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)",
              padding: "25px",
              borderRadius: "16px",
              border: "1px solid rgba(16, 185, 129, 0.3)"
            }}>
              <div style={{ 
                fontSize: "11px", 
                color: "#6ee7b7", 
                fontWeight: "700", 
                marginBottom: "10px", 
                textTransform: "uppercase",
                letterSpacing: "1.5px"
              }}>
                Advance Deposit
              </div>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#10b981" }}>
                ₹{profile.AdvanceDeposit}
              </div>
            </div>
          </div>
        </div>
  )
}

export default CusDasAccountCard