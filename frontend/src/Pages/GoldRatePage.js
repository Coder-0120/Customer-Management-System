import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GoldRatePage = () => {
  const navigate = useNavigate();
  const [rates, setRates] = useState(null);
  const [usdToInr, setUsdToInr] = useState(88.2);

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

  const fetchGoldRate = async () => {
    try {
      const res = await axios.get("https://api.gold-api.com/price/XAU");
      let priceUSD = res.data.price ;
      let usdToInr = 88.2; // Hardcoded INR conversion rate

      let gold24k = ((priceUSD / 31.1035) * usdToInr) + 900;
      let gold22k = gold24k * (22 / 24);
      let gold20k = gold24k * (20 / 24);
      let gold18k = gold24k * (18 / 24);

      setRates({
        gold24k: gold24k.toFixed(0),
        gold22k: gold22k.toFixed(0),
        gold20k: gold20k.toFixed(0),
        gold18k: gold18k.toFixed(0),
        updatedAt: new Date().toLocaleTimeString(),
        updatedAtReadable: res.data.updatedAtReadable,
      });
    } catch (err) {
      console.error("Error fetching gold rate", err);
    }
  };

  // useEffect(() => {
  //   fetchExchangeRate();
  //   const fxInterval = setInterval(fetchExchangeRate, 24 * 60 * 60 * 1000);
  //   return () => clearInterval(fxInterval);
  // }, []);

  useEffect(() => {
    fetchGoldRate();
    const goldInterval = setInterval(fetchGoldRate, 1000);
    return () => clearInterval(goldInterval);
  }, [usdToInr]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
            50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6); }
          }

          .fade-in { animation: fadeInUp 0.8s ease-out; }
          .pulse { animation: pulse 2s ease-in-out infinite; }
          .glow { animation: glow 3s ease-in-out infinite; }
          
          .rate-card {
            transition: all 0.3s ease;
          }
          
          .rate-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
          }
          .loading-spinner {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .rates-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
          }

          @media (max-width: 1024px) {
            .rates-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
            }
          }

          @media (max-width: 640px) {
            .rates-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            
            .rate-card {
              padding: 20px 15px !important;
            }
            
            .rate-icon {
              font-size: 32px !important;
              margin-bottom: 8px !important;
            }
            
            .rate-karat {
              font-size: 24px !important;
              margin-bottom: 5px !important;
            }
            
            .rate-purity {
              font-size: 11px !important;
              margin-bottom: 12px !important;
            }
            
            .rate-price {
              font-size: 24px !important;
              padding: 10px !important;
            }
            
            .rate-per-gram {
              font-size: 11px !important;
            }
          }

          @media (max-width: 480px) {
            .main-heading {
              font-size: 32px !important;
            }
            
            .main-subheading {
              font-size: 14px !important;
            }
            
            .pulse-icon {
              font-size: 48px !important;
            }
          }
        `}
      </style>

      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
        top: "-250px",
        right: "-250px",
        filter: "blur(80px)"
      }} />
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
        bottom: "-200px",
        left: "-200px",
        filter: "blur(80px)"
      }} />

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
        position: "relative",
        zIndex: 1
      }}>
        <div className="fade-in" style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          
          <h1 className="main-heading" style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#fff",
            marginBottom: "10px",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}>
            Live Gold Rates
          </h1>
        </div>
        {!rates ? (
          <div className="fade-in" style={{
            textAlign: "center",
            padding: "60px 20px"
          }}>
            <div className="loading-spinner" style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              border: "4px solid rgba(212, 175, 55, 0.3)",
              borderTopColor: "#D4AF37"
            }} />
            <p style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)"
            }}>
              Loading current gold rates...
            </p>
          </div>
        ) : (
          <>
            {/* Main Rates Grid - 4 in a row on laptop, 2x2 on mobile */}
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
            {/* Disclaimer */}
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
        )}

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          color: "rgba(212, 175, 55, 0.7)",
          fontSize: "12px",
          paddingTop: "30px",
          marginTop: "30px",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          <p style={{ marginBottom: "6px", fontWeight: "600" }}>
            📍 123 Sarafa Bazaar, City Center | 📞 +91 98765 43210
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            © 2024 Shree Jewellers. Crafting precious moments since 1974.
          </p>
        </footer>
      </div>
    </div>

  );
};

export default GoldRatePage;