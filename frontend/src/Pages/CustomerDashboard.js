import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CustDasTransHist from '../Components/CustDasTransHist';
import CusDasFilter from '../Components/CusDasFilter';
import { useUserProfile } from '../context/UserProfileContext';
import CusDasAccountCard from '../Components/CusDasAccountCard';

const CustomerDashboard = () => {
  const customerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
  // const[profile,setProfile]=useState([]);
  const [transactions, setTransactions] = useState([]);
  const [historyFilterType, setHistoryFilterType] = useState("");
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");
  const {profile}=useUserProfile();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transaction/history/${customerInfo._id}`);
        setTransactions(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  },[customerInfo._id]);

  const typeColors = {
    duePayment: "#ff4d4d",
    dueIncrease: "#ca950ff4",
    advanceDeposit: "#3ce10fa7",
    advanceWithdraw: "#0b9087ff",
    buydigitalGold:"#6619dbff",
    sellDigitalGold:"#d011a0c7"
  };

  const filteredTransactions = transactions.filter((t) => {
    if (historyFilterType && t.transactionType !== historyFilterType) {
      return false;
    }

    const transactionDate = new Date(t.createdAt);
    if (historyStartDate) {
      const startDate = new Date(historyStartDate);
      if (transactionDate < startDate) return false;
    }
    if (historyEndDate) {
      const endDate = new Date(historyEndDate);
      endDate.setHours(23, 59, 59, 999);
      if (transactionDate > endDate) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setHistoryFilterType("");
    setHistoryStartDate("");
    setHistoryEndDate("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "40px 20px"
    }}>
      <style>
        {`
          .filter-select:focus, .filter-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          }
        `}
      </style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{
          textAlign: "center",
          color: "#D4AF37",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "30px",
          textShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
        }}>
          💎 Customer Dashboard
        </h1>

        {/* Account Card */}
       <CusDasAccountCard profile={profile}/>

        {/* Transaction Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)"
          }} />

          <h2 style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#D4AF37",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "2px solid rgba(212, 175, 55, 0.2)"
          }}>
            Transaction History
          </h2>

          {/* Filters */}
        <CusDasFilter  historyFilterType={historyFilterType} setHistoryFilterType={setHistoryFilterType} historyStartDate={historyStartDate} setHistoryStartDate={setHistoryStartDate} historyEndDate={historyEndDate} setHistoryEndDate={setHistoryEndDate} clearFilters={clearFilters} filteredTransactions={filteredTransactions} transactions={transactions}/>

          {filteredTransactions.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "rgba(255,255,255,0.5)"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                {transactions.length === 0 ? "📋" : "🔍"}
              </div>
              <p style={{ fontSize: "16px", fontStyle: "italic" }}>
                {transactions.length === 0 
                  ? "No transactions found." 
                  : "No transactions match the selected filters."}
              </p>
            </div>
          ) : (
           <CustDasTransHist filteredTransactions={filteredTransactions} typeColors={typeColors}/>
          )}
        </div>
      </div>
    </div>
  )
}
export default CustomerDashboard