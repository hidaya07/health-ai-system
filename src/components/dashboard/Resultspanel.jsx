export default function ResultsPanel({ result }) {
  if (!result) return null;

  const isLowConfidence = result.status === "low_confidence";

  return (
    <div>

      {/* DISEASE */}
      <h2 style={{ color: isLowConfidence ? "#ff4d4d" : "#6f5cff" }}>
        {result.disease}
      </h2>

      {/* CONFIDENCE */}
      <p>
        Confidence: {(result.confidence * 100).toFixed(0)}%
      </p>

      {/* BAR */}
      <div
        style={{
          height: "10px",
          background: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "10px"
        }}
      >
        <div
          style={{
            width: `${result.confidence * 100}%`,
            height: "100%",
            background: isLowConfidence ? "#ff6b6b" : "#b9a7ff"
          }}
        />
      </div>

      {/* MESSAGE */}
      {result.message && (
        <p style={{ marginTop: "15px", color: isLowConfidence ? "#ff4d4d" : "#333" }}>
          {result.message}
        </p>
      )}

      {/* ADVICE */}
      {result.advice && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          🧠 {result.advice}
        </p>
      )}

      {/* CONSULTATION OPTIONS (ONLY LOW CONFIDENCE) */}
      {isLowConfidence && result.options && (
        <div style={{ marginTop: "15px" }}>
          <h4>Doctor Consultation Options</h4>

          <button style={{ marginRight: "10px" }}>
            💬 {result.options.chat}
          </button>

          <button>
            🎥 {result.options.video}
          </button>
        </div>
      )}

    </div>
  );
}