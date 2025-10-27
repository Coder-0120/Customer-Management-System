import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [customerInfo, setCustomerInfo] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Detect login/logout changes
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

  // Auto refresh on route navigation
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
    setIsMenuOpen(false);
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem("OwnerDetails");
    setOwnerInfo(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  // Base link style
  const linkStyle = {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    padding: "10px 20px",
    // borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    // transition: "all 0.2s ease",
  };

  // Active link style
  const activeLinkStyle = {
    ...linkStyle,
    // backgroundColor: "orange",
    color: "#FFD700",
    fontWeight: "700",
  };

  const gradientButton = {
    ...linkStyle,
    color: "#000000ff",
    fontWeight: "700",
    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
    boxShadow: "0 2px 8px rgba(212, 175, 55, 0.3)",
  };

  return (
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
            textShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={handleLinkClick}
        >
          💎 Shree Jewellers
        </Link>

        {/* Desktop Menu */}
        <div
          className="desktop-menu"
          style={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          {/* Home */}
          <Link
            to="/"
            style={location.pathname === "/" ? activeLinkStyle : linkStyle}
          >
            Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link to="/login" style={gradientButton}>
              Login
            </Link>
          )}

          {/* Owner Menu */}
          {ownerInfo && (
            <>
              <Link
                to="/register"
                style={
                  location.pathname === "/register"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Add Customer
              </Link>
              <Link
                to="/owner-dashboard"
                style={
                  location.pathname === "/owner-dashboard"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Dashboard
              </Link>
              <Link
                to="/proof-section"
                style={
                  location.pathname === "/proof-section"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Proof Section
              </Link>
              <button
                type="button"
                onClick={handleOwnerLogout}
                style={{
                  color: "#fff",
                  background: "#dc2626",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}

          {/* Customer Menu */}
          {customerInfo && (
            <>
              <Link
                to="/customer-dashboard"
                style={
                  location.pathname === "/customer-dashboard"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Dashboard
              </Link>
              <Link
                to="/payment"
                style={
                  location.pathname === "/payment"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Payment
              </Link>
              <Link
                to="/customer-notifications"
                style={
                  location.pathname === "/customer-notifications"
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                Notifications
              </Link>
              <button
                type="button"
                onClick={handleCustomerLogout}
                style={{
                  color: "#fff",
                  background: "#dc2626",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            background: "rgba(212, 175, 55, 0.2)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#D4AF37",
            fontSize: "24px",
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
