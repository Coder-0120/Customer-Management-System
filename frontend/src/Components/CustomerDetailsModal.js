import React from 'react'

const CustomerDetailsModal = ({setshowCustomerModal,selectedCustomer,handleTransactions,handleStatusChange,handleStatusUpdate,proofStatus}) => {
  return (
     <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
          onClick={() => setshowCustomerModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(45,45,45,0.98) 0%, rgba(30,30,30,0.98) 100%)",
              padding: "35px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              position: "relative",
              border: "1px solid rgba(212, 175, 55, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setshowCustomerModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#ff4757",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(255,71,87,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ee5a6f";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff4757";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              ✖
            </button>

            <h2 style={{ color: "#D4AF37", fontSize: "24px", marginBottom: "25px" }}>
              Customer Details
            </h2>

            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "20px" }}>
              <p style={{ margin: "10px 0" }}><strong>Name:</strong> {selectedCustomer.name || selectedCustomer.user.name}</p>
              <p style={{ margin: "10px 0" }}><strong>Phone:</strong> {selectedCustomer.phoneNo || selectedCustomer.user.phoneNo}</p>
              <p style={{ margin: "10px 0" }}><strong>Address:</strong> {selectedCustomer.address ||  selectedCustomer.user.address}</p>
              <p style={{ margin: "10px 0" }}>
                <strong>Due:</strong> <span style={{ color: "#ff4d4d", fontWeight: "700" }}>₹{selectedCustomer.DueAmount || selectedCustomer.user.DueAmount}</span>
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Advance:</strong> <span style={{ color: "#28a745", fontWeight: "700" }}>₹{selectedCustomer.AdvanceDeposit || selectedCustomer.user.AdvanceDeposit}</span>
              </p>
            </div>

            <div style={{ display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center" }}>
              <button
                onClick={() => handleTransactions(selectedCustomer)}
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                💰 Add Transaction
              </button>

              <select
                value={proofStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="input-focus"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600"
                }}
              >
                <option value="unverified">Unverified</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <button
              onClick={handleStatusUpdate}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                border: "none",
                borderRadius: "10px",
                color: "#1a1a1a",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.4)"
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
  )
}

export default CustomerDetailsModal