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
    duePayment: "#ff4d4d",
    dueIncrease: "#ffa500",
    advanceDeposit: "#28a745",
    advanceWithdraw: "#007bff",
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    // Filter by type
    if (historyFilterType && t.transactionType !== historyFilterType) {
      return false;
    }

    // Filter by date range
    const transactionDate = new Date(t.createdAt);
    if (historyStartDate) {
      const startDate = new Date(historyStartDate);
      if (transactionDate < startDate) return false;
    }
    if (historyEndDate) {
      const endDate = new Date(historyEndDate);
      endDate.setHours(23, 59, 59, 999); // Include entire end date
      if (transactionDate > endDate) return false;
    }

    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setHistoryFilterType("");
    setHistoryStartDate("");
    setHistoryEndDate("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <style>
        {`
          .filter-select:focus, .filter-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          }
        `}
      </style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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

        {/* Account Card */}
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
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "2px solid #e0e0e0"
          }}>
            Account Summary
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" }}>
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
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginTop: "20px"
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
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#dc2626" }}>
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
                Advance Deposit
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#059669" }}>
                ₹{customerInfo.AdvanceDeposit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Card */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "2px solid #e0e0e0"
          }}>
            Transaction History
          </h2>

          {/* Filters */}
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            marginBottom: "20px", 
            flexWrap: "wrap",
            alignItems: "center"
          }}>
            <select
              value={historyFilterType}
              onChange={(e) => setHistoryFilterType(e.target.value)}
              className="filter-select"
              style={{ 
                padding: "10px 14px", 
                borderRadius: "8px", 
                border: "2px solid #e0e0e0",
                fontSize: "14px",
                backgroundColor: "#fff",
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
                padding: "10px 14px", 
                borderRadius: "8px", 
                border: "2px solid #e0e0e0",
                fontSize: "14px",
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
                padding: "10px 14px", 
                borderRadius: "8px", 
                border: "2px solid #e0e0e0",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />

            {(historyFilterType || historyStartDate || historyEndDate) && (
              <button
                onClick={clearFilters}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#95a5a6",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#7f8c8d"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#95a5a6"}
              >
                Clear Filters
              </button>
            )}

            <div style={{
              marginLeft: "auto",
              fontSize: "14px",
              color: "#7f8c8d",
              fontWeight: "600"
            }}>
              {filteredTransactions.length} of {transactions.length} transactions
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#95a5a6"
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff"
                  }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: "600", borderTopLeftRadius: "8px" }}>Type</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600" }}>Amount</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: "600" }}>Remarks</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600" }}>Updated Due</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600" }}>Updated Advance</th>
                    <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: "600", borderTopRightRadius: "8px" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, index) => (
                    <tr
                      key={t._id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                        borderBottom: "1px solid #e9ecef"
                      }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          backgroundColor: typeColors[t.transactionType] || "#95a5a6",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#fff",
                          display: "inline-block",
                          textTransform: "capitalize"
                        }}>
                          {t.transactionType}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", color: "#2c3e50" }}>
                        ₹{t.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#7f8c8d", fontStyle: t.remarks ? "normal" : "italic" }}>
                        {t.remarks || "No remarks"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.updatedDue > 0 ? "#e74c3c" : "#27ae60" }}>
                        ₹{t.updatedDue.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.updatedAdvance > 0 ? "#27ae60" : "#95a5a6" }}>
                        ₹{t.updatedAdvance.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#7f8c8d", fontSize: "13px" }}>
                        {new Date(t.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                        <br />
                        <span style={{ fontSize: "11px", color: "#95a5a6" }}>
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