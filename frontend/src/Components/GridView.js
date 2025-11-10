import React from 'react'

const GridView = ({filteredCustomers,handleEdit,handleDelete,handleEditTransaction,HandleHistory}) => {
  return (
       <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px"
            }}>
              {filteredCustomers.map((customer) => (
                <div
                  key={customer._id}
                  className="card-hover"
                  style={{
                    background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
                    borderRadius: "16px",
                    padding: "25px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Decorative corner */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "80px",
                    height: "80px",
                    background: "radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)",
                    borderBottomLeftRadius: "100%"
                  }} />

                  <h3 style={{
                    color: "#D4AF37",
                    fontSize: "20px",
                    marginBottom: "15px",
                    fontWeight: "700"
                  }}>
                    {customer.name}
                  </h3>

                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: "5px 0" }}>
                      📱 {customer.phoneNo}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: "5px 0" }}>
                      📍 {customer.address}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: "5px 0" }}>
                      📍 {customer.DigitalGoldWeight} g (DigitalGold)
                    </p>
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px"
                  }}>
                    <div style={{
                      flex: 1,
                      background: "rgba(255,77,77,0.15)",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,77,77,0.3)"
                    }}>
                      <div style={{ fontSize: "10px", color: "#ff4d4d", fontWeight: "600" }}>DUE</div>
                      <div style={{ fontSize: "18px", color: "#ff4d4d", fontWeight: "700" }}>
                        ₹{customer.DueAmount.toLocaleString()}
                      </div>
                    </div>

                    <div style={{
                      flex: 1,
                      background: "rgba(40,167,69,0.15)",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(40,167,69,0.3)"
                    }}>
                      <div style={{ fontSize: "10px", color: "#28a745", fontWeight: "600" }}>ADVANCE</div>
                      <div style={{ fontSize: "18px", color: "#28a745", fontWeight: "700" }}>
                        ₹{customer.AdvanceDeposit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button
                      onClick={() => handleEdit(customer)}
                      style={{
                        padding: "10px",
                        background: "#D4AF37",
                        border: "none",
                        borderRadius: "8px",
                        color: "#1a1a1a",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      style={{
                        padding: "10px",
                        background: "#ff4757",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      onClick={() => handleEditTransaction(customer)}
                      style={{
                        padding: "10px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      💰 Transaction
                    </button>
                    <button
                      onClick={() => HandleHistory(customer)}
                      style={{
                        padding: "10px",
                        background: "#8b5cf6",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      📋 History
                    </button>
                  </div>
                </div>
              ))}
            </div>
  )
}

export default GridView