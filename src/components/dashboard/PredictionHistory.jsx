import { useEffect, useState } from "react";

export default function PredictionHistory({ userName }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/predictions/${userName}`
        );

        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchHistory();
    }
  }, [userName]);

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h3>📊 Prediction History</h3>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No past predictions</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {history.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "#f5f5f5"
              }}
            >
              <p><strong>Disease:</strong> {item.disease}</p>
              <p><strong>Confidence:</strong> {item.confidence}</p>
              <p>
                <strong>Status:</strong>{" "}
                {item.status === "low_confidence" ? "⚠️ Low" : "✔ High"}
              </p>
              <p style={{ fontSize: "12px", color: "#777" }}>
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}