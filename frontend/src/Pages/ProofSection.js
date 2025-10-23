import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    unverified: "#ff4d4d",
    verified: "#28a745",
    pending: "#ffa500",
  };

  const OpenCustomerModal = (proof,customer) => {
    SetselectedCustomer({ ...customer });
    setSelectedProof(proof);
    setproofStatus(proof.status|| "Unverified")
    // to auto filled values in transaction modal during add new transactions(to update accouont)
    setTransactionType(proof.transactiontype);
    SetAmount(proof.transactionAmount);
    SetRemarks(proof.message);
    setshowCustomerModal(true);

  }
  const typeColors = {
    duePayment: "#ff4d4d",
    dueIncrease: "#ffa500",
    advanceDeposit: "#28a745",
    advanceWithdraw: "#007bff",
  };

   const handleTransactions = async (customer) => {
    SetselectedCustomer({ ...customer })
    setshowTransactionModal(true);
  }
  // to save transaction details.. 
 const handleTransactionSave = async () => {
  setshowTransactionModal(false);
  const Data = {
    transactionType: TransactionType,
    amount: Amount,
    remarks: Remarks,
  };

  try {
    const res = await axios.post(
      `http://localhost:5000/api/transaction/add/${selectedCustomer._id}`,
      Data
    );

    // alert("Transaction saved ");

    //  Update the modal’s customer details immediately
    SetselectedCustomer((prev) => ({
      ...prev,
      DueAmount: res.data.updatedCustomer.DueAmount,
      AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit,
    }));

    //  Update global proof list if needed
    setAllProofs((prev) =>
      prev.map((p) =>
        p.user._id === selectedCustomer._id
          ? { ...p, user: { ...p.user, DueAmount: res.data.updatedCustomer.DueAmount, AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit } }
          : p
      )
    );

    // reset inputs
    SetAmount(0);
    SetRemarks("");
    setTransactionType("");

  } catch (error) {
    console.log(error);
    alert("Failed to add transaction ❌");
  }
};

  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };
  // to change status of proofs
  const handleStatusChange=(value)=>{
    setproofStatus(value);
  }
 const handleStatusUpdate = async () => {
  if (!selectedProof) return alert("No proof selected!");

  try {
    const res = await axios.put(
      `http://localhost:5000/api/customer/paymentproof/update/${selectedProof._id}`,
      { status: proofStatus }
    );

    if (res.data.success) {
      setshowCustomerModal(false);
      // alert("Status updated successfully!");

      setAllProofs((prev) =>
        prev.map((p) =>
          p._id === selectedProof._id ? { ...p, status: proofStatus } : p
        )
      );

    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error(error);
    alert("Error in updating proof status");
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Payment Proofs</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
        {AllProofs.length > 0 ? (
          AllProofs.map((proof) => (
            <div key={proof._id} style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "14px",
            }}>
              <strong>{proof.user.name}</strong>
              <span>{proof.user.phoneNo} | {proof.user.address}</span>
              <span>Txn ID: {proof.transactionID}</span>
              <span>Amount: ₹{proof.transactionAmount.toLocaleString()}</span>
              <span>Type: {proof.transactiontype}</span>
              {proof.message && <span>Msg: {proof.message}</span>}
              <img
                src={`http://localhost:5000${proof.proofUrl}`}
                alt="Proof"
                style={{ width: "100%", height: "150px", objectFit: "contain", borderRadius: "6px" }}
              />
              <span style={{ fontSize: "12px", color: "#555" }}>
                {new Date(proof.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
              <p style={{ background: "yellow", borderRadius: '50px', color: "black", border: "2px solid orange", textAlign: "center", fontWeight: '600', cursor: "pointer" }} onClick={() => OpenCustomerModal(proof,proof.user)}>Go to Customer</p>
              <button style={{
                padding: "6px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: statusColors[proof.status] || "#aaa",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
              }}>
                {proof.status}
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888", gridColumn: "1/-1" }}>No proofs found</p>
        )}
      </div>

      {/* customer Modal */}
      {showCustomerModal && selectedCustomer && (
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
          onClick={() => setshowCustomerModal(false)}
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



            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h4>Customer Details...</h4>
              <div>


                <p style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Customer Name : {selectedCustomer.name}
                </p>
                <p style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Address : {selectedCustomer.address}
                </p>
                <p style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  phoneNo : {selectedCustomer.phoneNo}
                </p>
                <p style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  DueAmount : <span style={{ color: 'red', fontWeight: "bold" }}>{selectedCustomer.DueAmount}</span>
                </p>
                <p style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  AdvanceDeposit :<span style={{ color: 'green', fontWeight: "bold" }}>{selectedCustomer.AdvanceDeposit}</span>
                </p>

              </div>
              <div style={{ display: "flex", gap: '20px' }}>
                <button
                  style={{
                    color: "black",
                    backgroundColor: "orange",
                    borderRadius: "5px",
                  }}
                  onClick={()=>handleTransactions(selectedCustomer)}
                >
                  Add Transaction
                </button>
                <label>Status:</label>
                <select
                  value={proofStatus}   // state variable for current proof status
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="unverified">Unverified</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>

              </div>
              <div>
                <button style={{width:"100%",backgroundColor:'green',color:'white',borderRadius:"50px"}} onClick={handleStatusUpdate}>Save</button>
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
                  <option value="advanceDeposit">💵 Add Advance Payment</option>
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
                    onChange={(e) => SetAmount(e.target.value)}
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

   
    </div>
  );
};



export default ProofSection;
