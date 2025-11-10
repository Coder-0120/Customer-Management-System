import { Layout } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem("CustomerDetails"));
  const owner = JSON.parse(localStorage.getItem("OwnerDetails"));
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
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.5)); }
            50% { filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.8)); }
          }

          .fade-in { animation: fadeInUp 0.8s ease-out; }
          .float { animation: float 3s ease-in-out infinite; }
          .glow { animation: glow 3s ease-in-out infinite; }
          
          .feature-card {
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3);
          }

          .cta-button {
            transition: all 0.3s ease;
          }

          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
          }
        `}
      </style>

      {/* Decorative elements */}
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
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        position: "relative",
        zIndex: 1
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "80px"
        }}>
          <div className="fade-in">
            <h1 style={{
              fontSize: "56px",
              fontWeight: "800",
              color: "#fff",
              marginBottom: "20px",
              lineHeight: "1.2",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)"
            }}>
              Your Trusted Partner in
              <br />
              <span style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))"
              }}>
                Fine Jewellery
              </span>
            </h1>

            <p style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px"
            }}>
              Track your payments, manage advances, and view complete transaction history.
              Your trusted jeweller, now with digital convenience.
            </p>

            <button
            onClick={() => navigate(customer ? "" : owner ? "" : "/login")}
              style={{
                padding: "18px 50px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                color: "#1a1a1a",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)"
              }}
              className="cta-button"
            >
              {customer ? `Welcome ${customer.name}` : owner ? `Welcome Owner ${owner.UserName}` : `Access Your Account →`}
            </button>
          </div>

          {/* Live Rates Button */}
          <div style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => navigate("/gold-rate")}
              style={{
                padding: "15px 40px",
                borderRadius: "12px",
                border: "2px solid rgba(212, 175, 55, 0.5)",
                background: "rgba(212, 175, 55, 0.1)",
                backdropFilter: "blur(10px)",
                color: "#D4AF37",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
              }}
              className="cta-button"
            >
              <span style={{ fontSize: "20px" }}>📈</span>
              Check Live Gold Rates
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: "80px" }}>
          <h2 style={{
            fontSize: "40px",
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px"
          }}>
            Crafted for Your Convenience
          </h2>
          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: "50px"
          }}>
            Everything you need to manage your jewellery purchases in one place
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px"
          }}>
            {[
              { icon: "💰", title: "Payment Tracking", desc: "View your pending amounts, advance payments, and overall account balance" },
              { icon: "📊", title: "Transaction History", desc: "Access detailed records of all your purchases and payments anytime" },
              { icon: "🔒", title: "Secure & Private", desc: "Your account information is encrypted and completely secure" },
              { icon: "📱", title: "Access Anywhere", desc: "Check your account from any device - mobile, tablet, or desktop" },
              { icon: "📈", title: "Live Gold Rates", desc: "Quick access to current gold and silver market rates" },
              { icon: "💎", title: "Simple & Easy", desc: "User-friendly interface designed for hassle-free account management" }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{
                  background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)",
                  borderRadius: "20px",
                  padding: "35px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div style={{ fontSize: "52px", marginBottom: "20px" }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#D4AF37",
                  marginBottom: "12px"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.7"
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div style={{
          background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)",
          borderRadius: "24px",
          padding: "60px 40px",
          textAlign: "center",
          boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
          marginBottom: "40px",
          border: "2px solid rgba(212, 175, 55, 0.3)"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>✨</div>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#D4AF37",
            marginBottom: "15px"
          }}>
            Three Generations of Trust
          </h2>
          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "35px",
            maxWidth: "700px",
            margin: "0 auto 35px",
            lineHeight: "1.8"
          }}>
            For over 50 years, we've been creating precious memories with fine jewellery.
            Now, manage your account digitally while enjoying the same personal service you've always loved.
          </p>
          <button
            onClick={() => navigate(customer ? "/customer-dashboard" : owner ? "/owner-dashboard" : "/login")}
            style={{
              padding: "18px 50px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
              color: "#1a1a1a",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)"
            }}
            className="cta-button"
          >
            {customer ? "Access Your Dashboard" : owner ? "Access Your Dashboard" : "Login to Your Account"}
          </button>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          color: "rgba(212, 175, 55, 0.7)",
          fontSize: "14px",
          paddingTop: "20px"
        }}>
          <p style={{ marginBottom: "8px", fontWeight: "600" }}>📍 123 Sarafa Bazaar, City Center | 📞 +91 98765 43210</p>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>© 2024 Shree Jewellers. Crafting precious moments since 1974.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;