export default function RecommendationsPanel() {
  const steps = [
    {
      title: "Stay Hydrated",
      text: "Drink at least 8 glasses of water daily",
      icon: "💧"
    },
    {
      title: "Get Rest",
      text: "7–8 hours of quality sleep recommended",
      icon: "🛌"
    },
    {
      title: "Healthy Diet",
      text: "Eat nutritious, balanced meals",
      icon: "🥗"
    },
    {
      title: "Monitor Symptoms",
      text: "Track changes in your condition",
      icon: "📊"
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* =========================
          NEXT STEPS
      ========================== */}
      <div className="card" style={{ padding: "30px", minHeight: "320px" }}>

        <h3 style={{ fontWeight: "700", color: "#6c5ce7", marginBottom: "14px" }}>
          Next Steps
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                padding: "12px",
                borderRadius: "12px",
                background: "#f7f5ff"
              }}
            >
              <div style={{ fontSize: "22px" }}>{step.icon}</div>

              <div>
                <p style={{ margin: 0, fontWeight: "700", fontSize: "14px" }}>
                  {step.title}
                </p>

                <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          TALK TO DOCTOR (BIG CARD)
      ========================== */}
      <div
        className="card"
        style={{
          padding: "32px",
          minHeight: "320px",
          background: "#f3f0ff",
          border: "1px solid #d9ccff"
        }}
      >

        <p style={{ fontSize: "12px", color: "#6c5ce7", fontWeight: "600" }}>
          PREMIUM FEATURE
        </p>

        <h3 style={{ marginTop: "6px", fontSize: "18px" }}>
          Talk to a Doctor
        </h3>

        <p style={{ fontSize: "13px", color: "#777", marginTop: "10px" }}>
          Get connected to a certified healthcare professional instantly.
          Video consultation available 24/7 for personalized medical advice.
        </p>

        <button
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            background: "#b9a7ff",
            color: "white",
            border: "none",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Subscribe Now ➡️
        </button>

        {/* ✅ CENTERED PRICE */}
        <p
          style={{
            fontSize: "11px",
            color: "#999",
            marginTop: "14px",
            textAlign: "center"
          }}
        >
          Starting at $9.99 / month
        </p>

      </div>

      {/* =========================
          EMERGENCY (SMALL CARD)
      ========================== */}
      <div
        className="card"
        style={{
          padding: "24px",
          minHeight: "180px",
          background: "#fff9db",
          border: "1px solid #ffe58f"
        }}
      >

        <h3 style={{ color: "#d48806", fontSize: "16px" }}>
          Emergency?
        </h3>

        <p style={{ fontSize: "13px", color: "#777", marginTop: "10px" }}>
          If you're experiencing severe symptoms, call emergency services immediately
          or visit the nearest hospital.
        </p>

      </div>

    </div>
  );
}