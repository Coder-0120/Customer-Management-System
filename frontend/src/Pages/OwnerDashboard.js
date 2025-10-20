import axios from "axios";
import React, { useEffect, useState } from "react";

const OwnerDashboard = () => {
  const [AllCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, SetselectedCustomer] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [TransactionType, setTransactionType] = useState("");
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [History, setHistory] = useState([[]]);
  const [showHistoryModal, SetshowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyFilterType, setHistoryFilterType] = useState("");
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");

  useEffect(() => {
    // to get all customers..
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/customer/AllCustomers"
        );
        setAllCustomers(res.data.data);
      } catch (error) {
        console.log("Error in fetching all customers..", error);
      }
    };
    fetchAllCustomers();
  }, []);

  // to delete any customer..
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer/delete/${id}`);
      setAllCustomers(AllCustomers.filter((customer) => customer._id !== id));
      alert("Customer deleted Successfully..");
    } catch (error) {
      alert("failed to delete customer..");
    }
  };

  // to edit customer details
  const handleEdit = (customer) => {
    SetselectedCustomer({ ...customer }); // to show old values of customers details during edit..
    setshowModal(true);
  };

  // to save the updated details of customers
  const handleSave = async () => {
    setshowModal(false);

    try {
      await axios.put(
        `http://localhost:5000/api/customer/update/${selectedCustomer._id}`,
        selectedCustomer
      );
      setAllCustomers((prev) =>
        prev.map((cust) =>
          cust._id === selectedCustomer._id ? selectedCustomer : cust
        )
      );
      alert("updated..");
    } catch (error) {
      console.log(error);
      alert("failed to update customer details");
    }
  };

  // to add transaction details
  const handleEditTransaction = async (customer) => {
    SetselectedCustomer({ ...customer })
    setshowTransactionModal(true);
  }

  // to save transaction details.. 
  const handleTransactionSave = async () => {
    setshowTransactionModal(false);
    const Data = {

      transactionType: TransactionType,
      amount: Amount,
      remarks: Remarks
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/transaction/add/${selectedCustomer._id}`, Data
      );
      alert("Transaction saved..")

      setAllCustomers((prev) =>
        prev.map((cust) =>
          cust._id === selectedCustomer._id
            ? {
              ...cust,
              DueAmount: res.data.updatedCustomer.DueAmount,
              AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit,
            }
            : cust
        )
      );
      SetAmount(0);
      SetRemarks("");
      setTransactionType("");

    } catch (error) {
      console.log(error);
      alert("failed to add Transaction details");
    }

  }
  const HandleHistory = async (customer) => {
    SetselectedCustomer(customer);
    SetshowHistoryModal(true);

  }

  // to fetch history
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transaction/history/${selectedCustomer._id}`);
        setHistory(res.data.transactions);
      }
      catch (error) {
        console.log(error);
        // alert("failed to get all history");
      }

    }
    fetchTransactionHistory();

  }, [selectedCustomer]) // to fetch transactions only when customer changes.. also work without array but make performance slow as no. of calls increase..


  // to clear values..
  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };

  const typeColors = {
    duePayment: "#ff4d4d",
    dueIncrease: "#ffa500",
    advanceDeposit: "#28a745",
    advanceWithdraw: "#007bff",
  };


  return (
    <div>
      <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
        Owner Dashboard
      </h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", boxShadow: '0px 0px 20px black' }}>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "250px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>


      {/*  Customer Cards */}
      {AllCustomers && AllCustomers.length > 0 ? (
        (() => {
          const filteredCustomers = AllCustomers.filter((customer) => {
            if (!searchTerm) return true;
            const nameMatch = customer.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase());
            const phoneMatch = customer.phoneNo
              ?.toString()
              .includes(searchTerm);
            return nameMatch || phoneMatch;
          });

          return filteredCustomers.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              {filteredCustomers.map((customer) => (
                <div
                  key={customer._id}
                  style={{
                    border: "2px solid black",
                    width: "300px",
                    height: "250px",
                    margin: "5px",
                    padding: "10px",
                    borderRadius: "20px",
                    boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  <h3>Name: {customer.name}</h3>
                  <p>Phone No: {customer.phoneNo}</p>
                  <p>Address: {customer.address}</p>
                  <h6 style={{ color: "red" }}>Due Amount: {customer.DueAmount}</h6>
                  <h6 style={{ color: "green" }}>
                    Advance Deposit: {customer.AdvanceDeposit}
                  </h6>
                  <div style={{ gap: "5px", display: "flex" }}>
                    <button
                      style={{
                        color: "black",
                        backgroundColor: "yellow",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleDelete(customer._id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        color: "black",
                        backgroundColor: "orange",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleEditTransaction(customer)}
                    >
                      Add Transaction
                    </button>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "indigo",
                        borderRadius: "5px",
                      }}
                      onClick={() => HandleHistory(customer)}
                    >
                      History
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>
              No matching customers found.
            </p>
          );
        })()
      ) : (
        <p>No customers found.</p>
      )}

      {/* Edit Modal */}
      {showModal && selectedCustomer && (
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
          onClick={() => setshowModal(false)}
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
              onClick={() => setshowModal(false)}
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
                Edit Customer
              </h2>
              <p style={{
                margin: 0,
                fontSize: "14px",
                color: "#7f8c8d"
              }}>
                Update customer information
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
                  Customer Name <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    SetselectedCustomer({
                      ...selectedCustomer,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter customer name"
                  className="edit-input"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    backgroundColor: "#fff"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2c3e50"
                }}>
                  Address <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <textarea
                  value={selectedCustomer.address}
                  onChange={(e) =>
                    SetselectedCustomer({
                      ...selectedCustomer,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter customer address"
                  className="edit-input"
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
                background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #c8e6c9"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px"
                }}>
                  <span style={{ fontSize: "18px" }}>ℹ️</span>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#2e7d32"
                  }}>
                    Financial Information
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#558b2f",
                  lineHeight: "1.5"
                }}>
                  Due and Advance amounts can only be modified through transactions. Use the "Add Transaction" button to update financial details.
                </p>
              </div>

              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px"
              }}>
                <button
                  onClick={() => setshowModal(false)}
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
                  onClick={handleSave}
                  disabled={!selectedCustomer.name || !selectedCustomer.address}
                  style={{
                    flex: 1,
                    background: (!selectedCustomer.name || !selectedCustomer.address)
                      ? "#bdc3c7"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: (!selectedCustomer.name || !selectedCustomer.address) ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: (!selectedCustomer.name || !selectedCustomer.address)
                      ? "none"
                      : "0 2px 8px rgba(102,126,234,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCustomer.name && selectedCustomer.address) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(102,126,234,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCustomer.name && selectedCustomer.address) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(102,126,234,0.3)";
                    }
                  }}
                >
                  Save Changes
                </button>
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
                  <option value="dueIncrease">📈 Increase Due Amount</option>
                  <option value="advanceDeposit">💵 Add Advance Payment</option>
                  <option value="advanceWithdraw">💸 Withdraw from Advance</option>
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

      {/* History Modal */}
      {showHistoryModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
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
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              padding: "35px",
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "15px",
                borderBottom: "2px solid #e0e0e0",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#2c3e50" }}>
                {selectedCustomer.name}
              </h2>
              <button
                onClick={() => SetshowHistoryModal(false)}
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
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(255,71,87,0.3)",
                }}
                className="close-btn"
              >
                ✖
              </button>

              <style>
                {`
  .close-btn:hover {
    background: #ee5a6f;
    transform: rotate(90deg);
  }
`}
              </style>

            </div>

            {/* Filter Section */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <select
                value={historyFilterType}
                onChange={(e) => setHistoryFilterType(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              >
                <option value="">All Types</option>
                <option value="duePayment">Pay Due Amount</option>
                <option value="dueIncrease">Increase Due Amount</option>
                <option value="advanceDeposit">Add Advance Payment</option>
                <option value="advanceWithdraw">Withdraw from Advance</option>
              </select>

              <input
                type="date"
                value={historyStartDate}
                onChange={(e) => setHistoryStartDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="date"
                value={historyEndDate}
                onChange={(e) => setHistoryEndDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            {/* Filtered Table */}
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
                  <tr style={{ background: "#667eea", color: "#fff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left" }}>Type</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Amount</th>
                    <th style={{ padding: "14px 16px", textAlign: "left" }}>Remarks</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Updated Due</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Updated Advance</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(History || []).filter((t) => {
                    if (!t) return false; 

                    const typeMatch = historyFilterType ? t.transactionType === historyFilterType : true;

                    const created = t.createdAt ? new Date(t.createdAt) : null;
                    const start = historyStartDate ? new Date(historyStartDate) : null;
                    const end = historyEndDate ? new Date(historyEndDate) : null;
                    const dateMatch = (!start || (created && created >= start)) && (!end || (created && created <= end));

                    return typeMatch && dateMatch;
                  }).map((t, index) => (
                    <tr key={t?._id || index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa" }}>
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
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600" }}>
                        ₹{(t?.amount || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", fontStyle: t?.remarks ? "normal" : "italic", color: "#7f8c8d" }}>
                        {t?.remarks || "No remarks"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", color: t?.updatedDue > 0 ? "#e74c3c" : "#27ae60" }}>
                        ₹{(t?.updatedDue || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", color: t?.updatedAdvance > 0 ? "#27ae60" : "#95a5a6" }}>
                        ₹{(t?.updatedAdvance || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: "13px", color: "#7f8c8d" }}>
                        {t?.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                        <br />
                        <span style={{ fontSize: "11px", color: "#95a5a6" }}>
                          {t?.createdAt ? new Date(t.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default OwnerDashboard;
