import React from "react";

const CustDasTransHist = ({filteredTransactions,typeColors}) => {
  return (
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
          <tr
            style={{
              background:
                "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%)",
              borderBottom: "2px solid rgba(212, 175, 55, 0.3)",
            }}
          >
            <th
              style={{
                padding: "16px",
                textAlign: "left",
                fontWeight: "700",
                color: "#D4AF37",
                borderTopLeftRadius: "12px",
              }}
            >
              Type
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "right",
                fontWeight: "700",
                color: "#D4AF37",
              }}
            >
              Amount
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "left",
                fontWeight: "700",
                color: "#D4AF37",
              }}
            >
              Remarks
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "right",
                fontWeight: "700",
                color: "#D4AF37",
              }}
            >
              Updated Due
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "right",
                fontWeight: "700",
                color: "#D4AF37",
              }}
            >
              Updated Advance
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "right",
                fontWeight: "700",
                color: "#D4AF37",
              }}
            >
              Updated DigitalGold
            </th>
            <th
              style={{
                padding: "16px",
                textAlign: "center",
                fontWeight: "700",
                color: "#D4AF37",
                borderTopRightRadius: "12px",
              }}
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t, index) => (
            <tr
              key={t._id}
              style={{
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(45, 45, 45, 0.3)"
                    : "rgba(30, 30, 30, 0.3)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(212, 175, 55, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0
                    ? "rgba(45, 45, 45, 0.3)"
                    : "rgba(30, 30, 30, 0.3)")
              }
            >
              <td style={{ padding: "14px 16px" }}>
                <span
                  style={{
                    backgroundColor: typeColors[t.transactionType] || "#6b7280",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#fff",
                    display: "inline-block",
                    textTransform: "capitalize",
                  }}
                >
                  {t.transactionType.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "right",
                  fontWeight: "700",
                  color: "#fff",
                  fontSize: "15px",
                }}
              >
                ₹{t.amount.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  color: "rgba(255,255,255,0.7)",
                  fontStyle: t.remarks ? "normal" : "italic",
                }}
              >
                {t.remarks || "No remarks"}
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color: t.updatedDue > 0 ? "#ef4444" : "#10b981",
                }}
              >
                ₹{t.updatedDue.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color:
                    t.updatedAdvance > 0 ? "#10b981" : "rgba(255,255,255,0.5)",
                }}
              >
                ₹{t.updatedAdvance.toLocaleString()}
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "right",
                  fontWeight: "600",
                  color:
                    t.updatedAdvance > 0
                      ? "#eaa419ff"
                      : "rgba(255,255,255,0.5)",
                }}
              >
                {t.DigitalGoldWeight.toLocaleString()} Gm
              </td>
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                }}
              >
                {new Date(t.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                <br />
                <span
                  style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}
                >
                  {new Date(t.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustDasTransHist;
