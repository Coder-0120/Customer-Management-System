import React from 'react'

const HistoryModal = ({SetshowHistoryModal,selectedCustomer,historyFilterType,setHistoryFilterType,historyStartDate,setHistoryStartDate,historyEndDate,setHistoryEndDate,typeColors,filteredHistory}) => {
  return (
    <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
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
        background: "linear-gradient(135deg, rgba(45,45,45,0.98) 0%, rgba(30,30,30,0.98) 100%)",
        padding: "35px",
        borderRadius: "16px",
        maxWidth: "900px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        position: "relative",
        border: "1px solid rgba(212, 175, 55, 0.3)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          paddingBottom: "15px",
          borderBottom: "2px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#D4AF37" }}>
          {selectedCustomer.name}
        </h2>
        <button
          onClick={() => {SetshowHistoryModal(false)
            setHistoryFilterType("");
      setHistoryStartDate("");
      setHistoryEndDate("");
      setHistoryFilterType("");
          }}
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
      </div>

      {/* Filter Section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select
          value={historyFilterType}
          onChange={(e) => setHistoryFilterType(e.target.value)}
          style={{ 
            padding: "10px 12px", 
            borderRadius: "8px", 
            border: "1px solid rgba(212, 175, 55, 0.5)",
            background: "#2d2d2d",
            color: "#fff",
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          <option value="">All Types</option>
          <option value="duePayment">Pay Due Amount</option>
          <option value="dueIncrease">Increase Due Amount</option>
          <option value="advanceDeposit">Add Advance Payment</option>
          <option value="advanceWithdraw">Withdraw from Advance</option>
          <option value="buydigitalGold">Buy DigitalGold</option>
          <option value="sellDigitalGold">Sell DigitalGold</option>
        </select>

        <input
          type="date"
          value={historyStartDate}
          onChange={(e) => setHistoryStartDate(e.target.value)}
          style={{ 
            padding: "10px 12px", 
            borderRadius: "8px", 
            border: "1px solid rgba(212, 175, 55, 0.5)",
            background: "#2d2d2d",
            color: "#fff",
            fontSize: "13px"
          }}
        />
        <input
          type="date"
          value={historyEndDate}
          onChange={(e) => setHistoryEndDate(e.target.value)}
          style={{ 
            padding: "10px 12px", 
            borderRadius: "8px", 
            border: "1px solid rgba(212, 175, 55, 0.5)",
            background: "#2d2d2d",
            color: "#fff",
            fontSize: "13px"
          }}
        />
      </div>

      {/* Filtered Data */}
      {(() => {
        const totalTransactions = filteredHistory.length;

        return (
          <>
            <div style={{backgroundColor:"#2d2d2d", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px",color:"#fff", fontWeight:"600"}}>
              Total Transactions: {totalTransactions}
            </div>

            {/* Table */}
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
                  <tr style={{ background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#1a1a1a", fontWeight: "700" }}>Type</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", color: "#1a1a1a", fontWeight: "700" }}>Amount</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", color: "#1a1a1a", fontWeight: "700" }}>Remarks</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", color: "#1a1a1a", fontWeight: "700" }}>Updated Due</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", color: "#1a1a1a", fontWeight: "700" }}>Updated Advance</th>
                    <th style={{ padding: "14px 16px", textAlign: "right", color: "#1a1a1a", fontWeight: "700" }}>Updated DigitalGold</th>
                    <th style={{ padding: "14px 16px", textAlign: "center", color: "#1a1a1a", fontWeight: "700" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((t, index) => (
                    <tr key={t?._id || index} style={{ 
                      backgroundColor: index % 2 === 0 ? "rgba(45,45,45,0.5)" : "rgba(35,35,35,0.5)",
                      borderBottom: "1px solid rgba(212, 175, 55, 0.1)"
                    }}>
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
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", color: "#fff" }}>
                        ₹{(t?.amount || 0).toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "12px 16px", 
                        fontStyle: t?.remarks ? "normal" : "italic", 
                        color: t?.remarks ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)"
                      }}>
                        {t?.remarks || "No remarks"}
                      </td>
                      <td style={{ 
                        padding: "12px 16px", 
                        textAlign: "right", 
                        color: t?.updatedDue > 0 ? "#ff4d4d" : "#28a745",
                        fontWeight: "600"
                      }}>
                        ₹{(t?.updatedDue || 0).toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "12px 16px", 
                        textAlign: "right", 
                        color: t?.updatedAdvance > 0 ? "#28a745" : "rgba(255,255,255,0.4)",
                        fontWeight: "600"
                      }}>
                        ₹{(t?.updatedAdvance || 0).toLocaleString()}
                      </td>
                      <td style={{ 
                        padding: "12px 16px", 
                        textAlign: "right", 
                        color: t?.DigitalGoldWeight > 0 ? "#D4AF37" : "rgba(255,255,255,0.4)",
                        fontWeight: "600"
                      }}>
                        {(t?.DigitalGoldWeight || 0).toLocaleString()} gm
                      </td>
                      <td style={{ 
                        padding: "12px 16px", 
                        textAlign: "center", 
                        fontSize: "13px", 
                        color: "rgba(255,255,255,0.7)"
                      }}>
                        {t?.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                        <br />
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                          {t?.createdAt ? new Date(t.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(212, 175, 55, 0.1)",
                borderRadius: "8px",
                padding: "12px 20px",
                fontWeight: "600",
                color: "#fff",
                animation: "fadeIn 0.4s ease"
              }}
            >
            </div>
          </>
        );
      })()}
    </div>
  </div>
  )
}

export default HistoryModal