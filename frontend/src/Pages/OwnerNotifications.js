import React, { useEffect, useState } from 'react'
import axios from 'axios';

const OwnerNotifications = () => {
    const[notifications,setNotfications]=useState([]);
    const[showCustomerModal,setshowCustomerModal]=useState(false);
    const[selectedCustomer,setSelectedCustomer]=useState(null);
    const[proofStatus,setProofStatus]=useState("unverified");
    const[showTransactionModal,setshowTransactionModal]=useState(false);
    // const[TransactionType,setTransactionType]=useState("💎 Sell Digital Gold");
    const[Weight,SetWeight]=useState(0);
    const[Amount,SetAmount]=useState(0);
    const[Remarks,SetRemarks]=useState("");

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
    })

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
    // to change status of requests only..
    const handleStatusChange=(value)=>{
      setProofStatus(value);

    }
    // to update in database also..
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
      //  alert(selectedCustomer.user._id);
      console.log(Data);
       try {
            await axios.post(`http://localhost:5000/api/transaction/sellDigitalGold/add/${selectedCustomer.user._id}`, Data);
            SetAmount(0);
            SetRemarks("");
          } catch (error) {
            console.log(error);
            alert("Failed to add transaction");
          }


    }

    const getStatusInfo = (status) => {
        switch(status?.toLowerCase()) {
          case 'verified':
            return { 
              bg: 'linear-gradient(135deg, rgba(76, 175, 80, 0.25) 0%, rgba(76, 175, 80, 0.1) 100%)', 
              border: '#4CAF50', 
              text: '#66bb6a', 
              icon: '✓',
              label: 'Verified',
              glow: '0 0 20px rgba(76, 175, 80, 0.3)'
            };
          case 'unverified':
            return { 
              bg: 'linear-gradient(135deg, rgba(255, 165, 0, 0.25) 0%, rgba(255, 165, 0, 0.1) 100%)', 
              border: '#FFA500', 
              text: '#FFD700', 
              icon: '⏳',
              label: 'Pending',
              glow: '0 0 20px rgba(255, 165, 0, 0.3)'
            };
          case 'rejected':
            return { 
              bg: 'linear-gradient(135deg, rgba(244, 67, 54, 0.25) 0%, rgba(244, 67, 54, 0.1) 100%)', 
              border: '#f44336', 
              text: '#ff6b6b', 
              icon: '✗',
              label: 'Rejected',
              glow: '0 0 20px rgba(244, 67, 54, 0.3)'
            };
          default:
            return { 
              bg: 'linear-gradient(135deg, rgba(158, 158, 158, 0.25) 0%, rgba(158, 158, 158, 0.1) 100%)', 
              border: '#9e9e9e', 
              text: '#bdbdbd', 
              icon: '◯',
              label: 'Unknown',
              glow: '0 0 20px rgba(158, 158, 158, 0.3)'
            };
        }
      };
    
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
      padding: "60px 20px",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Decorative Background Elements */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
        top: "-300px",
        right: "-200px",
        filter: "blur(100px)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
        bottom: "-200px",
        left: "-150px",
        filter: "blur(100px)",
        pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1
      }}>

        {notifications.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "35px"
          }}>
            {notifications.map((notification, index) => {
              const statusInfo = getStatusInfo(notification.status);
              return (
                <div 
                  key={notification._id} 
                  className="notification-card"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%)",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    animationDelay: `${index * 0.1}s`,
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
                  }}
                >
                  {/* Status Badge - Top Right Corner */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "8px 18px",
                    borderRadius: "25px",
                    background: statusInfo.bg,
                    border: `2px solid ${statusInfo.border}`,
                    fontSize: "13px",
                    fontWeight: "700",
                    color: statusInfo.text,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    boxShadow: statusInfo.glow,
                    backdropFilter: "blur(10px)",
                    zIndex: 2
                  }}>
                    <span style={{ marginRight: "6px" }}>{statusInfo.icon}</span>
                    {statusInfo.label}
                  </div>

                  {/* Main Content */}
                  <div style={{ padding: "30px" }}>
                    {/* Customer Info Header */}
                    <div style={{
                      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)",
                      borderRadius: "14px",
                      padding: "18px",
                      marginBottom: "20px",
                      border: "1px solid rgba(212, 175, 55, 0.3)"
                    }}>
                      <div style={{
                        fontSize: "11px",
                        color: "rgba(212, 175, 55, 0.8)",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        fontWeight: "600"
                      }}>
                        Customer Details
                      </div>
                      <div style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#D4AF37",
                        marginBottom: "10px"
                      }}>
                        👤 {notification.user.name}
                      </div>
                      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                        📞 {notification.user.phoneNo}
                      </div>
                      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                        📍 {notification.user.address}
                      </div>
                    </div>

                 

                    {/* Weight & Amount Section */}
                    <div style={{
                      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255, 215, 0, 0.06) 100%)",
                      borderRadius: "16px",
                      padding: "25px",
                      marginBottom: "25px",
                      border: "1px solid rgba(212, 175, 55, 0.25)",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {/* Decorative Corner */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "100px",
                        height: "100px",
                        background: "radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)",
                        pointerEvents: "none"
                      }} />
                      
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                      }}>
                        {/* Weight */}
                        <div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px"
                          }}>
                            <span style={{ fontSize: "20px" }}>⚖️</span>
                            <span style={{
                              fontSize: "11px",
                              color: "rgba(255,255,255,0.5)",
                              textTransform: "uppercase",
                              letterSpacing: "1.5px",
                              fontWeight: "600"
                            }}>
                              Weight
                            </span>
                          </div>
                          <div style={{
                            fontSize: "32px",
                            fontWeight: "800",
                            color: "#D4AF37",
                            lineHeight: "1"
                          }}>
                            {notification.SellDigitalGoldWeight}
                            <span style={{ fontSize: "18px", fontWeight: "600", marginLeft: "4px" }}>g</span>
                          </div>
                        </div>

                        {/* Amount */}
                        <div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px"
                          }}>
                            <span style={{ fontSize: "20px" }}>💰</span>
                            <span style={{
                              fontSize: "11px",
                              color: "rgba(255,255,255,0.5)",
                              textTransform: "uppercase",
                              letterSpacing: "1.5px",
                              fontWeight: "600"
                            }}>
                              Amount
                            </span>
                          </div>
                          <div style={{
                            fontSize: "32px",
                            fontWeight: "800",
                            color: "#FFD700",
                            lineHeight: "1"
                          }}>
                            ₹{(notification.SellDigitalGoldAmount )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px",
                      background: "rgba(45, 45, 45, 0.5)",
                      borderRadius: "12px",
                      border: "1px solid rgba(212, 175, 55, 0.15)",
                      marginBottom: "20px"
                    }}>
                      <div style={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
                        borderRadius: "10px"
                      }}>
                        📅
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "3px"
                        }}>
                          Request Date
                        </div>
                        <div style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: "600"
                        }}>
                          {new Date(notification.createdAt).toLocaleString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleAddTransaction(notification)}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                        border: "none",
                        borderRadius: "12px",
                        color: "#1a1a1a",
                        fontSize: "15px",
                        fontWeight: "700",
                        cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px"
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
                      <span style={{ fontSize: "18px" }}>💼</span>
                      Manage Transaction
                    </button>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div style={{
                    height: "4px",
                    background: `linear-gradient(90deg, transparent, ${statusInfo.border}, transparent)`
                  }} />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            background: "linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
            border: "2px dashed rgba(212, 175, 55, 0.3)",
            borderRadius: "24px",
            padding: "100px 40px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              fontSize: "96px", 
              marginBottom: "25px", 
              opacity: "0.4",
              animation: "float 3s ease-in-out infinite"
            }}>
              📭
            </div>
            <h3 style={{
              fontSize: "32px",
              color: "#D4AF37",
              marginBottom: "15px",
              fontWeight: "700"
            }}>
              No Sale Requests
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "17px",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.7"
            }}>
              There are no pending sale requests at the moment.<br />
              New requests will appear here for your review.
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
                    cursor: "pointer",
                    transition: "all 0.2s ease"
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
                  Digital Gold Weight <span style={{ color: "#ff4d4d" }}>*</span>
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
                    g
                    
                  </span>
                  <input
                    value={Weight}
                    readOnly
                    // onChange={(e) => {SetWeight(e.target.value)}}
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
                    cursor: ( !Weight || !Amount) ? "not-allowed" : "pointer",
                    boxShadow: (!Weight|| !Amount)
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
    </div>
  )
}

export default OwnerNotifications