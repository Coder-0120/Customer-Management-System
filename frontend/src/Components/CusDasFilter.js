import React from 'react'

const CusDasFilter = ({historyFilterType,setHistoryFilterType,historyStartDate,setHistoryStartDate,historyEndDate,setHistoryEndDate,clearFilters,filteredTransactions,transactions}) => {
  return (
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
                backgroundColor: "#2d2d2d",
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
              <option value="buydigitalGold">💎 Buy Digital Gold</option>
              <option value="sellDigitalGold">💰 Sell Digital Gold</option>
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
  )
}

export default CusDasFilter