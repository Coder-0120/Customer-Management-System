import axios from "axios";
import React, { useEffect, useState } from "react";

const OwnerDashboard = () => {
  const [AllCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, SetselectedCustomer] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [TransactionType, setTransactionType] = useState("");
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [History, setHistory] = useState([]);
  const [showHistoryModal, SetshowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyFilterType, setHistoryFilterType] = useState("");
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/AllCustomers");
        setAllCustomers(res.data.data);
      } catch (error) {
        console.log("Error in fetching all customers..", error);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/customer/delete/${id}`);
      setAllCustomers(AllCustomers.filter((customer) => customer._id !== id));
      alert("Customer deleted Successfully..");
    } catch (error) {
      alert("failed to delete customer..");
    }
  };

  const handleEdit = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowModal(true);
  };

  const handleSave = async () => {
    setshowModal(false);
    try {
      await axios.put(`http://localhost:5000/api/customer/update/${selectedCustomer._id}`, selectedCustomer);
      setAllCustomers((prev) =>
        prev.map((cust) => (cust._id === selectedCustomer._id ? selectedCustomer : cust))
      );
      alert("Updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update");
    }
  };

  const handleEditTransaction = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowTransactionModal(true);
  };
const handleTransactionSave = async () => {
  setshowTransactionModal(false);
  const Data = { transactionType: TransactionType, amount: Number(Amount), remarks: Remarks };

  try {
    const res = await axios.post(
      `http://localhost:5000/api/transaction/add/${selectedCustomer._id}`,
      Data
    );

    if (res.data.success) {
      alert(res.data.message || "Transaction saved!");

      // Update state in UI
      setAllCustomers((prev) =>
        prev.map((cust) =>
          cust._id === selectedCustomer._id
            ? {
                ...cust,
                DueAmount: res.data.updatedCustomer.DueAmount,
                AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit,
              }
            : cust
        )
      );

      // Update local selectedCustomer for consistency
      SetselectedCustomer(res.data.updatedCustomer);
    } else {
      alert(res.data.message || "Error in adding transaction");
    }

    SetAmount(0);
    SetRemarks("");
    setTransactionType("");
  } catch (error) {
    console.error("Full error:", error);
    const errorMessage = error.response?.data?.message || "Failed to add transaction";
    alert(errorMessage);
  }
};


  const HandleHistory = (customer) => {
    SetselectedCustomer(customer);
    SetshowHistoryModal(true);
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!selectedCustomer) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/transaction/history/${selectedCustomer._id}`);
        setHistory(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactionHistory();
  }, [selectedCustomer]);

  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };

  const typeColors = {
    duePayment: "#ff4d4d",
    dueIncrease: "#ffa500",
    advanceDeposit: "#28a745",
    advanceWithdraw: "#007bff",
  };

  const filteredCustomers = AllCustomers.filter((customer) => {
    if (!searchTerm) return true;
    return (
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNo?.toString().includes(searchTerm)
    );
  });

  const filteredHistory = (History || []).filter((t) => {
    if (!t) return false;
    const typeMatch = historyFilterType ? t.transactionType === historyFilterType : true;
    const created = t.createdAt ? new Date(t.createdAt) : null;
    const start = historyStartDate ? new Date(historyStartDate) : null;
    const end = historyEndDate ? new Date(historyEndDate) : null;
    const dateMatch = (!start || (created && created >= start)) && (!end || (created && created <= end));
    return typeMatch && dateMatch;
  });

  // Calculate stats
  const totalDue = AllCustomers.reduce((sum, c) => sum + (c.DueAmount || 0), 0);
  const totalAdvance = AllCustomers.reduce((sum, c) => sum + (c.AdvanceDeposit || 0), 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "20px"
    }}>
      <style>
        {`
          .input-focus:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2); }
          .card-hover { transition: all 0.3s ease; }
          .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212, 175, 55, 0.25); }
          .stat-card { transition: all 0.3s ease; }
          .stat-card:hover { transform: scale(1.05); }
        `}
      </style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header with Stats */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "30px",
          border: "1px solid rgba(212, 175, 55, 0.3)"
        }}>
          <h1 style={{
            color: "#D4AF37",
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "25px",
            textAlign: "center"
          }}>
            💼 Owner Dashboard
          </h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            <div className="stat-card" style={{
              background: "rgba(212, 175, 55, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: "600", marginBottom: "8px" }}>TOTAL CUSTOMERS</div>
              <div style={{ fontSize: "32px", color: "#FFD700", fontWeight: "700" }}>{AllCustomers.length}</div>
            </div>

            <div className="stat-card" style={{
              background: "rgba(255, 77, 77, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 77, 77, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#ff4d4d", fontWeight: "600", marginBottom: "8px" }}>TOTAL DUE</div>
              <div style={{ fontSize: "32px", color: "#ff4d4d", fontWeight: "700" }}>₹{totalDue.toLocaleString()}</div>
            </div>

            <div className="stat-card" style={{
              background: "rgba(40, 167, 69, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(40, 167, 69, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#28a745", fontWeight: "600", marginBottom: "8px" }}>TOTAL ADVANCE</div>
              <div style={{ fontSize: "32px", color: "#28a745", fontWeight: "700" }}>₹{totalAdvance.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="🔍 Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-focus"
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "rgba(45, 45, 45, 0.5)",
              color: "#fff",
              fontSize: "14px"
            }}
          />

          <div style={{
            background: "rgba(45, 45, 45, 0.5)",
            borderRadius: "10px",
            padding: "5px",
            display: "flex",
            gap: "5px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "8px 16px",
                background: viewMode === "grid" ? "#D4AF37" : "transparent",
                color: viewMode === "grid" ? "#1a1a1a" : "#D4AF37",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "8px 16px",
                background: viewMode === "list" ? "#D4AF37" : "transparent",
                color: viewMode === "list" ? "#1a1a1a" : "#D4AF37",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              ☰ List
            </button>
          </div>
        </div>

        {/* Customer Display */}
        {filteredCustomers.length > 0 ? (
          viewMode === "grid" ? (
            // Grid View
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
          ) : (
            // List View
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
        ) : (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(45,45,45,0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              {searchTerm ? `No customers found matching "${searchTerm}"` : "No customers found"}
            </p>
          </div>
        )}
      </div>

       {/* Edit Modal */}
      {showModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
          onClick={() => setshowModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              padding: "35px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .edit-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
        `}
            </style>

            <button
              onClick={() => setshowModal(false)}
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

            <div style={{
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom: "2px solid #e0e0e0"
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "600",
                color: "#2c3e50",
                marginBottom: "5px"
              }}>
                Edit Customer
              </h2>
              <p style={{
                margin: 0,
                fontSize: "14px",
                color: "#7f8c8d"
              }}>
                Update customer information
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Customer Name <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    SetselectedCustomer({
                      ...selectedCustomer,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter customer name"
                  className="edit-input"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    backgroundColor: "#fff"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Address <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <textarea
                  value={selectedCustomer.address}
                  onChange={(e) =>
                    SetselectedCustomer({
                      ...selectedCustomer,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter customer address"
                  className="edit-input"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    fontFamily: "inherit",
                    backgroundColor: "#fff"
                  }}
                />
              </div>

              <div style={{
                background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #c8e6c9"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px"
                }}>
                  <span style={{ fontSize: "18px" }}>ℹ️</span>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#2e7d32"
                  }}>
                    Financial Information
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#558b2f",
                  lineHeight: "1.5"
                }}>
                  Due and Advance amounts can only be modified through transactions. Use the "Add Transaction" button to update financial details.
                </p>
              </div>

              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px"
              }}>
                <button
                  onClick={() => setshowModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: "#95a5a6",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(149,165,166,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#7f8c8d";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(149,165,166,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#95a5a6";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(149,165,166,0.3)";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!selectedCustomer.name || !selectedCustomer.address}
                  style={{
                    flex: 1,
                    background: (!selectedCustomer.name || !selectedCustomer.address)
                      ? "#bdc3c7"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: (!selectedCustomer.name || !selectedCustomer.address) ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: (!selectedCustomer.name || !selectedCustomer.address)
                      ? "none"
                      : "0 2px 8px rgba(102,126,234,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCustomer.name && selectedCustomer.address) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(102,126,234,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCustomer.name && selectedCustomer.address) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(102,126,234,0.3)";
                    }
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      {showTransactionModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
          onClick={() => {
            setshowTransactionModal(false);
            resetTransactionFields();
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              padding: "35px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .transaction-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          .transaction-select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
        `}
            </style>

            <button
              onClick={() => {
                setshowTransactionModal(false);
                resetTransactionFields();
              }}
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

            <div style={{
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom: "2px solid #e0e0e0"
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "600",
                color: "#2c3e50",
                marginBottom: "5px"
              }}>
                Add Transaction
              </h2>
              <p style={{
                margin: 0,
                fontSize: "14px",
                color: "#7f8c8d"
              }}>
                {selectedCustomer.name}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Transaction Type <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <select
                  value={TransactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="transaction-select"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    color: TransactionType ? "#2c3e50" : "#95a5a6"
                  }}
                >
                  <option value="" >Select transaction type</option>
                  <option value="duePayment">💰 Pay Due Amount</option>
                  <option value="dueIncrease">📈 Increase Due Amount</option>
                  <option value="advanceDeposit">💵 Add Advance Payment</option>
                  <option value="advanceWithdraw">💸 Withdraw from Advance</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Amount <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    color: "#7f8c8d",
                    fontWeight: "600"
                  }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    value={Amount}
                    onChange={(e) => SetAmount(Number(e.target.value))}
                    placeholder="0"
                    className="transaction-input"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 38px",
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      backgroundColor: "#fff"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Remarks
                </label>
                <textarea
                  value={Remarks}
                  placeholder="Add notes or description (optional)"
                  onChange={(e) => SetRemarks(e.target.value)}
                  className="transaction-input"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    fontFamily: "inherit",
                    backgroundColor: "#fff"
                  }}
                />
              </div>

              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px"
              }}>
                <button
                  onClick={() => {
                    setshowTransactionModal(false);
                    resetTransactionFields();
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#95a5a6",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(149,165,166,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#7f8c8d";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(149,165,166,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#95a5a6";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(149,165,166,0.3)";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransactionSave}
                  disabled={!TransactionType || !Amount}
                  style={{
                    flex: 1,
                    background: (!TransactionType || !Amount)
                      ? "#bdc3c7"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: (!TransactionType || !Amount) ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: (!TransactionType || !Amount)
                      ? "none"
                      : "0 2px 8px rgba(102,126,234,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    if (TransactionType && Amount) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(102,126,234,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (TransactionType && Amount) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(102,126,234,0.3)";
                    }
                  }}
                >
                  Save Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => SetshowHistoryModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              padding: "35px",
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "15px",
                borderBottom: "2px solid #e0e0e0",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#2c3e50" }}>
                {selectedCustomer.name}
              </h2>
              <button
                onClick={() => SetshowHistoryModal(false)}
                style={{
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
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(255,71,87,0.3)",
                }}
                className="close-btn"
              >
                ✖
              </button>

              <style>
                {`
  .close-btn:hover {
    background: #ee5a6f;
    transform: rotate(90deg);
  }
`}
              </style>

            </div>

            {/* Filter Section */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <select
                value={historyFilterType}
                onChange={(e) => setHistoryFilterType(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              >
                <option value="">All Types</option>
                <option value="duePayment">Pay Due Amount</option>
                <option value="dueIncrease">Increase Due Amount</option>
                <option value="advanceDeposit">Add Advance Payment</option>
                <option value="advanceWithdraw">Withdraw from Advance</option>
              </select>

              <input
                type="date"
                value={historyStartDate}
                onChange={(e) => setHistoryStartDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="date"
                value={historyEndDate}
                onChange={(e) => setHistoryEndDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            {/* Filtered Table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ background: "#667eea", color: "#fff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left" }}>Type</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Amount</th>
                    <th style={{ padding: "14px 16px", textAlign: "left" }}>Remarks</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Updated Due</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Updated Advance</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(History || []).filter((t) => {
                    if (!t) return false; 

                    const typeMatch = historyFilterType ? t.transactionType === historyFilterType : true;

                    const created = t.createdAt ? new Date(t.createdAt) : null;
                    const start = historyStartDate ? new Date(historyStartDate) : null;
                    const end = historyEndDate ? new Date(historyEndDate) : null;
                    const dateMatch = (!start || (created && created >= start)) && (!end || (created && created <= end));

                    return typeMatch && dateMatch;
                  }).map((t, index) => (
                    <tr key={t?._id || index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            backgroundColor: typeColors[t?.transactionType] || "#95a5a6",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#fff",
                            textTransform: "capitalize",
                            display: "inline-block",
                          }}
                        >
                          {t?.transactionType || "N/A"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600" }}>
                        ₹{(t?.amount || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", fontStyle: t?.remarks ? "normal" : "italic", color: "#7f8c8d" }}>
                        {t?.remarks || "No remarks"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", color: t?.updatedDue > 0 ? "#e74c3c" : "#27ae60" }}>
                        ₹{(t?.updatedDue || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", color: t?.updatedAdvance > 0 ? "#27ae60" : "#95a5a6" }}>
                        ₹{(t?.updatedAdvance || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px", color: "#7f8c8d" }}>
                        {t?.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                        <br />
                        <span style={{ fontSize: "11px", color: "#95a5a6" }}>
                          {t?.createdAt ? new Date(t.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OwnerDashboard;