import { useState } from "react";

import AuthPage from "./components/auth/AuthPage";
import Header from "./components/layout/Header";
import DiagnosticForm from "./components/dashboard/DiagnosticForm";
import ResultsPanel from "./components/dashboard/ResultsPanel";
import RecommendationsPanel from "./components/dashboard/RecommendationsPanel";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (name) => {
    setUserName(name || "User");
    setIsAuth(true);
  };

  const handlePredict = async (formData) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          userName
        })
      });

      const data = await res.json();
      setResult(data);

    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-bg">

      <Header userName={userName} />

      {/* DASHBOARD (UNCHANGED LAYOUT) */}
      <div
        className="dashboard"
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 0.2fr 1fr",
          gap: "20px",
          alignItems: "start",
          padding: "30px"
        }}
      >

        {/* LEFT SIDE (UNCHANGED) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* PATIENT DIAGNOSIS CARD (UNCHANGED SIZE) */}
          <div className="card" style={{ padding: "35px", minHeight: "620px" }}>
            <h3 style={{ fontSize: "19px", marginBottom: "18px" }}>
              Patient Diagnosis
            </h3>

            <DiagnosticForm onSubmit={handlePredict} />
          </div>

          {/* PREDICTION RESULT CARD (UNCHANGED) */}
          <div className="card">
            <h3>Prediction Result</h3>

            {loading ? (
              <p>Processing prediction...</p>
            ) : result ? (
              <ResultsPanel result={result} />
            ) : (
              <p>No prediction yet</p>
            )}
          </div>

        </div>

        {/* SPACER (UNCHANGED) */}
        <div></div>

        {/* RIGHT SIDE (ONLY RECOMMENDATIONS LEFT) */}
        <div>

          <RecommendationsPanel />

        </div>

      </div>

    </div>
  );
}