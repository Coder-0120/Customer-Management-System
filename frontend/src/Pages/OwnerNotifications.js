import React, { useEffect, useState } from 'react'
import axios from 'axios';

const OwnerNotifications = () => {
    const[notifications,setNotfications]=useState([]);
    const[showCustomerModal,setshowCustomerModal]=useState(false);
    const[selectedCustomer,setSelectedCustomer]=useState(null);
    const[proofStatus,setProofStatus]=useState("unverified");
    const[showTransactionModal,setshowTransactionModal]=useState(false);
    const[Weight,SetWeight]=useState(0);
    const[Amount,SetAmount]=useState(0);
    const[Remarks,SetRemarks]=useState("");
    const[filterStatus,setFilterStatus]=useState("all");

    useEffect(()=>{
        const fetchallNotifications=async()=>{
            try{
                const res=await axios.get("http://localhost:5000/api/customer/sellDigitalGold/getAll");
                setNotfications(res.data.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchallNotifications();
    },[])

    const handleAddTransaction=(notification)=>{
        setshowCustomerModal(true);
        setSelectedCustomer(notification);
        setProofStatus(notification.status);
    }

    const handleTransactions=(customer)=>{
        setshowTransactionModal(true);
        SetAmount(customer.SellDigitalGoldAmount);
        SetWeight(customer.SellDigitalGoldWeight);
        setSelectedCustomer(customer);
        SetRemarks(customer.Remarks);
    }

    const resetTransactionFields=()=>{
      SetAmount(0);
      SetWeight(0);
      SetRemarks("");
    }

    const handleStatusChange=(value)=>{
      setProofStatus(value);
    }

    const handleStatusUpdate=async()=>{
      try {
      const res = await axios.put(
        `http://localhost:5000/api/customer/sellDigitalGold/update/${selectedCustomer._id}`,
        { status:  proofStatus}
      );

      if (res.data.success) {
        setshowCustomerModal(false);
        setNotfications((prev) =>
          prev.map((p) => (p._id === selectedCustomer._id ? { ...p, status: proofStatus } : p))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Error in updating request status");
    }
    }

    const handleTransactionSave=async()=>{
      setshowTransactionModal(false);
       const Data = { transactionType: "sellDigitalGold", amount: Amount, remarks: Remarks , DigitalGoldAmount:selectedCustomer.SellDigitalGoldAmount, DigitalGoldWeight:selectedCustomer.SellDigitalGoldWeight };
       try {
            await axios.post(`http://localhost:5000/api/transaction/sellDigitalGold/add/${selectedCustomer.user._id}`, Data);
            SetAmount(0);
            SetRemarks("");
          } catch (error) {
            console.log(error);
            alert("Failed to add transaction");
          }
    }

    const statusColors = {
      unverified: "#ffa500",
      verified: "#28a745",
      rejected: "#ff4d4d",
    };
      
  const filteredProofs = filterStatus === "all"
    ? notifications
    : notifications.filter(p => p.status === filterStatus);
    
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "30px 20px"
    }}>
      <style>
        {`
          .notification-card { transition: all 0.3s ease; }
          .notification-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3); }
        `}
      </style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            💰 Digital Gold Sale Requests
          </h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "#2d2d2d",
              color: "#D4AF37",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <option value="all">All Requests</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredProofs.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {filteredProofs.map((notification) => (
              <div
                key={notification._id}
                className="notification-card"
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
                  top: "0px",
                  right: "0px",
                  background: statusColors[notification.status] || "#aaa",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}>
                  {notification.status}
                </div>

                <div style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.3)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Customer</span>
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>
                      {notification.user.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Phone</span>
                    <span style={{ color: "#fff", fontSize: "13px" }}>
                      {notification.user.phoneNo}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Weight</span>
                    <span style={{ color: "#D4AF37", fontSize: "16px", fontWeight: "700" }}>
                      {notification.SellDigitalGoldWeight} gm
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Amount</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      ₹{notification.SellDigitalGoldAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>UPI-ID</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      {notification.upiID}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Remarks</span>
                    <span style={{ color: "#FFD700", fontSize: "16px", fontWeight: "700" }}>
                      {notification.Remarks || "N/A"}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 254, 254, 0.99)" }}>
                    {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <button 
                  onClick={() => handleAddTransaction(notification)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#1a1a1a",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.4)";
                  }}
                >
                  Manage Request
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
              No sale requests found
            </p>
          </div>
        )}
      </div>

      {/* Customer Modal */}
      {showCustomerModal && selectedCustomer && (
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
            backgroundColor: "rgba(0,0,0,0.6)",
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
              <p style={{ margin: "10px 0" }}><strong>Name:</strong> {selectedCustomer.user.name}</p>
              <p style={{ margin: "10px 0" }}><strong>Phone:</strong> {selectedCustomer.user.phoneNo}</p>
              <p style={{ margin: "10px 0" }}><strong>Address:</strong> {selectedCustomer.user.address}</p>
              <p style={{ margin: "10px 0" }}>
                <strong>Due:</strong> <span style={{ color: "#ff4d4d", fontWeight: "700" }}>₹{selectedCustomer.user.DueAmount}</span>
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Advance:</strong> <span style={{ color: "#28a745", fontWeight: "700" }}>₹{selectedCustomer.user.AdvanceDeposit}</span>
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
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                💰 Add Transaction
              </button>

              <select
                value={proofStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
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
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.4)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(212, 175, 55, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 175, 55, 0.4)";
              }}
            >
              Save Changes
            </button>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.6)",
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
              {selectedCustomer.user.name}
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
                <input
                  value={"💎 Sell Digital Gold"}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    fontSize: "14px",
                    background: "#2d2d2d",
                    color: "#fff",
                    cursor: "not-allowed"
                  }}
                />
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
                  Digital Gold Weight <span style={{ color: "#ff4d4d" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                    color: "#D4AF37",
                    fontWeight: "600"
                  }}>
                    gm
                  </span>
                  <input
                    type="number"
                    value={Weight}
                    readOnly
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(212, 175, 55, 0.5)",
                      fontSize: "14px",
                      background: "#2d2d2d",
                      color: "#fff",
                      cursor: "not-allowed"
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransactionSave}
                  disabled={!Weight || !Amount}
                  style={{
                    flex: 1,
                    background: (!Weight || !Amount)
                      ? "rgba(212, 175, 55, 0.3)"
                      : "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    color: (!Weight || !Amount) ? "rgba(255,255,255,0.5)" : "#1a1a1a",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: (!Weight || !Amount) ? "not-allowed" : "pointer",
                    boxShadow: (!Weight || !Amount)
                      ? "none"
                      : "0 4px 12px rgba(212, 175, 55, 0.4)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (Weight && Amount) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(212, 175, 55, 0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (Weight && Amount) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 175, 55, 0.4)";
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
  )
}

export default OwnerNotifications