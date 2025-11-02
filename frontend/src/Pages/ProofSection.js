import axios from 'axios';
import { useEffect, useState } from 'react';

const ProofSection = () => {
  const [AllProofs, setAllProofs] = useState([]);
  const [selectedCustomer, SetselectedCustomer] = useState(null);
  const [showCustomerModal, setshowCustomerModal] = useState(false);
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [TransactionType, setTransactionType] = useState("");
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [proofStatus, setproofStatus] = useState("unverified");
  const [selectedProof, setSelectedProof] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [zoomProof, setZoomProof] = useState(null);
  
  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/paymentproof/getAll");
        setAllProofs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProofs();
  }, []);

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };

  const OpenCustomerModal = (proof, customer) => {
    SetselectedCustomer({ ...customer });
    setSelectedProof(proof);
    setproofStatus(proof.status || "unverified");
    setTransactionType(proof.transactiontype);
    SetAmount(proof.transactionAmount);
    SetRemarks(proof.message);
    setshowCustomerModal(true);
  };

  const handleTransactions = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowTransactionModal(true);
  };

  const handleTransactionSave = async () => {
    setshowTransactionModal(false);
    const Data = { transactionType: TransactionType, amount: Amount, remarks: Remarks , DigitalGoldAmount: selectedCustomer.DigitalGoldAmount, DigitalGoldWeight: selectedCustomer.DigitalGoldWeight };

    try {
      const res = await axios.post(`http://localhost:5000/api/transaction/add/${selectedCustomer._id}`, Data);

      SetselectedCustomer((prev) => ({
        ...prev,
        DueAmount: res.data.updatedCustomer.DueAmount,
        AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit,
        DigitalGoldAmount: res.data.updatedCustomer.DigitalGoldAmount,
        DigitalGoldWeight: res.data.updatedCustomer.DigitalGoldWeight,
      }));

      setAllProofs((prev) =>
        prev.map((p) =>
          p.user._id === selectedCustomer._id
            ? { ...p, user: { ...p.user, DueAmount: res.data.updatedCustomer.DueAmount, AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit } }
            : p
        )
      );

      SetAmount(0);
      SetRemarks("");
      setTransactionType("");
    } catch (error) {
      console.log(error);
      alert("Failed to add transaction");
    }
  };

  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };

  const handleStatusChange = (value) => {
    setproofStatus(value);
  };

  const handleStatusUpdate = async () => {
    if (!selectedProof) return alert("No proof selected!");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/customer/paymentproof/update/${selectedProof._id}`,
        { status: proofStatus }
      );

      if (res.data.success) {
        setshowCustomerModal(false);
        setAllProofs((prev) =>
          prev.map((p) => (p._id === selectedProof._id ? { ...p, status: proofStatus } : p))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Error in updating proof status");
    }
  };

  const filteredProofs = filterStatus === "all"
    ? AllProofs
    : AllProofs.filter(p => p.status === filterStatus);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "30px 20px"
    }}>
      <style>
        {`
          .proof-card { transition: all 0.3s ease; }
          .proof-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3); }
          .input-focus:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2); }
        `}
      </style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "30px",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <h2 style={{ color: "#D4AF37", fontSize: "28px", fontWeight: "700", margin: 0 }}>
            💳 Payment Proofs
          </h2>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "rgba(45, 45, 45, 0.8)",
              color: "#D4AF37",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <option value="all">All Proofs</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Proof Cards */}
        {filteredProofs.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {filteredProofs.map((proof) => (
              <div
                key={proof._id}
                className="proof-card"
                style={{
                  background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: statusColors[proof.status] || "#aaa",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}>
                  {proof.status}
                </div>

                <h3 style={{ color: "#D4AF37", fontSize: "18px", marginBottom: "12px", fontWeight: "700" }}>
                  {proof.user.name}
                </h3>

                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "15px" }}>
                  <p style={{ margin: "5px 0" }}>📱 {proof.user.phoneNo}</p>
                  <p style={{ margin: "5px 0" }}>📍 {proof.user.address}</p>
                </div>

                <div style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.3)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Amount</span>
                    <span style={{ color: "#D4AF37", fontSize: "16px", fontWeight: "700" }}>
                      ₹{proof.transactionAmount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Type</span>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>
                      {proof.transactiontype}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Txn ID</span>
                    <span style={{ color: "#fff", fontSize: "13px" }}>{proof.transactionID}</span>
                  </div>
                </div>

                {proof.message && (
                  <p style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    fontStyle: "italic",
                    marginBottom: "12px",
                    padding: "8px",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "6px"
                  }}>
                    💬 {proof.message}
                  </p>
                )}

                <div style={{ position: "relative" }}>
                  <img
                    src={`http://localhost:5000${proof.proofUrl}`}
                    alt="Payment Proof"
                    onClick={() => setZoomProof(proof)}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "12px",
                      border: "2px solid rgba(212, 175, 55, 0.3)",
                      cursor: "zoom-in",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "10px",
                    background: "rgba(0,0,0,0.7)",
                    color: "#D4AF37",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "600",
                    pointerEvents: "none"
                  }}>
                    🔍 Click to zoom
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 242, 242, 1)" }}>
                    {new Date(proof.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <button
                  onClick={() => OpenCustomerModal(proof, proof.user)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
                  }}
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(45,45,45,0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>📭</div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              No payment proofs found
            </p>
          </div>
        )}
      </div>

       {/* Customer Modal  */}
      {showCustomerModal && selectedCustomer && (
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
              <p style={{ margin: "10px 0" }}><strong>Name:</strong> {selectedCustomer.name}</p>
              <p style={{ margin: "10px 0" }}><strong>Phone:</strong> {selectedCustomer.phoneNo}</p>
              <p style={{ margin: "10px 0" }}><strong>Address:</strong> {selectedCustomer.address}</p>
              <p style={{ margin: "10px 0" }}>
                <strong>Due:</strong> <span style={{ color: "#ff4d4d", fontWeight: "700" }}>₹{selectedCustomer.DueAmount}</span>
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Advance:</strong> <span style={{ color: "#28a745", fontWeight: "700" }}>₹{selectedCustomer.AdvanceDeposit}</span>
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
      )}

    {/* Transaction Modal (updated to match customer modal UI) */}
      {showTransactionModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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

            <h2 style={{ color: "#D4AF37", fontSize: "24px", marginBottom: "25px" }}>
              Add Transaction
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "25px" }}>
              {selectedCustomer.name}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  Transaction Type <span style={{ color: "#ff4d4d" }}>*</span>
                </label>
                <select
                  value={TransactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    fontSize: "14px",
                    background: "#2d2d2d",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <option value="">Select transaction type</option>
                  <option value="duePayment">💰 Pay Due Amount</option>
                  <option value="advanceDeposit">💵 Add Advance Payment</option>
                  <option value="digitalGold">💎 Pay for Digital Gold</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  Amount <span style={{ color: "#ff4d4d" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    color: "#D4AF37",
                    fontWeight: "600"
                  }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    value={Amount}
                    onChange={(e) => SetAmount(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 38px",
                      borderRadius: "8px",
                      border: "1px solid rgba(212, 175, 55, 0.5)",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      background: "#2d2d2d",
                      color: "#fff"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  Remarks
                </label>
                <textarea
                  value={Remarks}
                  placeholder="Add notes or description (optional)"
                  onChange={(e) => SetRemarks(e.target.value)}
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    fontFamily: "inherit",
                    background: "#2d2d2d",
                    color: "#fff"
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
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
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
                      ? "rgba(212, 175, 55, 0.3)"
                      : "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    color: (!TransactionType || !Amount) ? "rgba(255,255,255,0.5)" : "#1a1a1a",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: (!TransactionType || !Amount) ? "not-allowed" : "pointer",
                    boxShadow: (!TransactionType || !Amount)
                      ? "none"
                      : "0 4px 12px rgba(212, 175, 55, 0.4)"
                  }}
                >
                  Save Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Zoom Modal with Transaction Details */}
      {zoomProof && (
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
        </div>
      )}

    </div>
  );
};

export default ProofSection;