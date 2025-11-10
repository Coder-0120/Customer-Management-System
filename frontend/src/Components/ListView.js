import React from 'react'

const ListView = ({filteredCustomers,handleEdit,handleDelete,handleEditTransaction,HandleHistory}) => {
  return (
     <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredCustomers.map((customer) => (
                <div
                  key={customer._id}
                  className="card-hover"
                  style={{
                    background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <h3 style={{ color: "#D4AF37", fontSize: "18px", marginBottom: "5px" }}>
                      {customer.name}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                      📱 {customer.phoneNo} | 📍 {customer.address}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "15px" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#ff4d4d", fontWeight: "600" }}>DUE</div>
                      <div style={{ fontSize: "16px", color: "#ff4d4d", fontWeight: "700" }}>
                        ₹{customer.DueAmount.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#28a745", fontWeight: "600" }}>ADVANCE</div>
                      <div style={{ fontSize: "16px", color: "#28a745", fontWeight: "700" }}>
                        ₹{customer.AdvanceDeposit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEdit(customer)}
                      style={{
                        padding: "8px 12px",
                        background: "#D4AF37",
                        border: "none",
                        borderRadius: "6px",
                        color: "#1a1a1a",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      style={{
                        padding: "8px 12px",
                        background: "#ff4757",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => handleEditTransaction(customer)}
                      style={{
                        padding: "8px 12px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      💰
                    </button>
                    <button
                      onClick={() => HandleHistory(customer)}
                      style={{
                        padding: "8px 12px",
                        background: "#8b5cf6",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
  )
}

export default ListView