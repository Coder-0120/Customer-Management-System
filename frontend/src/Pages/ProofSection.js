import axios from 'axios';
import { useEffect, useState } from 'react';
import ProofTransactionModal from '../Components/ProofTransactionModal';
import ZoomModal from '../Components/ZoomModal';
import CustomerDetailsModal from '../Components/CustomerDetailsModal';
import ProofSecCards from '../Components/ProofSecCards';
const ProofSection = () => {
  const [AllProofs, setAllProofs] = useState([]);
  const [selectedCustomer, SetselectedCustomer] = useState(null);
  const [showCustomerModal, setshowCustomerModal] = useState(false);
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [TransactionType, setTransactionType] = useState("");
  const [Amount, SetAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [proofStatus, setproofStatus] = useState("unverified");
  const [selectedProof, setSelectedProof] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [zoomProof, setZoomProof] = useState(null);
  
  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/paymentproof/getAll");
        setAllProofs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProofs();
  }, []);

  const statusColors = {
    unverified: "#ffa500",
    verified: "#28a745",
    rejected: "#ff4d4d",
  };

  const OpenCustomerModal = (proof, customer) => {
    SetselectedCustomer({ ...customer });
    setSelectedProof(proof);
    setproofStatus(proof.status || "unverified");
    setTransactionType(proof.transactiontype);
    SetAmount(proof.transactionAmount);
    SetRemarks(proof.message);
    setshowCustomerModal(true);
  };

  const handleTransactions = (customer) => {
    SetselectedCustomer({ ...customer });
    setshowTransactionModal(true);
  };

  const handleTransactionSave = async () => {
    setshowTransactionModal(false);
    const Data = { transactionType: TransactionType, amount: Amount, remarks: Remarks , DigitalGoldAmount:selectedProof.DigitalGoldAmount, DigitalGoldWeight:selectedProof.DigitalGoldWeight };
    // alert(JSON.stringify(Data));
    

    try {
      const res = await axios.post(`http://localhost:5000/api/transaction/add/${selectedCustomer._id}`, Data);
      // alert(selectedCustomer._id);

      SetselectedCustomer((prev) => ({
        ...prev,
        DueAmount: res.data.updatedCustomer.DueAmount,
        AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit,
        DigitalGoldAmount: res.data.updatedCustomer.DigitalGoldAmount,
        DigitalGoldWeight: res.data.updatedCustomer.DigitalGoldWeight,
      }));

      setAllProofs((prev) =>
        prev.map((p) =>
          p.user._id === selectedCustomer._id
            ? { ...p, user: { ...p.user, DueAmount: res.data.updatedCustomer.DueAmount, AdvanceDeposit: res.data.updatedCustomer.AdvanceDeposit } }
            : p
        )
      );
      SetAmount(0);
      SetRemarks("");
      setTransactionType("");
    } catch (error) {
      console.log(error);
      alert("Failed to add transaction");
    }
  };

  const resetTransactionFields = () => {
    setTransactionType("");
    SetAmount(0);
    SetRemarks("");
  };

  const handleStatusChange = (value) => {
    setproofStatus(value);
  };

  const handleStatusUpdate = async () => {
    if (!selectedProof) return alert("No proof selected!");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/customer/paymentproof/update/${selectedProof._id}`,
        { status: proofStatus }
      );

      if (res.data.success) {
        setshowCustomerModal(false);
        setAllProofs((prev) =>
          prev.map((p) => (p._id === selectedProof._id ? { ...p, status: proofStatus } : p))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Error in updating proof status");
    }
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
        {/* Header */}
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
            💳 Payment Proofs
          </h2>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "rgba(45, 45, 45, 0.8)",
              color: "#D4AF37",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <option value="all">All Proofs</option>
            <option value="unverified">Unverified</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Proof Cards */}
        {filteredProofs.length > 0 ? (
         <ProofSecCards filteredProofs={filteredProofs} statusColors={statusColors} OpenCustomerModal={OpenCustomerModal} setZoomProof={setZoomProof}/>
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
              No payment proofs found
            </p>
          </div>
        )}
      </div>

       {/* Customer Modal  */}
      {showCustomerModal && <CustomerDetailsModal setshowCustomerModal={setshowCustomerModal} selectedCustomer={selectedCustomer}
      handleTransactions={handleTransactions} handleStatusChange={handleStatusChange} handleStatusUpdate={handleStatusUpdate} proofStatus={proofStatus}/>}

    {/* Transaction Modal (updated to match customer modal UI) */}
      {showTransactionModal && <ProofTransactionModal setshowTransactionModal={setshowTransactionModal} resetTransactionFields={resetTransactionFields} selectedCustomer={selectedCustomer} TransactionType={TransactionType} setTransactionType={setTransactionType} Amount={Amount} SetAmount={SetAmount} Remarks={Remarks} SetRemarks={SetRemarks} handleTransactionSave={handleTransactionSave}/>}
      
      {/* Zoom Modal with Transaction Details */}
      {zoomProof && <ZoomModal  zoomProof={zoomProof} setZoomProof={setZoomProof}/>}
    </div>
  );
};

export default ProofSection;