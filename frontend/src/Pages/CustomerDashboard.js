import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CustomerDashboard = () => {
  const customerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
  const [transactions, setTransactions] = useState([]);
  const [historyFilterType, setHistoryFilterType] = useState("");
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transaction/history/${customerInfo._id}`);
        setTransactions(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, [customerInfo._id]);

  const typeColors = {
    duePayment: "#10b981",
    dueIncrease: "#ef4444",
    advanceDeposit: "#3b82f6",
    advanceWithdraw: "#f59e0b",
  };

  const filteredTransactions = transactions.filter((t) => {
    if (historyFilterType && t.transactionType !== historyFilterType) {
      return false;
    }

    const transactionDate = new Date(t.createdAt);
    if (historyStartDate) {
      const startDate = new Date(historyStartDate);
      if (transactionDate < startDate) return false;
    }
    if (historyEndDate) {
      const endDate = new Date(historyEndDate);
      endDate.setHours(23, 59, 59, 999);
      if (transactionDate > endDate) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setHistoryFilterType("");
    setHistoryStartDate("");
    setHistoryEndDate("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "40px 20px"
    }}>
      <style>
        {`
          .filter-select:focus, .filter-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          }
        `}
      </style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{
          textAlign: "center",
          color: "#D4AF37",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "30px",
          textShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
        }}>
          💎 Customer Dashboard
        </h1>

        {/* Account Card */}
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
                {customerInfo.name}
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
                {customerInfo.phoneNo}
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
                {customerInfo.address}
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
                {customerInfo.DigitalGoldWeight} g
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
                ₹{customerInfo.DueAmount.toLocaleString()}
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
                ₹{customerInfo.AdvanceDeposit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
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
            Transaction History
          </h2>

          {/* Filters */}
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            marginBottom: "25px", 
            flexWrap: "wrap",
            alignItems: "center"
          }}>
            <select
              value={historyFilterType}
              onChange={(e) => setHistoryFilterType(e.target.value)}
              className="filter-select"
              style={{ 
                padding: "12px 16px", 
                borderRadius: "10px", 
                border: "1px solid rgba(212, 175, 55, 0.3)",
                fontSize: "14px",
                backgroundColor: "rgba(45, 45, 45, 0.5)",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <option value="">All Types</option>
              <option value="duePayment">💰 Pay Due Amount</option>
              <option value="dueIncrease">📈 Increase Due Amount</option>
              <option value="advanceDeposit">💵 Add Advance Payment</option>
              <option value="advanceWithdraw">💸 Withdraw from Advance</option>
            </select>

            <input
              type="date"
              value={historyStartDate}
              onChange={(e) => setHistoryStartDate(e.target.value)}
              placeholder="Start Date"
              className="filter-input"
              style={{ 
                padding: "12px 16px", 
                borderRadius: "10px", 
                border: "1px solid rgba(212, 175, 55, 0.3)",
                fontSize: "14px",
                backgroundColor: "rgba(45, 45, 45, 0.5)",
                color: "#fff",
                transition: "all 0.2s ease"
              }}
            />

            <input
              type="date"
              value={historyEndDate}
              onChange={(e) => setHistoryEndDate(e.target.value)}
              placeholder="End Date"
              className="filter-input"
              style={{ 
                padding: "12px 16px", 
                borderRadius: "10px", 
                border: "1px solid rgba(212, 175, 55, 0.3)",
                fontSize: "14px",
                backgroundColor: "rgba(45, 45, 45, 0.5)",
                color: "#fff",
                transition: "all 0.2s ease"
              }}
            />

            {(historyFilterType || historyStartDate || historyEndDate) && (
              <button
                onClick={clearFilters}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "rgba(107, 114, 128, 0.3)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(107, 114, 128, 0.5)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(107, 114, 128, 0.3)"}
              >
                Clear Filters
              </button>
            )}

            <div style={{
              marginLeft: "auto",
              fontSize: "14px",
              color: "rgba(212, 175, 55, 0.7)",
              fontWeight: "600"
            }}>
              {filteredTransactions.length} of {transactions.length} transactions
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "rgba(255,255,255,0.5)"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                {transactions.length === 0 ? "📋" : "🔍"}
              </div>
              <p style={{ fontSize: "16px", fontStyle: "italic" }}>
                {transactions.length === 0 
                  ? "No transactions found." 
                  : "No transactions match the selected filters."}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
                fontSize: "14px"
              }}>
                <thead>
                  <tr style={{
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%)",
                    borderBottom: "2px solid rgba(212, 175, 55, 0.3)"
                  }}>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "left", 
                      fontWeight: "700", 
                      color: "#D4AF37",
                      borderTopLeftRadius: "12px" 
                    }}>
                      Type
                    </th>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "right", 
                      fontWeight: "700", 
                      color: "#D4AF37" 
                    }}>
                      Amount
                    </th>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "left", 
                      fontWeight: "700", 
                      color: "#D4AF37" 
                    }}>
                      Remarks
                    </th>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "right", 
                      fontWeight: "700", 
                      color: "#D4AF37" 
                    }}>
                      Updated Due
                    </th>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "right", 
                      fontWeight: "700", 
                      color: "#D4AF37" 
                    }}>
                      Updated Advance
                    </th>
                    <th style={{ 
                      padding: "16px", 
                      textAlign: "center", 
                      fontWeight: "700", 
                      color: "#D4AF37",
                      borderTopRightRadius: "12px" 
                    }}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, index) => (
                    <tr
                      key={t._id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "rgba(45, 45, 45, 0.3)" : "rgba(30, 30, 30, 0.3)",
                        borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "rgba(45, 45, 45, 0.3)" : "rgba(30, 30, 30, 0.3)"}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          backgroundColor: typeColors[t.transactionType] || "#6b7280",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#fff",
                          display: "inline-block",
                          textTransform: "capitalize"
                        }}>
                          {t.transactionType.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </td>
                      <td style={{ 
                        padding: "14px 16px", 
                        textAlign: "right", 
                        fontWeight: "700", 
                        color: "#fff",
                        fontSize: "15px"
                      }}>
                        ₹{t.amount.toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "14px 16px", 
                        color: "rgba(255,255,255,0.7)", 
                        fontStyle: t.remarks ? "normal" : "italic" 
                      }}>
                        {t.remarks || "No remarks"}
                      </td>
                      <td style={{ 
                        padding: "14px 16px", 
                        textAlign: "right", 
                        fontWeight: "600", 
                        color: t.updatedDue > 0 ? "#ef4444" : "#10b981" 
                      }}>
                        ₹{t.updatedDue.toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "14px 16px", 
                        textAlign: "right", 
                        fontWeight: "600", 
                        color: t.updatedAdvance > 0 ? "#10b981" : "rgba(255,255,255,0.5)" 
                      }}>
                        ₹{t.updatedAdvance.toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "14px 16px", 
                        textAlign: "center", 
                        color: "rgba(255,255,255,0.7)", 
                        fontSize: "13px" 
                      }}>
                        {new Date(t.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                        <br />
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                          {new Date(t.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard