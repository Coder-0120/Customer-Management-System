import axios from "axios";
import React, { useEffect, useState } from "react";
import EditCustomerModal from "../Components/EditCustomerModal";
import TransactionModal from "../Components/TransactionModal";
import HistoryModal from "../Components/HistoryModal";
import ListView from "../Components/ListView";
import GridView from "../Components/GridView";
import SearchOwnDash from "../Components/SearchOwnDash";

const OwnerDashboard = () => {
  const [AllCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, SetselectedCustomer] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [TransactionType, setTransactionType] = useState("");
  const [Amount, SetAmount] = useState();
  const [Remarks, SetRemarks] = useState("");
  const [History, setHistory] = useState([]);
  const [showHistoryModal, SetshowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyFilterType, setHistoryFilterType] = useState("");
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/AllCustomers");
        setAllCustomers(res.data.data);
      } catch (error) {
        console.log("Error in fetching all customers..", error);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/customer/delete/${id}`); // delete customer
      setAllCustomers(AllCustomers.filter((customer) => customer._id !== id));
      await axios.delete(`http://localhost:5000/api/transaction/deleteByCustomer/${id}`); // delete transaction history also
      setHistory([]);
      await axios.delete(`http://localhost:5000/api/customer/paymentproof/deleteByCustomer/${id}`); // delete payment proof also
      // setHistory([]);
      alert("Customer deleted Successfully..");
    } catch (error) {
      alert("failed to delete customer..");
    }
  };

  const handleEdit = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowModal(true);
  };

  const handleSave = async () => {
    setshowModal(false);
    try {
      await axios.put(`http://localhost:5000/api/customer/update/${selectedCustomer._id}`, selectedCustomer);
      setAllCustomers((prev) =>
        prev.map((cust) => (cust._id === selectedCustomer._id ? selectedCustomer : cust))
      );
      alert("Updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to update");
    }
  };

  const handleEditTransaction = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowTransactionModal(true);
  };

const handleTransactionSave = async () => {
  setshowTransactionModal(false);
  const Data = { transactionType: TransactionType, amount: Number(Amount), remarks: Remarks };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/transaction/add/${selectedCustomer._id}`,
      Data
    );
    if (res.data.success) {
      alert(res.data.message || "Transaction saved!");
      // Update state in UI
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
      // Update local selectedCustomer for consistency
      SetselectedCustomer(res.data.updatedCustomer);
    } else {
      alert(res.data.message || "Error in adding transaction");
    }
    SetAmount(0);
    SetRemarks("");
    setTransactionType("");
  } catch (error) {
    console.error("Full error:", error);
    const errorMessage = error.response?.data?.message || "Failed to add transaction";
    alert(errorMessage);
  }
};
  const HandleHistory = (customer) => {
    SetselectedCustomer(customer);
    SetshowHistoryModal(true);
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!selectedCustomer) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/transaction/history/${selectedCustomer._id}`);
        setHistory(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactionHistory();
  }, [selectedCustomer]);

  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };

  const typeColors = {
    duePayment: "#ff4d4d",
    dueIncrease: "#ca950ff4",
    advanceDeposit: "#3ce10fa7",
    advanceWithdraw: "#0b9087ff",
    buydigitalGold:"#6619dbff",
    sellDigitalGold:"#d011a0c7"
  };

  const filteredCustomers = AllCustomers.filter((customer) => {
    if (!searchTerm) return true;
    return (
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNo?.toString().includes(searchTerm)
    );
  });

  const filteredHistory = (History || []).filter((t) => {
    if (!t) return false;
    const typeMatch = historyFilterType ? t.transactionType === historyFilterType : true;
    const created = t.createdAt ? new Date(t.createdAt) : null;
    const start = historyStartDate ? new Date(historyStartDate) : null;
    const end = historyEndDate ? new Date(historyEndDate) : null;
    const dateMatch = (!start || (created && created >= start)) && (!end || (created && created <= end));
    return typeMatch && dateMatch;
  });

  // Calculate stats
  const totalDue = AllCustomers.reduce((sum, c) => sum + (c.DueAmount || 0), 0);
  const totalAdvance = AllCustomers.reduce((sum, c) => sum + (c.AdvanceDeposit || 0), 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "20px"
    }}>
      <style>
        {`
          .input-focus:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2); }
          .card-hover { transition: all 0.3s ease; }
          .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212, 175, 55, 0.25); }
          .stat-card { transition: all 0.3s ease; }
          .stat-card:hover { transform: scale(1.05); }
        `}
      </style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header with Stats */}
        <div style={{
          // background: "rgba(45, 45, 45, 0.5)",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          // background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "30px",
          border: "1px solid rgba(212, 175, 55, 0.3)"
        }}>
          <h1 style={{
            color: "#D4AF37",
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "25px",
            textAlign: "center"
          }}>
            💼 Owner Dashboard
          </h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            <div className="stat-card" style={{
              background: "rgba(212, 175, 55, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: "600", marginBottom: "8px" }}>TOTAL CUSTOMERS</div>
              <div style={{ fontSize: "32px", color: "#FFD700", fontWeight: "700" }}>{AllCustomers.length}</div>
            </div>

            <div className="stat-card" style={{
              background: "rgba(255, 77, 77, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 77, 77, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#ff4d4d", fontWeight: "600", marginBottom: "8px" }}>TOTAL DUE</div>
              <div style={{ fontSize: "32px", color: "#ff4d4d", fontWeight: "700" }}>₹{totalDue.toLocaleString()}</div>
            </div>

            <div className="stat-card" style={{
              background: "rgba(40, 167, 69, 0.1)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(40, 167, 69, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "12px", color: "#28a745", fontWeight: "600", marginBottom: "8px" }}>TOTAL ADVANCE</div>
              <div style={{ fontSize: "32px", color: "#28a745", fontWeight: "700" }}>₹{totalAdvance.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle */}
      <SearchOwnDash searchTerm={searchTerm} setSearchTerm={setSearchTerm} setViewMode={setViewMode} viewMode={viewMode}/>

        {/* Customer Display */}
        {filteredCustomers.length > 0 ? (
          viewMode === "grid" ? (
            // Grid View
            <GridView filteredCustomers={filteredCustomers} handleEdit={handleEdit} handleDelete={handleDelete} handleEditTransaction={handleEditTransaction}  HandleHistory={HandleHistory}/>
          ) : (
            // List View
            <ListView filteredCustomers={filteredCustomers} handleEdit={handleEdit} handleDelete={handleDelete} handleEditTransaction={handleEditTransaction}  HandleHistory={HandleHistory}/>
          )
        ) : (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(45,45,45,0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              {searchTerm ? `No customers found matching "${searchTerm}"` : "No customers found"}
            </p>
          </div>
        )}
      </div>

       {/* Edit Modal */}
     {showModal && <EditCustomerModal selectedCustomer={selectedCustomer} SetselectedCustomer={SetselectedCustomer} setshowModal={setshowModal} handleSave={handleSave}/>}

      {/* Transaction Modal */}

    {showTransactionModal && <TransactionModal setshowTransactionModal={setshowTransactionModal} resetTransactionFields={resetTransactionFields} selectedCustomer={selectedCustomer} TransactionType={TransactionType} setTransactionType={setTransactionType} Amount={Amount} SetAmount={SetAmount} Remarks={Remarks} SetRemarks={SetRemarks} handleTransactionSave={handleTransactionSave}/>}

      {/* History Modal */}
     {showHistoryModal && <HistoryModal SetshowHistoryModal={SetshowHistoryModal} selectedCustomer={selectedCustomer} historyFilterType={historyFilterType} historyStartDate={historyStartDate} historyEndDate={historyEndDate} setHistoryFilterType={setHistoryFilterType} setHistoryStartDate={setHistoryStartDate} setHistoryEndDate={setHistoryEndDate}  typeColors={typeColors} filteredHistory={filteredHistory}/>}

    </div>
  );
};

export default OwnerDashboard;