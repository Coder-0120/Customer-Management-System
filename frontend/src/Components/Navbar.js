import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  //  Detect login/logout changes without refresh
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

  //  Auto-refresh on route navigation (if login happens on another page)
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

  const linkStyle = {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.2s ease",
  };

  const gradientButton = {
    ...linkStyle,
    color: "#1a1a1a",
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
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
            }
          >
            Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link to="/login" style={gradientButton}>
              Login
            </Link>
          )}

          {ownerInfo && (
            <>
              <Link
                to="/register"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                }
              >
                Add Customer
              </Link>
              <Link
                to="/owner-dashboard"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                }
              >
                Dashboard
              </Link>
              <Link
                to="/proof-section"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
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

          {customerInfo && (
            <>
              <Link
                to="/customer-dashboard"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                }
              >
                Dashboard
              </Link>
              <Link
                to="/payment"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                }
              >
                Payment
              </Link>
              <Link
                to="/customer-notifications"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            background: "rgba(26, 26, 26, 0.98)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <Link
            to="/"
            onClick={handleLinkClick}
            style={{
              ...linkStyle,
              padding: "12px 20px",
              background: "rgba(212, 175, 55, 0.1)",
            }}
          >
            Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link
              to="/login"
              onClick={handleLinkClick}
              style={{
                ...gradientButton,
                padding: "12px 20px",
                textAlign: "center",
              }}
            >
              Login
            </Link>
          )}

          {ownerInfo && (
            <>
              <Link
                to="/register"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
              >
                Add Customer
              </Link>
              <Link
                to="/owner-dashboard"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/proof-section"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
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
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}

          {customerInfo && (
            <>
              <Link
                to="/customer-dashboard"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/payment"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
              >
                Payment
              </Link>
              <Link
                to="/customer-notifications"
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  padding: "12px 20px",
                  background: "rgba(212,175,55,0.1)",
                }}
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
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

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
