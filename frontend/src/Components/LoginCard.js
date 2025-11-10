import React from 'react'

const LoginCard = ({setIsOwner,isOwner,handleLogin,userName,setUserName,phoneNo,setPhoneNo,password,setPassword}) => {
  return (
    <div style={{
        background: "linear-gradient(135deg, rgba(45,45,45,0.95) 0%, rgba(30,30,30,0.95) 100%)",
        borderRadius: "20px",
        padding: "35px",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        border: "1px solid rgba(212, 175, 55, 0.3)"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: "#D4AF37",
          marginBottom: "8px"
        }}>
          Welcome Back
        </h2>
        <p style={{
          textAlign: "center",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "25px"
        }}>
          Login to your account
        </p>

        {/* Toggle Switch */}
        <div style={{
          display: "flex",
          background: "rgba(0,0,0,0.3)",
          borderRadius: "12px",
          padding: "5px",
          marginBottom: "25px",
          border: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          <button
            type="button"
            onClick={() => setIsOwner(false)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: !isOwner ? "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)" : "transparent",
              color: !isOwner ? "#1a1a1a" : "rgba(255,255,255,0.6)",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            👤 Customer
          </button>
          <button
            type="button"
            onClick={() => setIsOwner(true)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: isOwner ? "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)" : "transparent",
              color: isOwner ? "#1a1a1a" : "rgba(255,255,255,0.6)",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            👨‍💼 Owner
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {isOwner ? (
            <div>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.8)"
              }}>
                Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                required
                className="login-input"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              />
            </div>
          ) : (
            <div>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.8)"
              }}>
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="login-input"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  background: "#2d2d2d",
                  color: "#fff",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              />
            </div>
          )}

          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.8)"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                background: "#2d2d2d",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
              color: "#1a1a1a",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "10px",
              boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(212, 175, 55, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.4)";
            }}
          >
            Login
          </button>
        </form>

        <div style={{
          textAlign: "center",
          marginTop: "25px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "10px"
          }}>
            {isOwner ? "Need customer access?" : "Don't have an account?"}
          </p>
          <p style={{
            color: "#D4AF37",
            fontWeight: "600",
            fontSize: "13px"
          }}>
            Contact administrator
          </p>
        </div>
       
          </div>
  )
}

export default LoginCard