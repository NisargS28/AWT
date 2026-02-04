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
        message = `User ${args[0]} updated ${args[1]}`;
        break;
      default:
        break;
    }
    setLog((prev) => [...prev, message]);
  };

  const handleSummary = () => {
    setLog((prev) => [
      ...prev,
      "\n📊 EVENT SUMMARY REPORT",
      "----------------------",
      ...Object.entries(counts).map(
        ([event, count]) => `${event}: ${count} time(s)`
      ),
    ]);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Event Simulator</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={() => handleEvent("user-login", username)} disabled={!username}>Login</button>
        <button onClick={() => handleEvent("user-logout", username)} disabled={!username}>Logout</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={e => setItem(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={() => handleEvent("user-purchase", username, item)} disabled={!username || !item}>Purchase</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Field"
          value={field}
          onChange={e => setField(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={() => handleEvent("profile-update", username, field)} disabled={!username || !field}>Update Profile</button>
      </div>
      <button onClick={handleSummary} style={{ marginBottom: 16 }}>Show Summary</button>
      <div style={{ background: "#f9f9f9", padding: 10, minHeight: 100, borderRadius: 4, fontFamily: "monospace", fontSize: 14 }}>
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
