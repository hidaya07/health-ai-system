import { useState } from "react";

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [remember, setRemember] = useState(false);

  const handleSubmit = () => {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (mode === "signup" && !name) {
      alert("Please enter your name");
      return;
    }

    // 🔥 FAKE LOGIN (NO BACKEND)
    onLogin(name || "Diagnova User");
  };

  return (
    <div className="auth-bg">

      {/* glow */}
      <div className="glow"></div>

      {/* card */}
      <div className="auth-card">

        {/* logo */}
        <div className="logo">🫀 Diagnova</div>

        <p className="subtitle">AI-Powered Health Assistant</p>

        {/* inputs */}
        {mode === "signup" && (
          <input id="name" placeholder="Full Name" />
        )}

        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />

        {/* options */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          marginTop: "10px",
          color: "#777"
        }}>
          <label style={{ display: "flex", gap: "8px", alignItems: "Left" }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              style={{ accentColor: "#b9a7ff" }}
            />
            Remind me
          </label>

          <span style={{ color: "#b9a7ff", cursor: "pointer" }}>
            Forgot password?
          </span>
        </div>

        {/* button */}
        <button className="btn" onClick={handleSubmit}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {/* switch */}
        <p className="switch-text">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          className="switch-btn"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Create account" : "Login"}
        </button>

      </div>

      {/* terms outside card */}
      <p style={{
        position: "absolute",
        bottom: "20px",
        fontSize: "11px",
        color: "#999",
        textAlign: "center"
      }}>
        By continuing, you agree to our{" "}
        <span style={{ color: "#b9a7ff" }}>Terms of Service</span> and{" "}
        <span style={{ color: "#b9a7ff" }}>Privacy Policy</span>
      </p>

    </div>
  );
}
