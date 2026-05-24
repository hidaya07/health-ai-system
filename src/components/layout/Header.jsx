export default function Header({ userName }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 30px",
      borderBottom: "1px solid #eee",
      background: "#ffffff"
    }}>

      {/* LEFT: LOGO */}
      <div style={{
        fontSize: "22px",
        fontWeight: "700",
        color: "#6f5cff"
      }}>
        🫀 Diagnova
        <p className="subtitle">AI-Powered Health Assistant</p>
      </div>
      

      {/* RIGHT: USER GREETING */}
      <div style={{ textAlign: "right" }}>
        <div style={{
          fontSize: "14px",
          color: "#666"
        }}>
          Hello, {userName}
        </div>

        <div style={{
          fontSize: "16px",
          fontWeight: "600"
        }}>
          How are you feeling today?
        </div>
      </div>

    </div>
  );
}