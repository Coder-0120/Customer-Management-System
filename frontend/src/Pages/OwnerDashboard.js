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
  const [History,setHistory]=useState("");
  const[showHistoryModal,SetshowHistoryModal]=useState(false);

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
  const HandleHistory=async(customer)=>{
    SetselectedCustomer(customer);
    SetshowHistoryModal(true);

  }

  // to fetch history
  useEffect(()=>{
     const fetchTransactionHistory=async()=>{
    try{
      const res=await axios.get(`http://localhost:5000/api/transaction/history/${selectedCustomer._id}`);
      setHistory(res.data.transactions);
    }
    catch(error){
      console.log(error);
      // alert("failed to get all history");
    }

  }
  fetchTransactionHistory();

  },[selectedCustomer]) // to fetch transactions only when customer changes.. also work without array but make performance slow as no. of calls increase..
 

  // to clear values..
  const resetTransactionFields = () => {
  setTransactionType("");
  SetAmount(0);
  SetRemarks("");
};


  return (
    <div>
      <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
        Owner Dashboard
      </h1>

      {AllCustomers && AllCustomers.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {AllCustomers.map((customer) => (
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
              <div style={{ gap: "5px", display: "flex", padding: "" }}>
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
        <p>No customers found.</p>
      )}

      {/* Edit Modal */}
      {showModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => setshowModal(false)}
            >
              ✖
            </button>
            <h2>Edit Customer Details</h2>

            <label>Name:</label>
            <input
              type="text"
              value={selectedCustomer.name}
              onChange={(e) =>
                SetselectedCustomer({
                  ...selectedCustomer,
                  name: e.target.value,
                })
              }
            />

            <label>Address:</label>
            <input
              type="text"
              value={selectedCustomer.address}
              onChange={(e) =>
                SetselectedCustomer({
                  ...selectedCustomer,
                  address: e.target.value,
                })
              }
            />

            {/* <label>Due Amount:</label>
            <input
              type="number"
              value={selectedCustomer.DueAmount}
              onChange={(e) =>
                SetselectedCustomer({
                  ...selectedCustomer,
                  DueAmount: e.target.value,
                })
              }
            />

            <label>Advance Deposit:</label>
            <input
              type="number"
              value={selectedCustomer.AdvanceDeposit}
              onChange={(e) =>
                SetselectedCustomer({
                  ...selectedCustomer,
                  AdvanceDeposit: e.target.value,
                })
              }
            /> */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => setshowModal(false)}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      {showTransactionModal && selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => {setshowTransactionModal(false); resetTransactionFields();}}
            >
              ✖
            </button>
            <h2>Add Transaction Details</h2>
            <label>Transaction Type :</label>

            <select
              value={TransactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">-- Select Transaction Type --</option>
              <option value="duePayment">Pay Due Amount</option>
              <option value="dueIncrease">Increase Due Amount</option>
              <option value="advanceDeposit">Add Advance Payment</option>
              <option value="advanceWithdraw">Withdraw from Advance</option>
            </select>

            <label>Amount:</label>
            <input
              type="Number"
              value={Amount}
              onChange={(e) => SetAmount((e.target.value))}
            />
            <label>Remarks:</label>
            <input
              type="text"
              value={Remarks}
              placeholder="Your message..."
              onChange={(e) =>
                SetRemarks(e.target.value)
              }
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
              onClick={() => {setshowTransactionModal(false); resetTransactionFields();}}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleTransactionSave}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                }}
              >
                Save
              </button>
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
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
            <h2>{selectedCustomer.name} - Transaction History</h2>
            <button onClick={() => SetshowHistoryModal(false)}>Close</button>

            {History.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Remarks</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {History.map((t) => (
                    <tr key={t._id}>
                      <td>{t.transactionType}</td>
                      <td>{t.amount}</td>
                      <td>{t.remarks}</td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
