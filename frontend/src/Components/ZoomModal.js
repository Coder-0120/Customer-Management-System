import React from 'react'

const ZoomModal = ({setZoomProof,zoomProof}) => {
  return (
  <div
          onClick={() => setZoomProof(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.72)",
            backdropFilter:"blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            cursor: "zoom-out",
            padding: "20px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "20px",
              maxWidth: "1200px",
              width: "100%",
              maxHeight: "90vh"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:5000${zoomProof.proofUrl}`}
              alt="Zoomed Proof"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                borderRadius: "10px",
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                objectFit: "contain",
                background: "#fff"
              }}
            />

            <div style={{
              background: "linear-gradient(135deg, rgba(45,45,45,0.98) 0%, rgba(30,30,30,0.98) 100%)",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              overflowY: "auto",
              maxHeight: "90vh"
            }}>
              <h3 style={{ color: "#D4AF37", fontSize: "18px", marginBottom: "20px" }}>
                Transaction Details
              </h3>

              <div style={{
                background: "rgba(212, 175, 55, 0.1)",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                border: "1px solid rgba(212, 175, 55, 0.3)"
              }}>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "5px" }}>
                  TRANSACTION ID
                </div>
                <div style={{
                  fontSize: "16px",
                  color: "#D4AF37",
                  fontWeight: "700",
                  fontFamily: "monospace",
                  wordBreak: "break-all"
                }}>
                  {zoomProof.transactionID}
                </div>
              </div>

              <div style={{
                background: "rgba(212, 175, 55, 0.1)",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                border: "1px solid rgba(212, 175, 55, 0.3)"
              }}>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "5px" }}>
                  AMOUNT
                </div>
                <div style={{ fontSize: "24px", color: "#FFD700", fontWeight: "700" }}>
                  ₹{zoomProof.transactionAmount.toLocaleString()}
                </div>
              </div>

              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
                <p style={{ margin: "10px 0" }}>
                  <strong>Customer:</strong> {zoomProof.user.name}
                </p>
                <p style={{ margin: "10px 0" }}>
                  <strong>Phone:</strong> {zoomProof.user.phoneNo}
                </p>
                <p style={{ margin: "10px 0" }}>
                  <strong>Type:</strong> {zoomProof.transactiontype}
                </p>
                <p style={{ margin: "10px 0" }}>
                  <strong>Date:</strong> {new Date(zoomProof.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              {zoomProof.message && (
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "12px",
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  fontStyle: "italic",
                  marginTop: "15px"
                }}>
                  💬 {zoomProof.message}
                </div>
              )}

              <button
                onClick={() => setZoomProof(null)}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  background: "#ff4757",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>  )
}

export default ZoomModal