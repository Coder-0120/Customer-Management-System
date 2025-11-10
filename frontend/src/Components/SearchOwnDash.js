import React from 'react'

const SearchOwnDash = ({searchTerm,setSearchTerm,viewMode,setViewMode}) => {
  return (
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="🔍 Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-focus"
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              background: "rgba(45, 45, 45, 0.5)",
              color: "#fff",
              fontSize: "14px"
            }}
          />

          <div style={{
            background: "rgba(45, 45, 45, 0.5)",
            borderRadius: "10px",
            padding: "5px",
            display: "flex",
            gap: "5px",
            border: "1px solid rgba(212, 175, 55, 0.3)"
          }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "8px 16px",
                background: viewMode === "grid" ? "#D4AF37" : "transparent",
                color: viewMode === "grid" ? "#1a1a1a" : "#D4AF37",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "8px 16px",
                background: viewMode === "list" ? "#D4AF37" : "transparent",
                color: viewMode === "list" ? "#1a1a1a" : "#D4AF37",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              ☰ List
            </button>
          </div>
        </div>
  )
}

export default SearchOwnDash