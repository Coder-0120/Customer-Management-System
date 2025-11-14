import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import rates from "../Pages/GoldRatePage";
import SellDigGoldModal from "../Components/SellDigGoldModal";
import SellDGCard from "../Components/SellDGCard";
import BuyDGCard from "../Components/BuyDGCard";
import { useGoldRates } from "../context/GoldRateContext";
const DigitalGold = () => {
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyWeight, setBuyWeight] = useState(0);
  const [sellWeight, setSellWeight] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const customerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
  const [showModal, setShowModal] = useState(false);
  const [upiID, setUpiID] = useState("");
  const [remarks, setRemarks] = useState("");
  const{rates}=useGoldRates();
  // const [rates, setRates] = useState([]);
  // const [usdToInr, setUsdToInr] = useState(88.2);
  // const fetchExchangeRate = async () => {
  //   try {
  //     const fxRes = await axios.get(
  //       "https://v6.exchangerate-api.com/v6/c4abc8c3ef3751eada122d87/latest/USD"
  //     );
  //     setUsdToInr(fxRes.data.conversion_rates.INR);
  //     console.log("Fetched new INR rate:", fxRes.data.conversion_rates.INR);
  //   } catch (err) {
  //     console.error("Error fetching INR rate", err);
  //   }
  // };

  // const fetchGoldRate = async () => {
  //   try {
  //     const res = await axios.get("https://api.gold-api.com/price/XAU");
  //     let priceUSD = res.data.price;
  //     let usdToInr = 88.2; // Hardcoded INR conversion rate
  //     let gold24k = (priceUSD / 31.1035) * usdToInr + 900;
  //     let gold22k = gold24k * (22 / 24);
  //     let gold20k = gold24k * (20 / 24);
  //     let gold18k = gold24k * (18 / 24);

  //     setRates({
  //       gold24k: gold24k.toFixed(0),
  //       gold22k: gold22k.toFixed(0),
  //       gold20k: gold20k.toFixed(0),
  //       gold18k: gold18k.toFixed(0),
  //       updatedAt: new Date().toLocaleTimeString(),
  //       updatedAtReadable: res.data.updatedAtReadable,
  //     });
  //   } catch (err) {
  //     console.error("Error fetching gold rate", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchExchangeRate();
  //   const fxInterval = setInterval(fetchExchangeRate, 24 * 60 * 60 * 1000);
  //   return () => clearInterval(fxInterval);
  // }, []);

  // useEffect(() => {
  //   fetchGoldRate();
  //   const goldInterval = setInterval(fetchGoldRate, 1000);
  //   return () => clearInterval(goldInterval);
  // }, [usdToInr]);

  const handleBuyWeightChange = (e) => {
    setBuyWeight(e.target.value);
    if (rates.gold24k && e.target.value) {
      setBuyAmount((e.target.value * rates.gold24k).toFixed(2));
    }
  };

  const handleBuyAmountChange = (e) => {
    setBuyAmount(e.target.value);
    if (rates.gold24k && e.target.value) {
      setBuyWeight((e.target.value / rates.gold24k).toFixed(2));
    }
  };

  const handleSellWeightChange = (e) => {
    const value = parseFloat(e.target.value);
    // Prevent selling more gold than owned
    if (value > profile.DigitalGoldWeight) {
      alert(
        `You cannot sell more than your available gold (${profile.DigitalGoldWeight} grams).`);
      setSellWeight(profile.DigitalGoldWeight); // set max allowed
      setSellAmount((profile.DigitalGoldWeight * rates.gold24k).toFixed(2));
      return;
    }

    setSellWeight(value);

    if (rates.gold24k && e.target.value) {
      setSellAmount((e.target.value * rates.gold24k).toFixed(2));
    }
    else{
      setSellAmount(0);
    }
  };

  const handleSellAmountChange = (e) => {
    const value=e.target.value;
    if(value>profile.DigitalGoldWeight*rates.gold24k){
      alert(
        `You cannot sell more than your available gold worth (${(profile.DigitalGoldWeight * rates.gold24k).toFixed(2)} INR).`);
      setSellAmount(0);
      setSellWeight(0);
      return;
    }
    setSellAmount(e.target.value);
    if (rates.gold24k && e.target.value) {
      setSellWeight((e.target.value / rates.gold24k).toFixed(2));
    }
  };
  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const customerprofile = await axios.get(
          `http://localhost:5000/api/customer/profile/${customerInfo._id}`
        );
        setProfile(customerprofile.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerProfile();
  },[]);

  const handleSellClick = () => {
    setShowModal(true);
  };

  const handleSellSubmit=async()=>{
    if (!upiID) {
      alert("Please enter your UPI ID.");
      return;
    }
    try{
      setShowModal(false);
      const sellData={
        customerId:customerInfo._id,
        transactionType:"sellDigitalGold",
        weight:sellWeight,
        amount:sellAmount,
        upiID:upiID,
        remarks:remarks
      }
      // console.log("Sell Data Submitted:", sellData);
      await axios.post("http://localhost:5000/api/customer/sellDigitalGold/add",sellData);
      alert("sell digital gold submitted..");
      setSellWeight(0);
      setSellAmount(0);
      setUpiID("");
      setRemarks("");
    }
    catch(error){
      console.error("Error during sell submission:", error);
    }

  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <style>
        {`
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
            50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.6); }
          }
          .gold-card { transition: transform 0.3s ease; }
          .gold-card:hover { transform: translateY(-5px); }
          .gold-input {
            width: 100%;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(212, 175, 55, 0.4);
            border-radius: 8px;
            color: white;
            font-size: 15px;
            transition: all 0.3s;
          }
          .gold-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
          }
          .gold-btn {
            transition: all 0.3s;
          }
          .gold-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
          }
        `}
      </style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(30, 30, 30, 0.8)",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "25px",
            border: "2px solid rgba(212, 175, 55, 0.4)",
            animation: "glow 2s infinite",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Digital Gold Available
            </p>
            <p
              style={{ color: "#D4AF37", fontWeight: "700", fontSize: "28px" }}
            >
              {profile.DigitalGoldWeight} gram
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Total Worth
            </p>
            <p
              style={{ color: "#D4AF37", fontWeight: "700", fontSize: "28px" }}
            >
              {rates.gold24k && profile.DigitalGoldWeight
                ? `₹ ${(profile.DigitalGoldWeight * rates.gold24k).toFixed(2)}`
                : "Loading..."}
            </p>{" "}
          </div>
          {/* <h1 style={{ color: "#D4AF37", fontWeight: "700" }}>rates {JSON.stringify(rates.gold24k)}</h1> */}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
         <BuyDGCard buyAmount={buyAmount} handleBuyAmountChange={handleBuyAmountChange} buyWeight={buyWeight}handleBuyWeightChange={handleBuyWeightChange} navigate={navigate}/>
          {profile.DigitalGoldWeight > 0 ? (
           <SellDGCard sellWeight={sellWeight} handleSellWeightChange={handleSellWeightChange} sellAmount={sellAmount}handleSellAmountChange={handleSellAmountChange} handleSellClick={handleSellClick}/>
          ) : (
            ""
          )}
        </div>
      </div>

      {showModal && <SellDigGoldModal upiID={upiID} setUpiID={setUpiID} remarks={remarks} setRemarks={setRemarks} setShowModal={setShowModal} handleSellSubmit={handleSellSubmit}/>}

    </div>
  );
};
export default DigitalGold;
