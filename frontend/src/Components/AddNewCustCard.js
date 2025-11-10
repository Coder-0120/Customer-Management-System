import React from 'react'

const AddNewCustCard = ({handleRegister,Customer,handleChange}) => {
  return (
    <div style={{
        background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
        borderRadius: "20px",
        padding: "35px",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        border: "1px solid rgba(212, 175, 55, 0.3)"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "700",
          color: "#D4AF37",
          marginBottom: "8px"
        }}>
          Add New Customer
        </h2>
        <p style={{
          textAlign: "center",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "25px"
        }}>
          Register a new customer account
        </p>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.8)"
            }}>
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={Customer.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="register-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.8)"
            }}>
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNo"
              value={Customer.phoneNo}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="register-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.8)"
            }}>
              Address
            </label>
            <input
              type="text"
              name="address"
              value={Customer.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
              className="register-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.8)"
              }}>
                Due Amount
              </label>
              <input
                type="number"
                name="DueAmount"
                value={Customer.DueAmount}
                onChange={handleChange}
                placeholder="0"
                className="register-input"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.8)"
              }}>
                Advance
              </label>
              <input
                type="number"
                name="AdvanceDeposit"
                value={Customer.AdvanceDeposit}
                onChange={handleChange}
                placeholder="0"
                className="register-input"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.8)"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={Customer.password}
              onChange={handleChange}
              placeholder="Create password"
              required
              className="register-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
              color: "#1a1a1a",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "8px",
              boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(212, 175, 55, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.4)";
            }}
          >
            Add Customer
          </button>
        </form>
      </div>
  )
}

export default AddNewCustCard