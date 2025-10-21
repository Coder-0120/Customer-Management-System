import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const updateAuthState = () => {
    setCustomerInfo(JSON.parse(localStorage.getItem("CustomerDetails")));
    setOwnerInfo(JSON.parse(localStorage.getItem("OwnerDetails")));
  };

  useEffect(() => {
    updateAuthState();
    const handleStorage = () => updateAuthState();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleCustomerLogout = () => {
    localStorage.removeItem("CustomerDetails");
    updateAuthState();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem("OwnerDetails");
    updateAuthState();
    setIsMenuOpen(false);
    navigate("/ownerLogin");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '70px'
      }}>
        <Link 
          to="/" 
          onClick={handleLinkClick}
          style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#D4AF37',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💎 Shree Jewellers
        </Link>

        <div style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center'
        }} className="desktop-menu">
          <Link 
            to="/" 
            style={{
              color: 'rgba(255,255,255,0.9)',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.2s ease',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
              e.currentTarget.style.color = '#D4AF37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
            }}
          >
            Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link 
              to="/login"
              style={{
                color: '#1a1a1a',
                textDecoration: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '15px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 175, 55, 0.3)';
              }}
            >
              Login
            </Link>
          )}

          {ownerInfo && (
            <>
              <Link 
                to="/register"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
              >
                Add Customer
              </Link>
              <Link 
                to="/owner-dashboard"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleOwnerLogout}
                style={{
                  color: '#fff',
                  background: '#dc2626',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#dc2626';
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
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
              >
                Dashboard
              </Link>
              <Link 
                to="/payment"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
              >
                Payment
              </Link>
              <button 
                onClick={handleCustomerLogout}
                style={{
                  color: '#fff',
                  background: '#dc2626',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#dc2626';
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-toggle"
          style={{
            display: 'none',
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#D4AF37',
            fontSize: '24px'
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu" style={{
          background: 'rgba(26, 26, 26, 0.98)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <Link 
            to="/"
            onClick={handleLinkClick}
            style={{
              color: 'rgba(255,255,255,0.9)',
              textDecoration: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              background: 'rgba(212, 175, 55, 0.1)'
            }}
          >
            Home
          </Link>

          {!customerInfo && !ownerInfo && (
            <Link 
              to="/login"
              onClick={handleLinkClick}
              style={{
                color: '#1a1a1a',
                textDecoration: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                textAlign: 'center'
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
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: 'rgba(212, 175, 55, 0.1)'
                }}
              >
                Add Customer
              </Link>
              <Link 
                to="/owner-dashboard"
                onClick={handleLinkClick}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: 'rgba(212, 175, 55, 0.1)'
                }}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleOwnerLogout}
                style={{
                  color: '#fff',
                  background: '#dc2626',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer'
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
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: 'rgba(212, 175, 55, 0.1)'
                }}
              >
                Dashboard
              </Link>
              <Link 
                to="/payment"
                onClick={handleLinkClick}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: 'rgba(212, 175, 55, 0.1)'
                }}
              >
                Payment
              </Link>
              <button 
                onClick={handleCustomerLogout}
                style={{
                  color: '#fff',
                  background: '#dc2626',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer'
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