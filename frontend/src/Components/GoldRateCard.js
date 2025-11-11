import React from 'react'

const GoldRateCard = ({rates}) => {
  return (
    <>
     <div className="rates-grid">
              {[
                { karat: "24K", price: rates.gold24k, purity: "99.9% Pure", icon: "👑" },
                { karat: "22K", price: rates.gold22k, purity: "91.6% Pure", icon: "💍" },
                { karat: "20K", price: rates.gold20k, purity: "83.3% Pure", icon: "✨" },
                { karat: "18K", price: rates.gold18k, purity: "75.0% Pure", icon: "💎" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="rate-card glow"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
                    borderRadius: "20px",
                    padding: "30px 20px",
                    textAlign: "center",
                    border: "2px solid rgba(212, 175, 55, 0.3)",
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`
                  }}
                >
                  <div className="rate-icon" style={{ fontSize: "40px", marginBottom: "12px" }}>{item.icon}</div>
                  
                  <h2 className="rate-karat" style={{
                    fontSize: "28px",
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "6px"
                  }}>
                    {item.karat}
                  </h2>
                  
                  <p className="rate-purity" style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "15px"
                  }}>
                    {item.purity}
                  </p>
                  
                  <div className="rate-price" style={{
                    padding: "12px",
                    borderRadius: "12px",
                    background: "rgba(212, 175, 55, 0.1)",
                    border: "1px solid rgba(212, 175, 55, 0.2)"
                  }}>
                    <p style={{
                      fontSize: "30px",
                      fontWeight: "800",
                      color: "#D4AF37",
                      margin: 0
                    }}>
                      ₹{item.price}
                    </p>
                    <p className="rate-per-gram" style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: "4px"
                    }}>
                      per gram
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(212, 175, 55, 0.05)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "16px",
              padding: "25px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>ℹ️</div>
              <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.8)",
                lineHeight: "1.7",
                margin: 0,
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                <strong style={{ color: "#D4AF37" }}>Important:</strong> These rates are indicative and based on international gold prices. 
                Final purchase rates may vary based on making charges, GST, and current market conditions. 
                Please visit our store or contact us for exact quotations and current offers.
              </p>
            </div>
                </>

          
  )
}

export default GoldRateCard

  
           