import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustNotificationCard from '../Components/CustNotificationCard';
import FilterDGSaleReqCard from '../Components/FilterDGSaleReqCard';
import NoSaleReqCard from '../Components/NoSaleReqCard';

const CustNotifications = () => {
  const [notifications, setNotfications] = useState([]);
  const customer = JSON.parse(localStorage.getItem("CustomerDetails"));
  const [filterStatus, setFilterStatus] = useState("all");
  
  useEffect(() => {
    const fetchallNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer/sellDigitalGold/fetchAll/${customer._id}`);
        setNotfications(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchallNotifications();
  });

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };

  const filteredNotifications = filterStatus === "all"
    ? notifications
    : notifications.filter(n => n.status === filterStatus);

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
       <FilterDGSaleReqCard filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>

        {filteredNotifications.length > 0 ? (
         <CustNotificationCard filteredNotifications={filteredNotifications} statusColors={statusColors}/>
        ) : 
        <NoSaleReqCard/>
        }
      </div>
    </div>
  )
}
export default CustNotifications