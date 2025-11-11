import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detect login/logout changes without refresh
  useEffect(() => {
    const loadAuth = () => {
      setCustomerInfo(JSON.parse(localStorage.getItem("CustomerDetails")));
      setOwnerInfo(JSON.parse(localStorage.getItem("OwnerDetails")));
    };

    loadAuth();

    const handleStorageChange = () => loadAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Auto-refresh on route navigation
  useEffect(() => {
    const checkLoginChange = setInterval(() => {
      const c = JSON.parse(localStorage.getItem("CustomerDetails"));
      const o = JSON.parse(localStorage.getItem("OwnerDetails"));
      setCustomerInfo(c);
      setOwnerInfo(o);
    }, 500);
    return () => clearInterval(checkLoginChange);
  }, []);

  const handleCustomerLogout = () => {
    localStorage.removeItem("CustomerDetails");
    setCustomerInfo(null);
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem("OwnerDetails");
    setOwnerInfo(null);
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const handleLinkClick = () => setIsSidebarOpen(false);

  const linkStyle = {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s ease",
    display: "block",
    background: "rgba(212, 175, 55, 0.05)",
    marginBottom: "8px",
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "70px",
          }}
        >
          {/* Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: "rgba(212, 175, 55, 0.2)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              padding: "10px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#D4AF37",
              fontSize: "24px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.2)";
            }}
          >
            ☰
          </button>

          {/* Logo */}
          <Link
            to="/"
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: "#D4AF37",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textAlign:"center",
              textShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleLinkClick}
          >
            💎 Shree Jewellers
            {ownerInfo ? " (Admin)" : customerInfo ? " (Customer)" : ""}
          </Link>

          <div style={{ width: "48px" }}></div> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1100,
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarOpen ? 0 : "-320px",
          width: "320px",
          height: "100vh",
          background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
          borderRight: "1px solid rgba(212, 175, 55, 0.2)",
          zIndex: 1200,
          transition: "left 0.3s ease",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#D4AF37",
              textShadow: "0 0 10px rgba(212, 175, 55, 0.3)",
            }}
          >
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#D4AF37",
              fontSize: "28px",
              cursor: "pointer",
              padding: "0",
              lineHeight: "1",
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link
            to="/"
            onClick={handleLinkClick}
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            🏠 Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link
              to="/login"
              onClick={handleLinkClick}
              style={{
                ...linkStyle,
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                color: "#1a1a1a",
                fontWeight: "700",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(212, 175, 55, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(5px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0) scale(1)";
              }}
            >
              🔐 Login
            </Link>
          )}

          {ownerInfo && (
            <>
              <Link
                to="/register"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                👥 Add Customer
              </Link>
              <Link
                to="/owner-dashboard"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/owner-proofs"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                📄 Proof Section
              </Link>
              <Link
                to="/owner-notifications"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                🔔 Notifications
              </Link>
              <button
                type="button"
                onClick={handleOwnerLogout}
                style={{
                  ...linkStyle,
                  color: "#fff",
                  background: "#dc2626",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b91c1c";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                🚪 Logout
              </button>
            </>
          )}

          {customerInfo && (
            <>
              <Link
                to="/customer-dashboard"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/payment"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                💳 Payment
              </Link>
              <Link
                to="/digital-gold"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                🪙 Digital Gold
              </Link>
              <Link
                to="/customer-proofs"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                📄 Payment Proofs
              </Link>
              <Link
                to="/customer-notifications"
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 175, 55, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                🔔 Notifications
              </Link>
              <button
                type="button"
                onClick={handleCustomerLogout}
                style={{
                  ...linkStyle,
                  color: "#fff",
                  background: "#dc2626",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b91c1c";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;