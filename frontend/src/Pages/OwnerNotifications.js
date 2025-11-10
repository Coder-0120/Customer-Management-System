import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomerDetailsModal from '../Components/CustomerDetailsModal';
import DGTransactionModal from '../Components/DGTransactionModal';
import OwnerNotificationCard from '../Components/OwnerNotificationCard';

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
      <OwnerNotificationCard filteredProofs={filteredProofs} handleAddTransaction={handleAddTransaction} statusColors={statusColors}/>
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
      {showCustomerModal &&  <CustomerDetailsModal setshowCustomerModal={setshowCustomerModal} selectedCustomer={selectedCustomer}   handleTransactions={handleTransactions} handleStatusChange={handleStatusChange} handleStatusUpdate={handleStatusUpdate} proofStatus={proofStatus}/>}

      {/* Transaction Modal */}
      {showTransactionModal && <DGTransactionModal setshowTransactionModal={setshowTransactionModal} resetTransactionFields={resetTransactionFields} selectedCustomer={selectedCustomer} Amount={Amount} SetAmount={SetAmount} Weight={Weight} Remarks={Remarks} SetRemarks={SetRemarks} handleTransactionSave={handleTransactionSave}/>}
    </div>
  )
}

export default OwnerNotifications
 