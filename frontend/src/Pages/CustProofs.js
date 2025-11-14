import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustProofCard from '../Components/CustProofCard';
import FilterPaymentProofCard from '../Components/FilterPaymentProofCard';
import NoProofCard from '../Components/NoProofCard';

const ProofSection = () => {
  const [AllProofs, setAllProofs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const customer=JSON.parse(localStorage.getItem("CustomerDetails"));
  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customer/paymentproof/getAll/${customer._id}`);
        setAllProofs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProofs();
  },[]);

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };
  const filteredProofs = filterStatus === "all"
    ? AllProofs
    : AllProofs.filter(p => p.status === filterStatus);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "30px 20px"
    }}>
      <style>
        {`
          .proof-card { transition: all 0.3s ease; }
          .proof-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3); }
          .input-focus:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2); }
        `}
      </style>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
       <FilterPaymentProofCard filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
        {filteredProofs.length > 0 ? (
     <CustProofCard statusColors={statusColors} filteredProofs={filteredProofs}/>
        ) : 
        <NoProofCard/>}
      </div>
    </div>
  );
};
export default ProofSection;