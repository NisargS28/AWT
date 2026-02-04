import React, { useState } from "react";

const initialCounts = {
  "user-login": 0,
  "user-logout": 0,
  "user-purchase": 0,
  "profile-update": 0,
};

export default function EventSimulator() {
  const [counts, setCounts] = useState(initialCounts);
  const [log, setLog] = useState([]);
  const [username, setUsername] = useState("");
  const [item, setItem] = useState("");
  const [field, setField] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleEvent = (event, ...args) => {
    setCounts((prev) => ({ ...prev, [event]: prev[event] + 1 }));
    let message = "";
    switch (event) {
      case "user-login":
        message = `User logged in: ${args[0]}`;
        break;
      case "user-logout":
        message = `User logged out: ${args[0]}`;
        break;
      case "user-purchase":
        message = `User ${args[0]} purchased ${args[1]}`;
        break;
      case "profile-update":
        message = `User ${args[0]} updated ${args[1]} to ${args[2]}`;
        break;
      default:
        break;
    }
    setLog((prev) => [...prev, message]);
  };

  const handleSummary = () => {
    setLog((prev) => [
      ...prev,
      "\n EVENT SUMMARY REPORT",
      "----------------------",
      ...Object.entries(counts).map(
        ([event, count]) => `${event}: ${count} time(s)`
      ),
    ]);
  };

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: "2rem auto", 
      padding: 30, 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: 12,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
    }}>
      <h2 style={{ color: "white", textAlign: "center", marginBottom: 24 }}> Event Simulator</h2>
      
      <div style={{ 
        background: "white", 
        padding: 20, 
        borderRadius: 8,
        marginBottom: 16
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px 12px", 
              border: "2px solid #e0e0e0", 
              borderRadius: 6,
              fontSize: 14,
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <button 
            onClick={() => handleEvent("user-login", username)} 
            disabled={!username}
            style={{ 
              padding: "10px 16px", 
              background: !username ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: !username ? "not-allowed" : "pointer",
              fontWeight: 600
            }}
          >
             Login
          </button>
          <button 
            onClick={() => handleEvent("user-logout", username)} 
            disabled={!username}
            style={{ 
              padding: "10px 16px", 
              background: !username ? "#ccc" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: !username ? "not-allowed" : "pointer",
              fontWeight: 600
            }}
          >
             Logout
          </button>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Item to Purchase</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="e.g., Laptop"
              value={item}
              onChange={e => setItem(e.target.value)}
              style={{ 
                flex: 1,
                padding: "8px 12px", 
                border: "2px solid #e0e0e0", 
                borderRadius: 6,
                fontSize: 14
              }}
            />
            <button 
              onClick={() => handleEvent("user-purchase", username, item)} 
              disabled={!username || !item}
              style={{ 
                padding: "8px 16px", 
                background: (!username || !item) ? "#ccc" : "#2196F3",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: (!username || !item) ? "not-allowed" : "pointer",
                fontWeight: 600
              }}
            >
               Purchase
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Profile Update</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Field to update (e.g., Email)"
              value={field}
              onChange={e => setField(e.target.value)}
              style={{ 
                flex: 1,
                padding: "8px 12px", 
                border: "2px solid #e0e0e0", 
                borderRadius: 6,
                fontSize: 14
              }}
            />
            <input
              type="text"
              placeholder="New value"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              style={{ 
                flex: 1,
                padding: "8px 12px", 
                border: "2px solid #e0e0e0", 
                borderRadius: 6,
                fontSize: 14
              }}
            />
          </div>
          <button 
            onClick={() => handleEvent("profile-update", username, field, newValue)} 
            disabled={!username || !field || !newValue}
            style={{ 
              width: "100%",
              padding: "8px 16px", 
              background: (!username || !field || !newValue) ? "#ccc" : "#FF9800",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: (!username || !field || !newValue) ? "not-allowed" : "pointer",
              fontWeight: 600
            }}
          >
             Update Profile
          </button>
        </div>

        <button 
          onClick={handleSummary} 
          style={{ 
            width: "100%",
            padding: "10px", 
            background: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 15
          }}
        >
           Show Summary
        </button>
      </div>

      <div style={{ 
        background: "#1e1e1e", 
        padding: 15, 
        minHeight: 150, 
        borderRadius: 8, 
        fontFamily: "monospace", 
        fontSize: 13,
        color: "#00ff00",
        maxHeight: 300,
        overflowY: "auto"
      }}>
        {log.length === 0 ? (
          <div style={{ color: "#666", textAlign: "center", paddingTop: 20 }}>
            No events yet. Start by performing some actions!
          </div>
        ) : (
          log.map((line, i) => (
            <div key={i} style={{ marginBottom: 4 }}>{line}</div>
          ))
        )}
      </div>
    </div>
  );
}
