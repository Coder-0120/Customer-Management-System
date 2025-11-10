import React from "react";

const BuyDGCard = ({buyAmount,handleBuyAmountChange,buyWeight,handleBuyWeightChange,navigate}) => {
  return (
    <div
      className="buy-digital-gold gold-card"
      style={{
        border: "2px solid #D4AF37",
        padding: "30px",
        width: "calc(50% - 10px)",
        minWidth: "300px",
        background: "rgba(30, 30, 30, 0.6)",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <p
        style={{
          color: "#D4AF37",
          fontWeight: "700",
          fontSize: "22px",
          marginBottom: "25px",
        }}
      >
        💎 Buy Digital Gold
      </p>

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Amount in INR
      </label>
      <input
        className="gold-input"
        type="number"
        placeholder="Enter amount in INR"
        value={buyAmount}
        onChange={handleBuyAmountChange}
      />
      <br />
      <br />

      <label
        style={{
          color: "white",
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Weight (grams)
      </label>
      <input
        className="gold-input"
        type="number"
        placeholder="Enter weight in grams"
        value={buyWeight}
        onChange={handleBuyWeightChange}
      />
      <br />
      <br />

      <button
        className="gold-btn"
        style={{
          color: "#fff",
          background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
          border: "none",
          padding: "14px 32px",
          borderRadius: "10px",
          fontWeight: "700",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() =>
          navigate("/payment", {
            state: {
              DigitalGoldAmount: buyAmount,
              DigitalGoldWeight: buyWeight,
            },
          })
        }
      >
        Buy
      </button>
    </div>
  );
};

export default BuyDGCard;
