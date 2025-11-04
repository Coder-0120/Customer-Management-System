import React, { useEffect, useState } from 'react'
import axios from 'axios';

const OwnerNotifications = () => {
    const[notifications,setNotfications]=useState([]);
    const[showCustomerModal,setshowCustomerModal]=useState(false);
    const[selectedCustomer,setSelectedCustomer]=useState(null);
    const[proofStatus,setProofStatus]=useState("unverified");
    const[showTransactionModal,setshowTransactionModal]=useState(false);
    const[TransactionType,setTransactionType]=useState("SellDigitalGold");
    const[Amount,SetAmount]=useState("");
    const[Remarks,SetRemarks]=useState("");
    useEffect(()=>{
        const fetchallNotifications=async()=>{
            try{
                const res=await axios.get("http://localhost:5000/api/customer/sellDigitalGold/getAll");
                setNotfications(res.data.data);
                // console.log(res.data.data[0].status);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchallNotifications();

    })
    const handleAddTransaction=(notification)=>{
        setshowCustomerModal(true);
        setSelectedCustomer(notification.user);
        setProofStatus(notification.status);
    }
    const handleTransactions=(customer)=>{
        setshowTransactionModal(true);
        setSelectedCustomer(customer);
    }
    const resetTransactionFields=()=>{

    }
    const handleStatusUpdate=()=>{

    }
    const handleStatusChange=()=>{

    }
    const handleTransactionSave=()=>{

    }
    
  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"row"}}>
        {notifications.length>0?(
            notifications.map((notification)=>(
                <div key={notification._id} style={{border:"1px solid black",margin:"10px",padding:"10px",width:"fit-content",borderRadius:"5px"}}>
                    <div style={{backgroundColor:'orange',border:"2px solid black",borderRadius:"5px",width:'fit-content',padding:"5px"}}>
                    <p><strong>Customer Name:</strong> {notification.user.name}</p>
                    <p><strong>Customer phoneNo:</strong> {notification.user.phoneNo}</p>
                    <p><strong>Customer Address:</strong> {notification.user.address}</p>

                        </div>
                    <p><strong>Sell Digital Gold Weight:</strong> {notification.SellDigitalGoldWeight}</p>
                    <p><strong>Sell Digital Gold Amount:</strong> {notification.SellDigitalGoldAmount}</p>
                    <p><strong>Sell Digital Gold Date:</strong> {new Date(notification.createdAt).toLocaleTimeString('en-IN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'

                          })}</p>
                    <p><strong>Sell Digital Gold Status:</strong> {notification.status}</p>
                    <button onClick={() => handleAddTransaction(notification)}>Add transaction</button>
                    {/* <p><strong>Sell Digital Gold Date:</strong> {notification}</p> */}
                </div>
            ))
        ):"no requests"}

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
                <input
                  value={TransactionType}
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
                  {/* <option value="">Select transaction type</option>
                  {/* <option value="duePayment">💰 Pay Due Amount</option> */}
                  {/* <option value="advanceDeposit">💵 Add Advance Payment</option> */}
                  {/* <option value="buyDigitalGold">💎 Buy Digital Gold</option> */}
                  {/* <option value="sellDigitalGold">💎 Sell Digital Gold</option> */} 
                </input>
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
                    // type="number"
                    value={notifications.SellDigitalGoldAmount}
                    // onChange={(e) => SetAmount(e.target.value)}
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

    </div>
  )
}

export default OwnerNotifications